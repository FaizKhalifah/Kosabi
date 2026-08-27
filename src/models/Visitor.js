import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema(
    {
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },

        visitorName: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        scheduledVisitAt: {
            type: Date,
            required: true
        },

        checkIn: {
            type: Date,
            default: null
        },

        checkOut: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: [
                "REGISTERED",
                "CHECKED_IN",
                "CHECKED_OUT",
                "CANCELLED"
            ],
            default: "REGISTERED"
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

VisitorSchema.index({
    tenant: 1,
    createdAt: -1
});

VisitorSchema.index({
    room: 1,
    status: 1
});

VisitorSchema.index({
    scheduledVisitAt: -1
});

const Visitor = mongoose.model("Visitor", VisitorSchema);

export default Visitor;