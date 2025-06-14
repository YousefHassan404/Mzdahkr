import express from "express";
import Unit from "../models/Unit.js";
import authenticateUser from "../middlewares/userAuth.js";
import { upload } from "../middlewares/upload.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const unitRouter = express.Router();

// اضافة وحدة جديدة
unitRouter.post(
  "/",
  upload.fields([{ name: "images" }, { name: "videos" }]), // رفع ملفات صور وفيديوهات
  async (req, res) => {
    try {
      const {
        type,
        size,
        marketPrice,
        offeredPrice,
        installmentPlan,
        location,
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

      const newUnit = new Unit({
        type,
        size,
        marketPrice,
        offeredPrice,
        deliveryDate,
        installmentPlan: JSON.parse(installmentPlan), // لازم تتبعت كـ JSON String
        location: JSON.parse(location), // لازم تتبعت كـ JSON String برضو
        images: imagesPaths,
        videos: videosPaths,
        noOfRooms,
        noOfBathrooms,
      });

      await newUnit.save();

      res.status(201).json(newUnit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

unitRouter.get("/", async (req, res) => {
  try {
    const units = await Unit.find();

    const updatedUnits = units.map((unit) => ({
      ...unit.toObject(),
      images: unit.images.map((img) => `http://localhost:5000/uploads/${img}`),
      videos: unit.videos.map((vid) => `http://localhost:5000/uploads/${vid}`),
    }));

    res.status(200).json(updatedUnits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب الوحدات" });
  }
});

unitRouter.get("/search", async (req, res) => {
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
    const units = await Unit.find(filter);

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

unitRouter.get("/:id", async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

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

unitRouter.delete("/:id", async (req, res) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);

    if (!unit) {
      return res.status(404).json({ message: "الوحدة غير موجودة" });
    }

    // حذف الملفات من السيرفر
    unit.images.forEach((img) => {
      const filePath = `uploads/${img}`;
      fs.unlinkSync(filePath);
    });

    unit.videos.forEach((vid) => {
      const filePath = `uploads/${vid}`;
      fs.unlinkSync(filePath);
    });

    res.status(200).json({ message: "تم حذف الوحدة بنجاح" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء حذف الوحدة" });
  }
});

unitRouter.put(
  "/:id",
  upload.fields([{ name: "images" }, { name: "videos" }]),
  async (req, res) => {
    try {
      const unit = await Unit.findById(req.params.id);
      if (!unit) {
        return res.status(404).json({ message: "الوحدة غير موجودة" });
      }

      const {
        type,
        size,
        marketPrice,
        offeredPrice,
        installmentPlan,
        location,
        noOfRooms,
        noOfBathrooms,
        deliveryDate,
        imagesToRemove,
        videosToRemove,
      } = req.body;

      // تحديث البيانات الأساسية
      unit.type = type;
      unit.size = size;
      unit.marketPrice = marketPrice;
      unit.offeredPrice = offeredPrice;
      unit.deliveryDate = deliveryDate;
      unit.installmentPlan = installmentPlan
        ? JSON.parse(installmentPlan)
        : unit.installmentPlan;
      unit.location = location ? JSON.parse(location) : unit.location;
      unit.noOfRooms = noOfRooms;
      unit.noOfBathrooms = noOfBathrooms;

      // حذف الصور المطلوبة فقط
      const removedImages = imagesToRemove ? JSON.parse(imagesToRemove) : [];
      unit.images = unit.images.filter((img) => {
        if (removedImages.includes(img)) {
          const filePath = path.join(__dirname, "..", "uploads", img);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          return false;
        }
        return true;
      });

      // حذف الفيديوهات المطلوبة فقط
      const removedVideos = videosToRemove ? JSON.parse(videosToRemove) : [];
      unit.videos = unit.videos.filter((vid) => {
        if (removedVideos.includes(vid)) {
          const filePath = path.join(__dirname, "..", "uploads", vid);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          return false;
        }
        return true;
      });

      // إضافة الصور الجديدة (إن وُجدت)
      if (req.files && req.files.images) {
        const newImages = req.files.images.map((file) => file.filename);
        unit.images.push(...newImages);
      }

      // إضافة الفيديوهات الجديدة (إن وُجدت)
      if (req.files && req.files.videos) {
        const newVideos = req.files.videos.map((file) => file.filename);
        unit.videos.push(...newVideos);
      }

      await unit.save();

      res.status(200).json(unit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "حدث خطأ أثناء تحديث الوحدة" });
    }
  }
);

export default unitRouter;
