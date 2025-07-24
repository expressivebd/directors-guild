import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    
    const user = await User.findOne({ email: session.user.email })
      .select('-password')
      .lean() as any
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Transform user data to match UserProfile interface
    const userProfile = {
      id: user._id?.toString() || '',
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      biography: user.biography || '',
      image: user.image || '',
      memberType: user.memberType || 'pending',
      website: user.website || '',
      socialMedia: user.socialMedia || '',
      skills: user.skills || [],
      experience: user.experience || '',
      education: user.education || '',
      awards: user.awards || [],
      preferences: {
        emailNotifications: user.preferences?.emailNotifications ?? true,
        scheduleReminders: user.preferences?.scheduleReminders ?? true,
        memberUpdates: user.preferences?.memberUpdates ?? false,
      }
    }

    return NextResponse.json(userProfile)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    await connectDB()
    
    // Find and update the user
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update allowed fields only
    const allowedFields = [
      'name', 'phone', 'address', 'biography', 'image',
      'website', 'socialMedia', 'skills', 'experience', 'education', 'awards', 'preferences'
    ]

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        user[field] = body[field]
      }
    })

    user.updatedAt = new Date()
    
    await user.save()

    return NextResponse.json({ 
      message: "Profile updated successfully",
      success: true 
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
