import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const PASSPHRASE = 'i-love-you-3000'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const passphrase = formData.get('passphrase') as string | null

    // Validate passphrase
    if (passphrase !== PASSPHRASE) {
      return NextResponse.json(
        { error: "I'm sorry, that's not the right passphrase" },
        { status: 401 }
      )
    }

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `${timestamp}-${randomString}.${extension}`

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Supabase storage error:', error)
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    return NextResponse.json({ 
      url: publicUrl,
      path: data.path 
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Remove an uploaded image
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { passphrase, path } = body as { 
      passphrase: string
      path: string 
    }

    // Validate passphrase
    if (passphrase !== PASSPHRASE) {
      return NextResponse.json(
        { error: "I'm sorry, that's not the right passphrase" },
        { status: 401 }
      )
    }

    if (!path) {
      return NextResponse.json(
        { error: 'Image path is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase.storage
      .from('images')
      .remove([path])

    if (error) {
      console.error('Supabase storage error:', error)
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
