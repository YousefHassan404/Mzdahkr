import express from "express";
import sharesUnit from "../models/SharesUnit.js";
import { upload } from "../middlewares/upload.js";

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


SharesUnitRouter.put("/:id", async (req, res) => {
  try {
    const { type, size, price, noOfShares, marketPrice, offeredPrice, location, noOfRooms, noOfBathrooms, deliveryDate } = req.body;

    const updatedUnit = await sharesUnit.findByIdAndUpdate(
      req.params.id,
      {
        type,
        size,
        price,
        noOfShares,
        marketPrice,
        offeredPrice,
        deliveryDate,
        location: JSON.parse(location),
        noOfRooms,
        noOfBathrooms,
      },
      { new: true }
    );

    if (!updatedUnit) {
      return res.status(404).json({ message: "الوحدة غير موجودة" });
    }

    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء تحديث الوحدة" });
  }
});

SharesUnitRouter.delete("/:id", async (req, res) => {
  try {
    const deletedUnit = await sharesUnit.findByIdAndDelete(req.params.id);

    if (!deletedUnit) {
      return res.status(404).json({ message: "الوحدة غير موجودة" });
    }

    res.status(200).json({ message: "تم حذف الوحدة بنجاح" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء حذف الوحدة" });
  }
});

export default SharesUnitRouter;
