import mongoose, { Document, Mongoose, Schema, Types } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import { Roles, RoleType } from "../enums/role.enum";
import { RoleDocument } from "./roles-permissions.model";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  phone?: string;
  address: Types.ObjectId[];
  role: RoleDocument;
  isVerified: boolean;
  sellerProfile?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    password: { type: String, select: true },
    profilePicture: {
      type: String,
      default: null,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    phone: String,
    address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    isVerified: { type: Boolean, default: false },
    sellerProfile: { type: Schema.Types.ObjectId, ref: "SellerProfile" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    if (this.password) {
      this.password = await hashValue(this.password);
    }
  }
  next();
});

userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
