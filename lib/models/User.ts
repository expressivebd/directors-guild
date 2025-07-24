import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  bloodGroup: string;
  address: string;
  image?: string;
  website?: string;
  socialMedia?: string;
  biography: string;
  award?: string;
  awards?: string[];
  skills?: string[];
  experience?: string;
  education?: string;
  preferences?: {
    emailNotifications?: boolean;
    scheduleReminders?: boolean;
    memberUpdates?: boolean;
  };
  memberType: "pending" | "primary" | "full" | "permanent" | "executive";
  adminRoles: ("superAdmin" | "newsAdmin")[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    socialMedia: {
      type: String,
      trim: true,
    },
    biography: {
      type: String,
      required: [true, "Biography is required"],
      trim: true,
    },
    award: {
      type: String,
      trim: true,
    },
    awards: [{ type: String, trim: true }],
    skills: [{ type: String, trim: true }],
    experience: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      scheduleReminders: { type: Boolean, default: true },
      memberUpdates: { type: Boolean, default: false },
    },
    memberType: {
      type: String,
      enum: ["pending", "primary", "full", "permanent", "executive"],
      default: "pending",
    },
    adminRoles: [
      {
        type: String,
        enum: ["superAdmin", "newsAdmin"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Only create indexes if not in edge runtime environment
if (typeof window === "undefined" && !process.env.NEXT_RUNTIME) {
  // Create index for faster queries
  UserSchema.index({ email: 1 });
  UserSchema.index({ memberType: 1 });
  UserSchema.index({ adminRoles: 1 });
}

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
