import roomService from "../services/roomService.js";

export default class roomController {
  async getAllRooms(req, res) {
    try {
      const rooms = await roomService.getAllRooms();
      res.status(201).json(rooms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getRoomById(req, res) {
    try {
      const room = await roomService.getRoomById(req.params.id);
      res.status(201).json(room);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createRoom(req, res) {
    try {
      const createResult = await roomService.createRoom(req.body, req.files);
      res.status(201).json({ success: true, data: createResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateRoom(req, res) {
    try {
      const updateResult = await roomService.updateRoom(
        req.params.id,
        req.body,
        req.files,
      );
      res.status(201).json({ success: true, data: updateResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteRoom(req, res) {
    try {
      const deleteResult = await roomService.deleteRoom(req.params.id);
      res.status(201).json({ success: true, message: deleteResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAvailableRooms(req, res) {
    try {
      const availableRooms = await roomService.getAvailableRooms();
      res.status(201).json({ success: true, data: availableRooms });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getOccupiedRooms(req, res) {
    try {
      const occupiedRooms = await roomService.getOccupiedRooms();
      res.status(201).json({ success: true, data: occupiedRooms });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getMaintainedRooms(req, res) {
    try {
      const maintainedRooms = await roomService.getMaintainedRooms();
      res.status(201).json({ success: true, data: maintainedRooms });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getReservedRooms(req, res) {
    try {
      const reservedRooms = await roomService.getReservedRooms();
      res.status(201).json({ success: true, data: reservedRooms });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
