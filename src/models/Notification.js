import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "PAYMENT",
                "INVOICE",
                "RENTAL",
                "COMPLAINT",
                "MAINTENANCE",
                "ANNOUNCEMENT",
                "VISITOR",
                "SYSTEM"
            ],
            required: true
        },

        referenceType: {
            type: String,
            enum: [
                "INVOICE",
                "PAYMENT",
                "COMPLAINT",
                "MAINTENANCE",
                "ANNOUNCEMENT",
                "VISITOR"
            ],
            default: null
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        isRead: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

NotificationSchema.index({
    recipient: 1,
    createdAt: -1
});

NotificationSchema.index({
    recipient: 1,
    isRead: 1
});

const Notification = mongoose.model(
    "Notification",
    NotificationSchema
);

export default Notification;