import RoomRepository from "../repositories/roomRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import BoardingHouseRepository from "../repositories/boardingHouseRepository.js";

class RoomService {
  constructor() {
    this.roomRepository = new RoomRepository();
    this.UserRepository = new UserRepository();
    this.BoardingHouseRepository = new BoardingHouseRepository();
  }

  async getAllRooms() {
    const rooms = await this.roomRepository.findAll();
    if (!rooms || rooms.length == 0) {
      return {
        message: "belum ada data kamar sama sekali",
      };
    }
    return {
      rooms: rooms,
    };
  }

  async getRoomById(id) {
    const room = await this.roomRepository.findById(id);
    if (!room) {
      throw new Error("Room not found");
    }
    return {
      room: room,
    };
  }

  async createRoom(data, photos) {
    if (!data) {
      throw new Error("Data diperlukan untuk membuat kamar baru");
    }
    const {
      boardingHouse,
      occupant,
      roomNumber,
      floor,
      type,
      price,
      deposit,
      capacity,
      status,
      size,
      facilities,
      description,
    } = data;

    const isBoardingHouseAvailable =
      await this.BoardingHouseRepository.findById(boardingHouse);
    if (!isBoardingHouseAvailable) {
      throw new Error("Boarding house not found");
    }

    if (occupant !== null) {
      const isUserAvailable = await this.UserRepository.findById(occupant);
      if (!isUserAvailable) {
        throw new Error("User not found for this room");
      }
    }

    const parsedFacilities = facilities ? JSON.parse(facilities) : [];
    const photoPaths = photos ? photos.map((file) => file.path) : [];

    return await this.roomRepository.create({
      boardingHouse,
      occupant,
      roomNumber,
      floor,
      type,
      price,
      deposit,
      capacity,
      status,
      size,
      parsedFacilities,
      description,
      photoPaths,
    });
  }

  async updateRoom(id, data, photos) {
    if (!id) {
      throw new Error("id is required to update room");
    }

    const {
      boardingHouse,
      occupant,
      roomNumber,
      floor,
      type,
      price,
      deposit,
      capacity,
      status,
      size,
      facilities,
      description,
    } = data;

    const room = await this.roomRepository.findById(id);
    if (!room) {
      throw new Error("Room not found");
    }

    const isBoardingHouseAvailable =
      await this.BoardingHouseRepository.findById(boardingHouse);
    if (!isBoardingHouseAvailable) {
      throw new Error("Boarding house not found");
    }

    if (occupant !== null) {
      const isUserAvailable = await this.UserRepository.findById(occupant);
      if (!isUserAvailable) {
        throw new Error("User not found for this room");
      }
    }

    const parsedFacilities = facilities ? JSON.parse(facilities) : [];
    const photoPaths = photos ? photos.map((file) => file.path) : [];

    return await this.roomRepository.update(id, {
      boardingHouse,
      occupant,
      roomNumber,
      floor,
      type,
      price,
      deposit,
      capacity,
      status,
      size,
      parsedFacilities,
      description,
      photoPaths,
    });
  }

  async deleteRoom(id) {
    if (!id) {
      throw new Error("ID is required to delete room");
    }
    const room = await this.roomRepository.findById(id);
    if (!room) {
      throw new Error("Room not found");
    }
    await this.roomRepository.delete(id);
    return {
      message: "room has been deleted",
    };
  }

  async getAvailableRooms() {
    const availableRooms = await this.roomRepository.findAvailable();
    if (!availableRooms || availableRooms.length == 0) {
      return {
        message: "belum ada kamar yang tersedia",
      };
    }
    return {
      availableRooms: availableRooms,
    };
  }

  async getOccupiedRooms() {
    const occupiedRooms = await this.roomRepository.findOccupied();
    if (!occupiedRooms || occupiedRooms.length == 0) {
      return {
        message: "belum ada kamar yang ditempati",
      };
    }
    return {
      occupiedRooms: occupiedRooms,
    };
  }

  async getMaintainedRooms() {
    const maintainedRooms = await this.roomRepository.findUnderMaintenance();
    if (!maintainedRooms || maintainedRooms.length == 0) {
      return {
        message: "belum ada kamar yang sedang diperbaiki",
      };
    }
    return {
      maintainedRooms: maintainedRooms,
    };
  }

  async getReservedRooms() {
    const reservedRooms = await this.roomRepository.findReserved();
    if (!reservedRooms || reservedRooms.length == 0) {
      return {
        message: "belum ada kamar yang direservasi",
      };
    }
    return {
      reservedRooms: reservedRooms,
    };
  }
}

export default new RoomService();
