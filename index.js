import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLIENT_NAME}`,
  api_key: `${process.env.CLOUDINARY_CLIENT_API}`,
  api_secret: `${process.env.CLOUDINARY_CLIENT_SECRET}`,
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/upload/image", async (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: "No file provided.",
    });
  }
  if (!req.files.image) {
    return res.status(400).json({
      success: false,
      message: "No image file provided.",
    });
  }
  const { image } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(image.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Invalid file format. Only PNG, JPEG, and WEBP are allowed.",
    });
  }
  try {
    const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "images",
      resource_type: "image",
    });
    if (!uploadResult) {
      return (
        res.status(400),
        json({
          success: false,
          message: "Error uploading image to cloude service",
        })
      );
    }
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      data: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.post("/upload/video", async (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: "No file provided.",
    });
  }
  if (!req.files.video) {
    return res.status(400).json({
      success: false,
      message: "No video file provided.",
    });
  }
  const { video } = req.files;
  const allowedFormats = ["video/mp4", "video/mkv", "video/webm", "video/gif"];
  if (!allowedFormats.includes(video.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Invalid file format. Only MP4, MKV, or WEBM allowed.",
    });
  }
  try {
    const result = await cloudinary.uploader.upload(video.tempFilePath, {
      folder: "videos",
      resource_type: "video",
    });
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Error uploading image to cloude service",
      });
    }
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      data: {
        publicId: result.public_id,
        url: result.secure_url,
      },
    });
  } catch (error) {
    console.error("Video upload error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
