import express from 'express';
import Rent from '../models/Rent.js';
import authenticateUser from '../middlewares/userAuth.js';
import { upload } from '../middlewares/upload.js';
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const rentRouter = express.Router();



rentRouter.post(
  '/',
  upload.fields([{ name: 'images' }, { name: 'videos' }]), // رفع ملفات صور وفيديوهات
  async (req, res) => {
    try {
      const {
        type,
        size,
        marketPrice,
        offeredPrice,
        location,
        noOfRooms,
        noOfBathrooms,
        deliveryDate, // استلام تاريخ التسليم من الـ body
      } = req.body;

      // التحقق من وجود الصور والفيديوهات
      if (!req.files || !req.files.images || !req.files.videos) {
        return res.status(400).json({ message: 'Images and Videos are required.' });
      }

      // رفع مسارات الصور والفيديوهات
      const imagesPaths = req.files.images.map(file => file.filename);
      const videosPaths = req.files.videos.map(file => file.filename);

      const newRent = new Rent({
        type,
        size,
        marketPrice,
        offeredPrice,
        deliveryDate,
        location: JSON.parse(location),
        images: imagesPaths,
        videos: videosPaths,
        noOfRooms,
        noOfBathrooms,
      });

      await newRent.save();

      res.status(201).json(newRent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

rentRouter.get('/', async (req, res) => {
  try {
    const rents = await Rent.find().sort({ createdAt: -1 });

    const updatedRents = rents.map((rent) => ({
      ...rent.toObject(),
      images: rent.images.map((img) => `http://localhost:5000/uploads/${img}`),
      videos: rent.videos.map((vid) => `http://localhost:5000/uploads/${vid}`),
    }));

    res.status(200).json(updatedRents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب بيانات الإيجارات' });
  }
});

rentRouter.get("/search", async (req, res) => {
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
    const units = await Rent.find(filter);

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


rentRouter.get('/:id', async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);

    if (!rent) {
      return res.status(404).json({ message: "الإيجار غير موجود" });
    }

    const updatedRent = {
      ...rent.toObject(),
      images: rent.images.map((img) => `http://localhost:5000/uploads/${img}`),
      videos: rent.videos.map((vid) => `http://localhost:5000/uploads/${vid}`),
    };

    res.status(200).json(updatedRent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء جلب بيانات الإيجار" });
  }
});

rentRouter.delete('/:id', async (req, res) => {
  try {
    const rent = await Rent.findByIdAndDelete(req.params.id);

    if (!rent) {
      return res.status(404).json({ message: "الإيجار غير موجود" });
    }

    // حذف الملفات من السيرفر
    rent.images.forEach((img) => {
      const filePath = `uploads/${img}`;
      fs.unlinkSync(filePath);
    });

    rent.videos.forEach((vid) => {
      const filePath = `uploads/${vid}`;
      fs.unlinkSync(filePath);
    });

    res.status(200).json({ message: "تم حذف الإيجار بنجاح" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء حذف الإيجار" });
  }
});


rentRouter.put(
  '/:id',
  upload.fields([{ name: 'images' }, { name: 'videos' }]),
  async (req, res) => {
    try {
      const rent = await Rent.findById(req.params.id);

      if (!rent) {
        return res.status(404).json({ message: "الإيجار غير موجود" });
      }

      const {
        type,
        size,
        marketPrice,
        offeredPrice,
        location,
        noOfRooms,
        noOfBathrooms,
        deliveryDate,
        imagesToRemove,
        videosToRemove,
      } = req.body;

      // تحديث الحقول الأساسية
      if (type) rent.type = type;
      if (size) rent.size = size;
      if (marketPrice) rent.marketPrice = marketPrice;
      if (offeredPrice) rent.offeredPrice = offeredPrice;
      if (deliveryDate) rent.deliveryDate = deliveryDate;
      if (location) rent.location = JSON.parse(location);
      if (noOfRooms) rent.noOfRooms = noOfRooms;
      if (noOfBathrooms) rent.noOfBathrooms = noOfBathrooms;

      // الصور
      let currentImages = [...rent.images];

      if (imagesToRemove) {
        const imagesToRemoveArray = JSON.parse(imagesToRemove);
        imagesToRemoveArray.forEach((imageUrl) => {
          const filename = imageUrl.split("/").pop();
          const filePath = path.join(__dirname, "..", "uploads", filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          currentImages = currentImages.filter(img => !img.includes(filename));
        });
      }

      if (req.files.images) {
        const newImageFilenames = req.files.images.map(file => file.filename);
        currentImages = [...currentImages, ...newImageFilenames];
      }

      rent.images = currentImages;

      // الفيديوهات
      let currentVideos = [...rent.videos];

      if (videosToRemove) {
        const videosToRemoveArray = JSON.parse(videosToRemove);
        videosToRemoveArray.forEach((videoUrl) => {
          const filename = videoUrl.split("/").pop();
          const filePath = path.join(__dirname, "..", "uploads", filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          currentVideos = currentVideos.filter(vid => !vid.includes(filename));
        });
      }

      if (req.files.videos) {
        const newVideoFilenames = req.files.videos.map(file => file.filename);
        currentVideos = [...currentVideos, ...newVideoFilenames];
      }

      rent.videos = currentVideos;

      await rent.save();

      res.status(200).json(rent);
    } catch (error) {
      console.error("خطأ أثناء التحديث:", error);
      res.status(500).json({ message: 'حدث خطأ أثناء تحديث بيانات الإيجار', error: error.message });
    }
  }
);



export default rentRouter;