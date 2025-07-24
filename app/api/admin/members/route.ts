import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.adminRoles?.includes("superAdmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.adminRoles?.includes("superAdmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, memberType } = await request.json();

    if (!userId || !memberType) {
      return NextResponse.json(
        { error: "User ID and member type are required" },
        { status: 400 }
      );
    }

    const validMemberTypes = [
      "pending",
      "primary",
      "full",
      "permanent",
      "executive",
    ];
    if (!validMemberTypes.includes(memberType)) {
      return NextResponse.json(
        { error: "Invalid member type" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { memberType },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Member type updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating member type:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
