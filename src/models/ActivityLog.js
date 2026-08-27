import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        action: {
            type: String,
            enum: [
                "CREATE",
                "UPDATE",
                "DELETE",
                "LOGIN",
                "LOGOUT",
                "CHANGE_STATUS",
                "VERIFY",
                "REJECT"
            ],
            required: true
        },

        module: {
            type: String,
            enum: [
                "AUTH",
                "USER",
                "BOARDING_HOUSE",
                "ROOM",
                "RENTAL",
                "INVOICE",
                "PAYMENT",
                "EXPENSE",
                "COMPLAINT",
                "MAINTENANCE",
                "ANNOUNCEMENT",
                "VISITOR"
            ],
            required: true
        },

        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        ipAddress: {
            type: String,
            default: null
        },

        userAgent: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

ActivityLogSchema.index({
    user: 1,
    createdAt: -1
});

ActivityLogSchema.index({
    module: 1,
    createdAt: -1
});

ActivityLogSchema.index({
    targetId: 1,
    createdAt: -1
});

const ActivityLog = mongoose.model(
    "ActivityLog",
    ActivityLogSchema
);

export default ActivityLog;