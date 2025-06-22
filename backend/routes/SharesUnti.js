import express from "express";
import sharesUnit from "../models/SharesUnit.js";
import { upload } from "../middlewares/upload.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SharesUnitRouter = express.Router();

// اضافة وحدة جديدة
SharesUnitRouter.post(
  "/",
  upload.fields([{ name: "images" }, { name: "videos" }]), // رفع ملفات صور وفيديوهات
  async (req, res) => {
    try {
      const {
        type,
        size,
        price,
        noOfShares,
        marketPrice,
        offeredPrice,
        location,
        locationUrl,
        noOfRooms,
        noOfBathrooms,
        deliveryDate, // استلام تاريخ التسليم من الـ body
      } = req.body;

      // التحقق من وجود الصور والفيديوهات
      if (!req.files || !req.files.images || !req.files.videos) {
        return res
          .status(400)
          .json({ message: "Images and Videos are required." });
      }

      // رفع مسارات الصور والفيديوهات
      const imagesPaths = req.files.images.map((file) => file.filename);
      const videosPaths = req.files.videos.map((file) => file.filename);

      const newSharesUnit = new sharesUnit({
        type,
        size,
        price,
        noOfShares,
        marketPrice,
        offeredPrice,
        deliveryDate,
        location: JSON.parse(location), // لازم تتبعت كـ JSON String برضو
        locationUrl,
        images: imagesPaths,
        videos: videosPaths,
        noOfRooms,
        noOfBathrooms,
        users: [],
      });

      await newSharesUnit.save();

      res.status(201).json(newSharesUnit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);


// الحصول على جميع الوحدات
SharesUnitRouter.get("/", async (req, res) => {
  try {
    const sharesUnits = await sharesUnit.find({});

    const updatedUnits = sharesUnits.map((unit) => ({
      ...unit.toObject(),
      images: unit.images.map((img) => `http://localhost:5000/uploads/${img}`),
      videos: unit.videos.map((vid) => `http://localhost:5000/uploads/${vid}`),
    }));

    res.status(200).json(updatedUnits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});



SharesUnitRouter.get("/search", async (req, res) => {
  try {
    console.log("Query:", req.query);
    const { type, noOfRooms, offeredPrice, location } = req.query;

    const filter = {};

    // تصفية حسب نوع العقار
    // if (type) {
    //   filter.type = type;
    // }

    if (type) {
      filter.type = { $regex: type, $options: "i" };
    }

    // تصفية حسب عدد الغرف
    if (noOfRooms) {
      if (noOfRooms === "5+") {
        filter.noOfRooms = { $gte: 5 };
      } else {
        filter.noOfRooms = Number(noOfRooms);
      }
    }

    // تصفية حسب السعر المعروض
    if (offeredPrice) {
      if (offeredPrice.includes("-")) {
        const [min, max] = offeredPrice.split("-").map(Number);
        filter.offeredPrice = { $gte: min, $lte: max };
      } else if (offeredPrice.startsWith("<")) {
        const max = Number(offeredPrice.replace("<", "").trim());
        filter.offeredPrice = { $lte: max };
      } else if (offeredPrice.startsWith(">")) {
        const min = Number(offeredPrice.replace(">", "").trim());
        filter.offeredPrice = { $gte: min };
      }
    }

    // تصفية حسب المدينة أو المنطقة (location هو String من الـ query)
    // if (location) {
    //   filter.$or = [
    //     { "location.city": { $regex: location, $options: "i" } },
    //     { "location.region": { $regex: location, $options: "i" } },
    //   ];
    // }

    if (location) {
      const locationRegex = new RegExp(location, "i");
      filter.$or = [
        { "location.address": locationRegex },
        { "location.city": locationRegex },
        { "location.region": locationRegex },
      ];
    }

    console.log("Final Filter:", JSON.stringify(filter, null, 2));

    // تنفيذ الاستعلام
    const units = await sharesUnit.find(filter);

    // تعديل روابط الصور والفيديوهات
    const updatedUnits = units.map((unit) => ({
      ...unit.toObject(),
      images: unit.images.map((img) => `http://localhost:5000/uploads/${img}`),
      videos: unit.videos.map((vid) => `http://localhost:5000/uploads/${vid}`),
    }));

    res.status(200).json(updatedUnits);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب الوحدات" });
  }
});


SharesUnitRouter.get("/:id", async (req, res) => {
  try {
    const unit = await sharesUnit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({ message: "الوحدة غير موجودة" });
    }

    const updatedUnit = {
      ...unit.toObject(),
      images: unit.images.map((img) => `http://localhost:5000/uploads/${img}`),
      videos: unit.videos.map((vid) => `http://localhost:5000/uploads/${vid}`),
    };

    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب الوحدة" });
  }
});



SharesUnitRouter.delete("/:id", async (req, res) => {
  try {
    const unit = await sharesUnit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Optional: delete associated files
    const allFiles = [...unit.images, ...unit.videos];
    allFiles.forEach((file) => {
      const filePath = path.join(__dirname, "..", "uploads", file); // adjust path if needed
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await sharesUnit.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});



SharesUnitRouter.put(
  "/:id",
  upload.fields([{ name: "images" }, { name: "videos" }]),
  async (req, res) => {
    try {
      const unit = await sharesUnit.findById(req.params.id);
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }

      const {
        type,
        size,
        price,
        noOfShares,
        marketPrice,
        offeredPrice,
        deliveryDate,
        location,
        locationUrl,
        noOfRooms,
        noOfBathrooms,
        imagesToRemove,
        videosToRemove,
        users // إضافة حقل المستخدمين
      } = req.body;

      console.log("Received data:", req.body); // للتشخيص

      // Update basic fields
      if (type) unit.type = type;
      if (size) unit.size = size;
      if (price) unit.price = price;
      if (noOfShares) unit.noOfShares = noOfShares;
      if (marketPrice) unit.marketPrice = marketPrice;
      if (offeredPrice) unit.offeredPrice = offeredPrice;
      if (deliveryDate) unit.deliveryDate = deliveryDate;
      if (locationUrl) unit.locationUrl = locationUrl;
      if (noOfRooms) unit.noOfRooms = noOfRooms;
      if (noOfBathrooms) unit.noOfBathrooms = noOfBathrooms;

      // Handle location - التحقق من نوع البيانات قبل المعالجة
      if (location) {
        if (typeof location === 'string') {
          try {
            unit.location = JSON.parse(location);
          } catch (parseError) {
            console.error('Error parsing location:', parseError);
            return res.status(400).json({ message: "Invalid location format" });
          }
        } else if (typeof location === 'object') {
          unit.location = location;
        }
      }

      // Handle users array - تحديث بيانات المستخدمين والأسهم
      if (users) {
        if (typeof users === 'string') {
          try {
            unit.users = JSON.parse(users);
          } catch (parseError) {
            console.error('Error parsing users:', parseError);
            return res.status(400).json({ message: "Invalid users format" });
          }
        } else if (Array.isArray(users)) {
          unit.users = users;
        }
      }

      // Handle images
      let currentImages = [...(unit.images || [])];
      
      // Remove selected images
      if (imagesToRemove) {
        let imagesToRemoveArray;
        try {
          imagesToRemoveArray = typeof imagesToRemove === 'string' 
            ? JSON.parse(imagesToRemove) 
            : imagesToRemove;
        } catch (parseError) {
          console.error('Error parsing imagesToRemove:', parseError);
          return res.status(400).json({ message: "Invalid imagesToRemove format" });
        }

        if (Array.isArray(imagesToRemoveArray)) {
          imagesToRemoveArray.forEach((imageUrl) => {
            // Extract filename from URL
            const filename = imageUrl.split('/').pop();
            
            // Remove from filesystem
            const filePath = path.join(__dirname, "..", "uploads", filename);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            
            // Remove from current images array
            currentImages = currentImages.filter(img => !img.includes(filename));
          });
        }
      }

      // Add new images
      if (req.files && req.files.images) {
        const newImageFilenames = req.files.images.map(file => file.filename);
        currentImages = [...currentImages, ...newImageFilenames];
      }

      unit.images = currentImages;

      // Handle videos
      let currentVideos = [...(unit.videos || [])];
      
      // Remove selected videos
      if (videosToRemove) {
        let videosToRemoveArray;
        try {
          videosToRemoveArray = typeof videosToRemove === 'string' 
            ? JSON.parse(videosToRemove) 
            : videosToRemove;
        } catch (parseError) {
          console.error('Error parsing videosToRemove:', parseError);
          return res.status(400).json({ message: "Invalid videosToRemove format" });
        }

        if (Array.isArray(videosToRemoveArray)) {
          videosToRemoveArray.forEach((videoUrl) => {
            // Extract filename from URL
            const filename = videoUrl.split('/').pop();
            
            // Remove from filesystem
            const filePath = path.join(__dirname, "..", "uploads", filename);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            
            // Remove from current videos array
            currentVideos = currentVideos.filter(vid => !vid.includes(filename));
          });
        }
      }

      // Add new videos
      if (req.files && req.files.videos) {
        const newVideoFilenames = req.files.videos.map(file => file.filename);
        currentVideos = [...currentVideos, ...newVideoFilenames];
      }

      unit.videos = currentVideos;

      // تحديث تاريخ التعديل
      unit.updatedAt = new Date();

      await unit.save();

      // إرسال البيانات المحدثة مع معلومات المستخدمين المحدثة
      const populatedUnit = await sharesUnit.findById(unit._id);
      
      res.status(200).json({
        message: "Unit updated successfully",
        unit: populatedUnit
      });

    } catch (error) {
      console.error("Error updating share unit:", error);
      res.status(500).json({ 
        message: "Something went wrong", 
        error: error.message 
      });
    }
  }
);

export default SharesUnitRouter;
