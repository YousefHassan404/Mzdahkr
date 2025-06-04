import express from 'express';
import Unit from '../models/Unit.js';
import authenticateUser from '../middlewares/userAuth.js';
import { upload } from '../middlewares/upload.js';

const unitRouter = express.Router();

// اضافة وحدة جديدة
unitRouter.post(
  '/',
  upload.fields([{ name: 'images' }, { name: 'videos' }]), // رفع ملفات صور وفيديوهات
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
        return res.status(400).json({ message: 'Images and Videos are required.' });
      }

      // رفع مسارات الصور والفيديوهات
      const imagesPaths = req.files.images.map(file => file.filename);
      const videosPaths = req.files.videos.map(file => file.filename);

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
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);


unitRouter.get('/', async (req, res) => {
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
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الوحدات' });
  }
});


unitRouter.get('/:id', async (req, res) => {
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


export default unitRouter;
