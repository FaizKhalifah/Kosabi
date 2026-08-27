import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema(
    {
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },

        complaint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            default: null
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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

        status: {
            type: String,
            enum: [
                "REPORTED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED"
            ],
            default: "REPORTED"
        },

        cost: {
            type: Number,
            min: 0,
            default: 0
        },

        photos: {
            type: [String],
            default: []
        },

        startedAt: {
            type: Date,
            default: null
        },

        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

MaintenanceSchema.index({ room: 1 });
MaintenanceSchema.index({ status: 1 });
MaintenanceSchema.index({ room: 1, status: 1 });

const Maintenance = mongoose.model(
    "Maintenance",
    MaintenanceSchema
);

export default Maintenance;