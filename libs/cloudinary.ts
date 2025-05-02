import cloudinary from 'cloudinary';
import streamifier from 'streamifier'; // For converting buffer to stream

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (imageBuffer: Buffer) => {
  try {
    // Create a readable stream from the buffer
    const stream = streamifier.createReadStream(imageBuffer);

    // Upload the stream to Cloudinary
    const res = await cloudinary.uploader.upload(stream, {
      resource_type: 'auto', // Automatically detect the file type (image, video, etc.)
    });

    return res.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};
