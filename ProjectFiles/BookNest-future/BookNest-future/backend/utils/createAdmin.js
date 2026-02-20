import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createAdmin = async () => {
  const adminEmail = "admin@booknext.com";

  const existingAdmin = await User.findOne({
    email: adminEmail,
    role: "admin"
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

//   const hashedPassword = await bcrypt.hash("admin", 10);
    const hashedPassword = "admin";

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin"
  });

  console.log("Hidden admin account created");
};