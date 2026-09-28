import RentalRepository from "../repositories/rentalRepository.js";
import RoomRepository from "../repositories/roomRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import { ResponseError } from "../utils/errorsUtils.js";

class RentalService {
  constructor() {
    this.rentalRepository = new RentalRepository();
    this.roomRepository = new RoomRepository();
    this.userRepository = new UserRepository();
  }

  async getAllRentals() {
    const rentals = await this.rentalRepository.findAll();
    if (!rentals || rentals.length == 0) {
      return {
        message: "belum ada data sewa",
      };
    }
    return {
      rentals: rentals,
    };
  }

  async getRentalById(id) {
    if (!id) {
      throw new ResponseError(401, "Id diperlukan untuk mencari data rental");
    }
    const rental = await this.rentalRepository.findById(id);
    if (!rental) {
      throw new ResponseError(401, "Data sewa tidak ditemukan");
    }
    return {
      rental: rental,
    };
  }

  async createRental(data) {
    if (!data) {
      throw new ResponseError(
        401,
        "Data diperlukan untuk membuat data sewa baru",
      );
    }

    const { tenantId, roomId, startDate, endDate, billingDay, status, notes } =
      data;
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new ResponseError(401, "room not found");
    }
    const tenant = await this.userRepository.findById(tenantId);
    if (!tenant) {
      throw new ResponseError(401, "Tenant not found");
    }
    if (tenant.role !== "TENANT") {
      throw new ResponseError(401, "User is not a tenant");
    }
    const monthlyPrice = room.price;
    const deposit = room.deposit;
    return await this.rentalRepository.create({
      tenantId,
      roomId,
      startDate,
      endDate,
      monthlyPrice: monthlyPrice,
      deposit: deposit,
      billingDay,
      status,
      notes,
    });
  }
}

export default new RentalService();
