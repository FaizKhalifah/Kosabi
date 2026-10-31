import UserRepository from "../repositories/UserRepository.js";
import RoomRepository from "../repositories/roomRepository.js";
import RentalRepository from "../repositories/rentalRepository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
    this.roomRepository = new RoomRepository();
    this.rentalRepository = new RentalRepository();
  }

  async getAllUsers(query = {}) {
    const { search = "", sortBy = "createdAt", sortOrder = "desc" } = query;
    const allowedSortFields = ["name", "email", "createdAt", "updatedAt"];

    if (!allowedSortFields.includes(sortBy)) {
      throw new Error("Invalid sorting field");
    }

    if (!["asc", "desc"].includes(sortOrder)) {
      throw new Error("Invalid sorting order");
    }

    const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const users = await this.repository.findAll({
      search: safeSearch,
      sortBy,
      sortOrder,
    });
    return {
      users,
      total: users.length,
    };
  }

  async getUserById(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      user: user,
    };
  }

  async changeUserRole(id, role) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role == role) {
      throw new Error("cannot change to the same role");
    }
    await this.repository.update(id, {
      role,
    });
    return {
      message: `user role changed to ${role}`,
    };
  }

  async updateUserProfile(id, data) {
    if (!id) {
      throw new Error("Id is required to update user data");
    }

    const { name, email, phone } = data;
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await this.repository.update(id, {
      name,
      email,
      phone,
    });
  }

  async activateUser(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isActive == true) {
      throw new Error("User already active");
    }
    await this.repository.activate(id);
    return {
      message: `user with the id ${id} has been activated`,
    };
  }

  async deactivateUser(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isActive == false) {
      throw new Error("User already non active");
    }
    await this.repository.deactivate(id);
    return {
      message: `user with the id ${id} has been deactivated`,
    };
  }

  async deleteUser(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.repository.delete(id);
    return {
      message: `user with the id ${id} has been deleted`,
    };
  }

  async getUserRoom(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const userRoom = await this.roomRepository.findByOccupantId(id);
    if (!userRoom) {
      throw new Error("User room not found");
    }
    return {
      room: userRoom,
    };
  }

  async getUserRental(id) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const userRental = await this.rentalRepository.findByTenant(id);
    if (!userRental) {
      throw new Error("User rental not found");
    }
    return {
      rental: userRental,
    };
  }

  async getAllTenants() {
    const tenants = await this.repository.getAllTenants();
    return tenants;
  }

  async createUser() {
    const { name, email, phone, password, role } = data;
    if (!name) {
      throw new Error("User name is required");
    }
    if (!email) {
      throw new Error("User email is required");
    }
    if (!phone) {
      throw new Error("User phone number is required");
    }
    if (!password) {
      throw new Error("User password is required");
    }
    if (!role) {
      throw new Error("Role is required");
    }

    const isEmailUsed = await this.repository.findByEmail(email);
    if (isEmailUsed) {
      throw new Error("Email is already registered");
    }

    const isPhoneNumberUsed = await this.repository.findByPhone(phone);
    if (isPhoneNumberUsed) {
      throw new Error("Phone number already used");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      isActive: true,
    });
    return {
      user,
    };
  }
}

export default new UserService();
