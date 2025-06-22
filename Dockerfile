# استخدم صورة Node خفيفة
FROM node:20-alpine

# إعداد مجلد العمل الأساسي
WORKDIR /app

# تثبيت تبعيات الfrontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# تثبيت تبعيات الbackend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# نسخ كل ملفات المشروع
COPY . .

# فتح البورتات (اختياري - فعليًا بنحددها في docker-compose)
EXPOSE 5173
EXPOSE 5000

# أمر افتراضي (غير مهم لأن docker-compose بيتحكم فيه)
CMD ["echo", "Use docker-compose to run frontend and backend separately."]
