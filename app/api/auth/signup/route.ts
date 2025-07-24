import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      bloodGroup,
      address,
      website,
      socialMedia,
      biography,
      award,
    } = await request.json();

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !bloodGroup ||
      !address ||
      !biography
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      bloodGroup,
      address,
      website,
      socialMedia,
      biography,
      award,
      memberType: "pending",
      adminRoles: [],
    });

    await newUser.save();

    return NextResponse.json(
      {
        message:
          "Registration successful! Your request has been submitted for approval. The admin will contact you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
