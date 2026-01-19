import { NextRequest, NextResponse } from 'next/server'
import { supabase, SocialMediaPostInput } from '@/lib/supabase'

const PASSPHRASE = 'i-love-you-3000'

// GET - Fetch all social media posts
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('social_media_posts')
      .select('*')
      .order('date_added', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch social posts' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching social posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new social media post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { passphrase, post } = body as { 
      passphrase: string
      post: SocialMediaPostInput 
    }

    // Validate passphrase
    if (passphrase !== PASSPHRASE) {
      return NextResponse.json(
        { error: "I'm sorry, that's not the right passphrase" },
        { status: 401 }
      )
    }

    // Validate required fields
    if (!post.link || !post.thoughts || !post.date_added) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('social_media_posts')
      .insert([post])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create social post' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating social post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update existing social media post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { passphrase, id, post } = body as { 
      passphrase: string
      id: string
      post: Partial<SocialMediaPostInput> 
    }

    // Validate passphrase
    if (passphrase !== PASSPHRASE) {
      return NextResponse.json(
        { error: "I'm sorry, that's not the right passphrase" },
        { status: 401 }
      )
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('social_media_posts')
      .update(post)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update social post' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating social post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete social media post
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { passphrase, id } = body as { 
      passphrase: string
      id: string 
    }

    // Validate passphrase
    if (passphrase !== PASSPHRASE) {
      return NextResponse.json(
        { error: "I'm sorry, that's not the right passphrase" },
        { status: 401 }
      )
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('social_media_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete social post' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting social post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
