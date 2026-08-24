import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        attachments: {
            type: [String],
            default: []
        },

        status: {
            type: String,
            enum: [
                "DRAFT",
                "PUBLISHED",
                "ARCHIVED"
            ],
            default: "DRAFT"
        },

        publishedAt: {
            type: Date,
            default: null
        },

        expiredAt: {
            type: Date,
            default: null
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

AnnouncementSchema.index({
    status: 1,
    publishedAt: -1
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

export default Announcement;