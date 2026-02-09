# 📖 دليل التثبيت والإعداد الشامل

هذا الدليل سيساعدك في إعداد المشروع من الصفر.

## 📋 المتطلبات الأساسية

### 1. تثبيت Node.js
- قم بتحميل Node.js 18.x أو أحدث من [nodejs.org](https://nodejs.org/)
- تحقق من التثبيت:
  \`\`\`bash
  node --version  # يجب أن يظهر v18.x أو أعلى
  npm --version
  \`\`\`

### 2. تثبيت PostgreSQL
- **Windows**: قم بتحميله من [postgresql.org](https://www.postgresql.org/download/windows/)
- **MacOS**: \`brew install postgresql@15\`
- **Linux**: \`sudo apt-get install postgresql-15\`

### 3. تثبيت Git
- قم بتحميله من [git-scm.com](https://git-scm.com/)

## 🚀 خطوات التثبيت التفصيلية

### الخطوة 1: Clone المشروع

\`\`\`bash
git clone <your-repository-url>
cd Ecommerce-nextjs-nestjs
\`\`\`

### الخطوة 2: إعداد قاعدة البيانات

#### على Windows:
1. افتح pgAdmin أو استخدم Command Line:
\`\`\`bash
# افتح psql
psql -U postgres

# أنشئ قاعدة البيانات
CREATE DATABASE ecommerce_db;

# تحقق من الإنشاء
\\l
\`\`\`

#### على Linux/MacOS:
\`\`\`bash
# ابدأ خدمة PostgreSQL
sudo systemctl start postgresql  # Linux
brew services start postgresql@15  # MacOS

# أنشئ قاعدة البيانات
createdb ecommerce_db

# أو استخدم psql
psql -U postgres
CREATE DATABASE ecommerce_db;
\`\`\`

### الخطوة 3: إعداد Server (Backend)

\`\`\`bash
# انتقل إلى مجلد السيرفر
cd server

# تثبيت المكتبات
npm install

# إنشاء ملف البيئة
cp .env.example .env

# على Windows
copy .env.example .env
\`\`\`

#### تعديل ملف .env للسيرفر

افتح ملف \`.env\` وعدل القيم التالية:

\`\`\`env
# وضع التطوير
NODE_ENV=development

# منفذ السيرفر
APP_PORT=5000

# عناوين URL
SERVER=http://localhost:5000
CLIENT=http://localhost:3000

# اتصال قاعدة البيانات
# عدل username و password حسب إعداداتك
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/ecommerce_db

# مفاتيح JWT (يجب تغييرها للإنتاج!)
# يمكنك توليد مفاتيح عشوائية باستخدام:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_ACCESS_SECRET=your-generated-secret-key-here
JWT_REFRESH_SECRET=your-generated-refresh-key-here

# مفاتيح الدفع (اختيارية للتطوير)
ZALO_KEY1=
ZALO_KEY2=
\`\`\`

#### توليد مفاتيح JWT آمنة:

\`\`\`bash
# في terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

قم بنسخ الناتج واستخدمه في \`JWT_ACCESS_SECRET\` و \`JWT_REFRESH_SECRET\`.

#### تشغيل السيرفر:

\`\`\`bash
# من داخل مجلد server
npm run dev
\`\`\`

يجب أن ترى:
\`\`\`
[Nest] 12345  - Server running on http://localhost:5000
\`\`\`

### الخطوة 4: إعداد Client (Frontend)

افتح terminal جديد:

\`\`\`bash
# انتقل إلى مجلد العميل
cd client

# تثبيت المكتبات
npm install

# إنشاء ملف البيئة
cp .env.example .env

# على Windows
copy .env.example .env
\`\`\`

#### تعديل ملف .env للعميل

افتح ملف \`.env\` وعدل القيم:

\`\`\`env
# عنوان API
NEXT_PUBLIC_API_URL=http://localhost:5000

# مفتاح NextAuth
# يمكنك توليده باستخدام:
# openssl rand -base64 32
AUTH_SECRET=your-generated-auth-secret

# عنوان التطبيق
NEXTAUTH_URL=http://localhost:3000

# وضع التطوير
NODE_ENV=development
\`\`\`

#### توليد مفتاح AUTH_SECRET:

\`\`\`bash
# على Linux/MacOS
openssl rand -base64 32

# على Windows (PowerShell)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\`\`\`

#### تشغيل Client:

\`\`\`bash
# من داخل مجلد client
npm run dev
\`\`\`

يجب أن ترى:
\`\`\`
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
\`\`\`

### الخطوة 5: التحقق من التثبيت

1. **افتح المتصفح على**: http://localhost:3000
2. **تحقق من API Documentation**: http://localhost:5000/api
3. **تحقق من اتصال قاعدة البيانات**: يجب أن ترى رسائل في terminal السيرفر

## 🐳 التشغيل باستخدام Docker (بديل)

إذا كان لديك Docker مثبت:

\`\`\`bash
# من المجلد الرئيسي للمشروع
docker-compose -f docker-compose.dev.yml up -d

# للإيقاف
docker-compose -f docker-compose.dev.yml down
\`\`\`

هذا سيقوم بتشغيل:
- PostgreSQL على المنفذ 5432
- Server على المنفذ 5000
- Client على المنفذ 3000

## 🔧 حل المشاكل الشائعة

### مشكلة 1: Cannot connect to database

**الحل:**
\`\`\`bash
# تحقق من أن PostgreSQL يعمل
# Windows
sc query postgresql-x64-15

# Linux
sudo systemctl status postgresql

# MacOS
brew services list
\`\`\`

### مشكلة 2: Port already in use

**الحل:**
\`\`\`bash
# على Windows (PowerShell)
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# أوقف العملية أو غير المنفذ في .env

# على Linux/MacOS
lsof -ti:3000
lsof -ti:5000
\`\`\`

### مشكلة 3: Module not found

**الحل:**
\`\`\`bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules package-lock.json
npm install

# على Windows
rmdir /s node_modules
del package-lock.json
npm install
\`\`\`

### مشكلة 4: TypeORM synchronize error

**الحل:**
تأكد من أن \`DATABASE_URL\` صحيح في \`.env\` وأن قاعدة البيانات تم إنشاؤها.

## 📊 إنشاء بيانات تجريبية

بعد تشغيل المشروع لأول مرة، يمكنك إنشاء بيانات تجريبية:

\`\`\`bash
cd server
npm run seed  # إذا كان لديك seed script
\`\`\`

## 🔐 إنشاء حساب Admin

1. سجل حساب جديد من واجهة المستخدم
2. في قاعدة البيانات، عدل role المستخدم:

\`\`\`sql
-- افتح psql أو pgAdmin
UPDATE "user" SET role = 'admin' WHERE email = 'your-email@example.com';
\`\`\`

## ✅ Next Steps

بعد التثبيت الناجح:

1. ✅ تصفح الموقع على http://localhost:3000
2. ✅ تصفح API Documentation على http://localhost:5000/api
3. ✅ أنشئ حساب مستخدم جديد
4. ✅ غير role إلى admin للوصول للوحة التحكم
5. ✅ ابدأ بإضافة الفئات والمنتجات

## 📚 موارد إضافية

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [NextAuth.js Documentation](https://next-auth.js.org/)

## 🆘 هل تحتاج مساعدة؟

إذا واجهت أي مشاكل:
1. راجع قسم حل المشاكل أعلاه
2. تحقق من logs في Terminal
3. افتح Issue على GitHub
4. راجع Documentation الرسمي للتقنيات المستخدمة

---

تم بنجاح! 🎉 الآن أنت جاهز للتطوير.
