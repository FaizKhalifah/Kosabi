import Rental from "../models/Rental.js";

class RentalRepository {
  async create(data, options = {}) {
    const [rental] = await Rental.create([data], {
      session: options.session,
    });

    return rental;
  }

  async findById(id, options = {}) {
    return Rental.findById(id)
      .session(options.session ?? null)
      .exec();
  }

  async findAll({
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = {}) {
    const filter = {};

    if (search) {
      filter.notes = {
        $regex: search,
        $options: "i",
      };
    }

    const sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const skip = (page - 1) * limit;

    const [rentals, total] = await Promise.all([
      Rental.find(filter)
        .populate("tenant", "name email phone")
        .populate({
          path: "room",
          select: "roomNumber floor type price status",
          populate: {
            path: "boardingHouse",
            select: "name address city province",
          },
        })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),

      Rental.countDocuments(filter),
    ]);

    return {
      rentals,
      total,
    };
  }

  async update(id, data, options = {}) {
    return Rental.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        session: options.session,
      },
    ).exec();
  }

  async delete(id, options = {}) {
    return Rental.findByIdAndDelete(id, {
      session: options.session,
    }).exec();
  }

  async getActiveRentals() {
    return Rental.find({
      status: "ACTIVE",
    })
      .populate("tenant", "name email phone")
      .populate({
        path: "room",
        populate: {
          path: "boardingHouse",
          select: "name address",
        },
      })
      .sort({ createdAt: -1 })
      .lean();
  }

  async getFinishedRentals() {
    return Rental.find({
      status: "FINISHED",
    })
      .populate("tenant", "name email phone")
      .populate("room")
      .sort({ updatedAt: -1 })
      .lean();
  }

  async getCanceledRentals() {
    return Rental.find({
      status: "CANCELLED",
    })
      .populate("tenant", "name email phone")
      .populate("room")
      .sort({ updatedAt: -1 })
      .lean();
  }

  async hasActiveRental(tenantId, options = {}) {
    return Rental.exists({
      tenant: tenantId,
      status: "ACTIVE",
    }).session(options.session ?? null);
  }
}

export default RentalRepository;
