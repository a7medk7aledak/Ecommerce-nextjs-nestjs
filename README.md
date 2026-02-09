# 🛒 E-commerce Platform - Next.js & NestJS

منصة تجارة إلكترونية متكاملة مبنية باستخدام Next.js للواجهة الأمامية و NestJS للخادم الخلفي، مع دعم كامل للغة العربية.

## 📋 المحتويات

- [نظرة عامة](#نظرة-عامة)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [المتطلبات](#المتطلبات)
- [التثبيت والإعداد](#التثبيت-والإعداد)
- [البنية](#البنية)
- [المميزات](#المميزات)
- [API Documentation](#api-documentation)

## 🎯 نظرة عامة

منصة تجارة إلكترونية شاملة تتضمن:
- 🛍️ واجهة متجر إلكتروني متكاملة
- 👨‍💼 لوحة تحكم للإدارة
- 🔐 نظام مصادقة و تفويض
- 💳 بوابات دفع متعددة (ZaloPay, MoMo)
- 📦 إدارة المنتجات والطلبات
- 👥 إدارة المستخدمين
- 📊 نظام تقارير وإحصائيات

## 🚀 التقنيات المستخدمة

### Frontend (Client)
- **Next.js 12.3** - React Framework
- **TypeScript** - Type Safety
- **NextUI** - UI Components
- **Redux Toolkit** - State Management
- **SWR** - Data Fetching
- **NextAuth.js** - Authentication
- **Chart.js** - Data Visualization
- **Cloudinary** - Image Management

### Backend (Server)
- **NestJS 10** - Node.js Framework
- **TypeScript** - Type Safety
- **TypeORM** - ORM
- **PostgreSQL** - Database
- **Passport.js** - Authentication
- **JWT** - Token-based Auth
- **Swagger** - API Documentation
- **Nodemailer** - Email Service

## 📦 المتطلبات

قبل البدء، تأكد من تثبيت:

- **Node.js** >= 18.x
- **npm** or **yarn**
- **PostgreSQL** >= 15.x
- **Git**

## ⚙️ التثبيت والإعداد

### 1️⃣ Clone المشروع

\`\`\`bash
git clone <repository-url>
cd Ecommerce-nextjs-nestjs
\`\`\`

### 2️⃣ إعداد قاعدة البيانات

\`\`\`bash
# إنشاء قاعدة بيانات PostgreSQL
createdb ecommerce_db

# أو استخدام psql
psql -U postgres
CREATE DATABASE ecommerce_db;
\`\`\`

### 3️⃣ إعداد Backend (Server)

\`\`\`bash
cd server

# تثبيت المكتبات
npm install

# إنشاء ملف البيئة
cp .env.example .env

# تعديل ملف .env وإضافة البيانات المطلوبة
# DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce_db
# JWT_ACCESS_SECRET=your-secret-key
# JWT_REFRESH_SECRET=your-refresh-key
# ...

# تشغيل الخادم
npm run dev
\`\`\`

الخادم سيعمل على: http://localhost:5000

### 4️⃣ إعداد Frontend (Client)

\`\`\`bash
cd client

# تثبيت المكتبات
npm install

# إنشاء ملف البيئة
cp .env.example .env

# تعديل ملف .env
# NEXT_PUBLIC_API_URL=http://localhost:5000
# AUTH_SECRET=your-auth-secret
# ...

# تشغيل التطبيق
npm run dev
\`\`\`

التطبيق سيعمل على: http://localhost:3000

### 🐳 استخدام Docker (اختياري)

\`\`\`bash
# تشغيل كل الخدمات مع Docker Compose
docker-compose up -d

# أو استخدام ملف Development
docker-compose -f docker-compose.dev.yml up -d

# إيقاف الخدمات
docker-compose down
\`\`\`

## 📁 البنية

\`\`\`
Ecommerce-nextjs-nestjs/
├── client/                 # Next.js Frontend
│   ├── components/        # React Components
│   ├── libs/              # Utilities & Hooks
│   ├── pages/             # Next.js Pages
│   ├── public/            # Static Files
│   ├── styles/            # CSS Files
│   └── types/             # TypeScript Types
│
├── server/                # NestJS Backend
│   ├── src/
│   │   ├── auth/          # Authentication Module
│   │   ├── user/          # User Module
│   │   ├── product/       # Product Module
│   │   ├── category/      # Category Module
│   │   ├── order/         # Order Module
│   │   ├── attribute/     # Attribute Module
│   │   ├── variant/       # Variant Module
│   │   └── guards/        # Guards & Decorators
│   └── test/              # Test Files
│
├── docker-compose.yml     # Docker Production Config
├── docker-compose.dev.yml # Docker Development Config
└── README.md              # هذا الملف
\`\`\`

## ✨ المميزات

### للمستخدمين:
- ✅ تصفح المنتجات حسب الفئات
- ✅ البحث المتقدم عن المنتجات
- ✅ سلة التسوق
- ✅ إتمام الطلبات
- ✅ طرق دفع متعددة
- ✅ تتبع الطلبات
- ✅ التعليقات والتقييمات
- ✅ الملف الشخصي

### للإدارة:
- ✅ إدارة المنتجات (إضافة، تعديل، حذف)
- ✅ إدارة الفئات
- ✅ إدارة الطلبات
- ✅ إدارة المستخدمين
- ✅ إحصائيات ولوحة معلومات
- ✅ إدارة الصلاحيات

## 📚 API Documentation

بعد تشغيل السيرفر، يمكنك الوصول إلى Swagger Documentation على:

\`\`\`
http://localhost:5000/api
\`\`\`

## 🔑 الحسابات الافتراضية

بعد التثبيت الأول، يمكنك إنشاء حساب مسؤول أو استخدام:

\`\`\`
Admin Account:
Email: admin@example.com
Password: [سيتم إنشاؤه عند أول تشغيل]
\`\`\`

## 🧪 الاختبارات

### Backend Tests

\`\`\`bash
cd server

# Unit Tests
npm run test

# E2E Tests
npm run test:e2e

# Test Coverage
npm run test:cov
\`\`\`

### Frontend Tests

\`\`\`bash
cd client

# Run Tests
npm run test
\`\`\`

## 🔧 Scripts المتاحة

### Server Scripts

\`\`\`bash
npm run dev          # تشغيل وضع التطوير
npm run build        # بناء للإنتاج
npm run start:prod   # تشغيل وضع الإنتاج
npm run lint         # فحص الكود
npm run format       # تنسيق الكود
\`\`\`

### Client Scripts

\`\`\`bash
npm run dev          # تشغيل وضع التطوير
npm run build        # بناء للإنتاج
npm run start        # تشغيل وضع الإنتاج
npm run lint         # فحص الكود
\`\`\`

## 🌐 المتغيرات البيئية

### Client (.env)

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
AUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
\`\`\`

### Server (.env)

\`\`\`env
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db
APP_PORT=5000
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
SERVER=http://localhost:5000
CLIENT=http://localhost:3000
NODE_ENV=development
\`\`\`

## 🚀 النشر (Deployment)

### Vercel (Client)

\`\`\`bash
cd client
vercel deploy
\`\`\`

### Railway/Render (Server)

راجع ملف `vercel.json` في مجلد server

## 🤝 المساهمة

نرحب بمساهماتك! يرجى:

1. Fork المشروع
2. إنشاء branch للميزة الجديدة (\`git checkout -b feature/AmazingFeature\`)
3. Commit التغييرات (\`git commit -m 'Add some AmazingFeature'\`)
4. Push إلى Branch (\`git push origin feature/AmazingFeature\`)
5. فتح Pull Request

## 📝 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE)

## 📧 التواصل

للأسئلة والاستفسارات، يرجى التواصل عبر:
- Issue Tracker
- Email: [your-email]

## 🙏 شكر وتقدير

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [NextUI](https://nextui.org/)
- [TypeORM](https://typeorm.io/)

---

صُنع بـ ❤️ باستخدام Next.js & NestJS
