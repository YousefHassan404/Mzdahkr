import express from 'express';
import Unit from '../models/Unit.js';
import authenticateUser from '../middlewares/userAuth.js';
import { upload } from '../middlewares/upload.js';

const unitRouter = express.Router();

// اضافة وحدة جديدة
unitRouter.post(
  '/',
  authenticateUser,
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

export default unitRouter;
