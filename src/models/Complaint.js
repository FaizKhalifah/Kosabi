import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
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

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        photos: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: [
                "OPEN",
                "PROCESS",
                "RESOLVED",
                "CLOSED"
            ],
            default: "OPEN"
        },

        priority: {
            type: String,
            enum: [
                "LOW",
                "MEDIUM",
                "HIGH"
            ],
            default: "MEDIUM"
        },

        response: {
            type: String,
            trim: true,
            default: null
        },

        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        resolvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

ComplaintSchema.index({ tenant: 1 });
ComplaintSchema.index({ status: 1 });
ComplaintSchema.index({ tenant: 1, status: 1 });

const Complaint = mongoose.model("Complaint", ComplaintSchema);

export default Complaint;