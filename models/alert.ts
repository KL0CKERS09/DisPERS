import mongoose, { Schema } from "mongoose";

const alertSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        severity: {
            type: String,
            enum: ["HIGH", "MEDIUM", "LOW"], // ✅ Add this
            required: [true, "Severity is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        status: {
            type: String,
            required: [true, "Status is required"],
        },
        img: {
            type: String,
            required: [true, "Image URL is required"],
        },
    },
    {
        timestamps: true,
    }
);


const Alert = mongoose.models.Alert || mongoose.model("Alert", alertSchema, "alerts");

export default Alert;
