import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';  // Import streamifier to convert buffer to stream

// Set up Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
export const uploadImage = async (image: File) => {
    try {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Create a stream from the buffer
        const stream = streamifier.createReadStream(buffer);

        // Upload the stream to Cloudinary
        const res = await cloudinary.uploader.upload(stream, {
            resource_type: "auto", // Automatically detect the file type (image, video, etc.)
        });

        return res.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Failed to upload image");
    }
};
