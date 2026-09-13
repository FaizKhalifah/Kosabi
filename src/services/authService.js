import UserRepository from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

export default class AuthService {
  constructor() {
    this.repository = new UserRepository();
  }

  async registerAdmin(data) {
    const { name, email, phone, password, confirmPassword } = data;
    if (!name) {
      throw new Error("Admin name is required");
    }
    if (!email) {
      throw new Error("Admin email is required");
    }
    if (!phone) {
      throw new Error("Admin phone number is required");
    }
    if (!password) {
      throw new Error("Admin password is required");
    }
    if (password !== confirmPassword) {
      throw new Error("Password didn't match");
    }

    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "ADMIN",
      isActive: true,
    });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      config.APP_SECRET,
      { expiresIn: "1h" },
    );
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: token,
    };
  }

  async registerTenant(data) {
    const { name, email, phone, password, confirmPassword } = data;
    if (!name) {
      throw new Error("Tenant name is required");
    }
    if (!email) {
      throw new Error("Tenant email is required");
    }
    if (!phone) {
      throw new Error("Tenant phone number is required");
    }
    if (!password) {
      throw new Error("Tenant password is required");
    }
    if (password !== confirmPassword) {
      throw new Error("Password didn't match");
    }

    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "TENANT",
      isActive: true,
    });
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      config.APP_SECRET,
      { expiresIn: "1h" },
    );
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: token,
    };
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (!user.isActive) {
      throw new Error("User account is inactive");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    await this.repository.update(user._id, { lastLogin: new Date() });

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      config.APP_SECRET,
      { expiresIn: "1h" },
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
  }

  async changePassword(userId, data) {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (!currentPassword) {
      throw new Error("Current password is required");
    }

    if (!newPassword) {
      throw new Error("New password is required");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Password didn't match");
    }

    const user = await this.repository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      throw new Error("New password cannot be the same as the old password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.repository.update(userId, { password: hashedPassword });

    return { message: "Password has been changed successfully" };
  }
}
