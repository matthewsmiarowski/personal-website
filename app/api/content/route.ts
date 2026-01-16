import { NextRequest, NextResponse } from 'next/server'
import { supabase, WrittenContentInput } from '@/lib/supabase'

const PASSPHRASE = 'i-love-you-3000'

// GET - Fetch all written content
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('written_content')
      .select('*')
      .order('date_added', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch content' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { passphrase, content } = body as { 
      passphrase: string
      content: WrittenContentInput 
    }

    // Validate passphrase
    if (passphrase !== PASSPHRASE) {
      return NextResponse.json(
        { error: "I'm sorry, that's not the right passphrase" },
        { status: 401 }
      )
    }

    // Validate required fields
    if (!content.title || !content.summary || !content.link || !content.date_added) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('written_content')
      .insert([content])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create content' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update existing content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { passphrase, id, content } = body as { 
      passphrase: string
      id: string
      content: Partial<WrittenContentInput> 
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
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('written_content')
      .update(content)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update content' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete content
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
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('written_content')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete content' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
