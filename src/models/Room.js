import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    boardingHouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BoardingHouse",
      required: true,
    },

    occupant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    floor: {
      type: Number,
      min: 1,
      required: true,
    },

    type: {
      type: String,
      enum: ["STANDARD", "DELUXE", "VIP"],
      required: true,
    },

    price: {
      type: Number,
      min: 0,
      required: true,
    },

    deposit: {
      type: Number,
      min: 0,
      required: true,
    },

    capacity: {
      type: Number,
      min: 1,
      default: 1,
      required: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "OCCUPIED", "MAINTENANCE", "RESERVED"],
      default: "AVAILABLE",
      required: true,
    },

    size: {
      type: Number,
      min: 0,
      required: true,
    },

    facilities: [
      {
        type: String,
        trim: true,
      },
    ],

    photos: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

RoomSchema.index(
  {
    boardingHouse: 1,
    roomNumber: 1,
  },
  {
    unique: true,
  },
);

RoomSchema.index({ status: 1 });
RoomSchema.index({ boardingHouse: 1, status: 1 });

const Room = mongoose.model("Room", RoomSchema);

export default Room;
