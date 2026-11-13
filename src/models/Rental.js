import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    monthlyPrice: {
      type: Number,
      min: 0,
      required: true,
    },

    deposit: {
      type: Number,
      min: 0,
      required: true,
    },

    billingDay: {
      type: Number,
      min: 1,
      max: 31,
      validate: {
        validator: Number.isInteger,
        message: "Billing day must be an integer",
      },
    },

    status: {
      type: String,
      enum: ["ACTIVE", "FINISHED", "CANCELLED"],
      default: "ACTIVE",
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Validasi tanggal
RentalSchema.pre("validate", function () {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate("endDate", "End date must be after start date");
  }
});

// Index
RentalSchema.index({ tenant: 1, status: 1 });
RentalSchema.index({ room: 1, status: 1 });
RentalSchema.index({ startDate: 1 });
RentalSchema.index({ createdAt: -1 });

const Rental = mongoose.model("Rental", RentalSchema);

export default Rental;
