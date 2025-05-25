import express from 'express';
import Project from '../models/Project.js';
import authenticateUser from '../middlewares/userAuth.js';
import { upload } from '../middlewares/upload.js';

const projectRouter = express.Router();

// إضافة مشروع جديد
projectRouter.post(
  '/',
  authenticateUser,
  upload.fields([{ name: 'images' }, { name: 'videos' }]), // رفع ملفات صور وفيديوهات
  async (req, res) => {
    try {
      const { name, description, location, deliveryDate } = req.body;

      // التحقق من وجود الصور والفيديوهات
      if (!req.files || !req.files.images || !req.files.videos) {
        return res.status(400).json({ message: 'Images and Videos are required.' });
      }

      // رفع مسارات الصور والفيديوهات
      const imagesPaths = req.files.images.map(file => file.filename);
      const videosPaths = req.files.videos.map(file => file.filename);

      // إنشاء مشروع جديد
      const newProject = new Project({
        name,
        description,
        deliveryDate,
        location: JSON.parse(location), // تأكد إن الـ frontend بيبعت location كـ JSON string
        images: imagesPaths,
        videos: videosPaths,
        units: [], // مصفوفة فاضية للوحدات
      });

      await newProject.save();

      res.status(201).json(newProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

export default projectRouter;
