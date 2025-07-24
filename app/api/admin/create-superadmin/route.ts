import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    // Only allow this in development
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "This endpoint is only available in development" },
        { status: 403 }
      );
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      adminRoles: { $in: ["superAdmin"] },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: "Super admin already exists", email: existingAdmin.email },
        { status: 200 }
      );
    }

    // Create super admin
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const superAdmin = new User({
      name: "Super Admin",
      email: "superadmin@directorsguild.com",
      password: hashedPassword,
      phone: "+1234567890",
      bloodGroup: "O+",
      address: "Admin Office, Directors Guild",
      biography: "System Administrator",
      memberType: "executive",
      adminRoles: ["superAdmin"],
    });

    await superAdmin.save();

    return NextResponse.json(
      {
        message: "Super admin created successfully",
        email: "superadmin@directorsguild.com",
        password: "admin123",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating super admin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
