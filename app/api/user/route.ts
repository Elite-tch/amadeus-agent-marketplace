// Route for registering user (Amadeus wallets) and retrieving registered users

import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import User from "@/lib/models/User";

/**
 * GET /api/user
 * Retrieves all users or a specific user by publicKey
 * Query params: ?publicKey=<wallet_address>
 */
export async function GET(request: Request) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const publicKey = searchParams.get("publicKey");

    if (publicKey) {
      // Retrieve specific user by public key
      const user = await User.findOne({ publicKey }).select("-__v,");

      if (!user) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: user,
      });
    }

    // Retrieve all users
    const users = await User.find({}).select("-__v").sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error: any) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve users" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user
 * Registers a new user with Amadeus wallet
 * Body: { publicKey: string, name?: string, role?: "user" | "developer" | "admin" }
 */
export async function POST(request: Request) {
  try {
    await connectDb();

    const body = await request.json();
    const { publicKey, name, role } = body;

    // Validate required fields
    if (!publicKey || typeof publicKey !== "string" || publicKey.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Public key is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ publicKey: publicKey.trim() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User with this public key already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await User.create({
      publicKey: publicKey.trim(),
      name: name?.trim(),
      role: role || "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: {
          _id: newUser._id,
          publicKey: newUser.publicKey,
          name: newUser.name,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("POST /api/user error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
}