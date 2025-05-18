import "dotenv/config";
import mongoose from "mongoose";
import connectDatabase from "../config/database.config";
import RoleModel from "../models/roles-permissions.model";
import { RolePermissions } from "../utils/roles-permissions";

const seedRoles = async () => {
  console.log("🚀 Seeding roles started...");

  let session: mongoose.ClientSession | null = null;

  try {
    await connectDatabase();
    session = await mongoose.startSession();
    session.startTransaction();

    console.log("🧹 Clearing existing roles...");
    await RoleModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      // Find if the role already exists (shouldn't after deleteMany, but still good practice)
      let existingRole = await RoleModel.findOne({ name: role }).session(
        session
      );

      if (!existingRole) {
        // If not found, create a new role
        existingRole = new RoleModel({
          name: role,
          permissions: permissions,
        });
        console.log(`🆕 Creating role: ${role}`);
      } else {
        // If found, update permissions
        existingRole.permissions = permissions;
        console.log(`♻️ Updating existing role: ${role}`);
      }

      await existingRole.save({ session });
    }

    await session.commitTransaction();
    console.log("✅ Transaction committed successfully.");
  } catch (error: any) {
    console.error("❌ Error during seeding, aborting transaction: ", error);
    if (session) {
      await session.abortTransaction();
      console.log("🛑 Transaction aborted.");
    }
  } finally {
    if (session) {
      session.endSession();
      console.log("🔚 Session ended.");
    }
    console.log("🌟 Seeding process completed.");
  }
};

seedRoles().catch((error) =>
  console.error("❗ Fatal error running seed script:", error)
);
