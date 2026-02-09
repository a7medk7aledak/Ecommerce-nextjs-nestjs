# Frequently Asked Questions (FAQ)

أسئلة شائعة وإجاباتها حول المشروع.

## 📋 عام

### ما هو هذا المشروع؟
منصة تجارة إلكترونية متكاملة مبنية باستخدام Next.js (Frontend) و NestJS (Backend) مع دعم كامل للغة العربية.

### ما التقنيات المستخدمة؟
- **Frontend**: Next.js 12, React, TypeScript, Redux, NextUI
- **Backend**: NestJS 10, TypeScript, TypeORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js, JWT
- **Deployment**: Vercel (Client), Railway/Render (Server)

### هل يدعم المشروع لغات متعددة؟
حالياً المشروع مصمم للغة العربية (RTL). دعم لغات إضافية مخطط له في المستقبل.

## 🚀 التثبيت والإعداد

### ما هي متطلبات التشغيل؟
- Node.js 18+
- PostgreSQL 15+
- npm أو yarn

### كيف أبدأ المشروع لأول مرة؟

**Windows:**
\`\`\`bash
setup.bat
\`\`\`

**Linux/Mac:**
\`\`\`bash
chmod +x setup.sh
./setup.sh
\`\`\`

أو يدوياً:
\`\`\`bash
# تثبيت dependencies
cd client && npm install
cd ../server && npm install

# إنشاء ملفات .env
cp client/.env.example client/.env
cp server/.env.example server/.env

# تعديل ملفات .env
# ثم تشغيل المشروع
\`\`\`

### لماذا لا يعمل المشروع بعد التثبيت؟

**تحقق من:**
1. ملفات `.env` موجودة ومملوءة بالبيانات الصحيحة
2. PostgreSQL يعمل
3. قاعدة البيانات تم إنشاؤها
4. المنافذ 3000 و 5000 غير مستخدمة

### كيف أنشئ قاعدة البيانات؟

\`\`\`bash
# PostgreSQL Command Line
psql -U postgres
CREATE DATABASE ecommerce_db;
\\q

# أو باستخدام
createdb ecommerce_db
\`\`\`

## 🔐 المصادقة والأمان

### كيف أولّد مفاتيح JWT آمنة؟

\`\`\`bash
# Linux/Mac
openssl rand -base64 32

# Windows/Any OS
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\`\`\`

### كيف أنشئ حساب Admin؟

1. سجل حساب جديد من الواجهة
2. في قاعدة البيانات، عدّل role:
\`\`\`sql
UPDATE "user" SET role = 'admin' WHERE email = 'your-email@example.com';
\`\`\`

### هل البيانات الحساسة آمنة؟
- كلمات المرور يتم hash-ها باستخدام bcrypt
- JWT tokens للمصادقة
- متغيرات البيئة لا يتم تتبعها في Git
- HTTPS في الإنتاج

## 🐛 حل المشاكل

### "Port 3000 is already in use"

**Windows:**
\`\`\`powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

**Linux/Mac:**
\`\`\`bash
lsof -ti:3000 | xargs kill -9
\`\`\`

### "Cannot connect to database"

**تحقق من:**
1. PostgreSQL يعمل: \`pg_isready\`
2. \`DATABASE_URL\` صحيح في `.env`
3. قاعدة البيانات موجودة
4. اسم المستخدم وكلمة المرور صحيحان

### "Module not found" errors

\`\`\`bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules package-lock.json
npm install

# على Windows
rmdir /s /q node_modules
del package-lock.json
npm install
\`\`\`

### صفحة بيضاء بعد التشغيل

**تحقق من:**
1. Console logs في المتصفح
2. Server logs في Terminal
3. \`NEXT_PUBLIC_API_URL\` صحيح في client/.env
4. Server يعمل على Port الصحيح

## 💻 التطوير

### كيف أضيف feature جديد؟

1. أنشئ branch جديد:
\`\`\`bash
git checkout -b feature/my-feature
\`\`\`

2. طوّر الميزة
3. اكتب tests
4. Commit وانشر:
\`\`\`bash
git commit -m "feat: add my feature"
git push origin feature/my-feature
\`\`\`

5. افتح Pull Request

### كيف أضيف entity جديد في Database؟

1. أنشئ Entity class:
\`\`\`typescript
// server/src/myentity/entities/myentity.entity.ts
@Entity()
export class MyEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
}
\`\`\`

2. أنشئ Module, Service, Controller
3. أضف Module إلى app.module.ts
4. TypeORM سينشئ الجدول تلقائياً في Development

### كيف أضيف endpoint جديد في API؟

\`\`\`typescript
// في Controller
@Get('my-endpoint')
async myEndpoint() {
  return this.myService.getData();
}

// في Service
async getData() {
  // business logic
}
\`\`\`

### كيف أحمي endpoint بالمصادقة؟

\`\`\`typescript
@UseGuards(AccessTokenGuard)
@Get('protected')
getProtected(@CurrentUser() user) {
  return user;
}
\`\`\`

## 🚢 النشر (Deployment)

### أين يمكنني نشر المشروع؟

**Client (Next.js):**
- Vercel (موصى به)
- Netlify
- AWS Amplify

**Server (NestJS):**
- Railway (موصى به)
- Render
- Heroku
- AWS EC2
- DigitalOcean

**Database:**
- Railway PostgreSQL
- Render PostgreSQL
- Supabase
- AWS RDS

### كيف أنشر على Vercel؟

1. Push الكود إلى GitHub
2. اذهب إلى [vercel.com/new](https://vercel.com/new)
3. اختر repository
4. حدد root directory: `client`
5. أضف environment variables
6. Deploy!

راجع [DEPLOYMENT.md](DEPLOYMENT.md) للتفاصيل.

### هل يمكنني استخدام Docker؟

نعم! المشروع يدعم Docker:

\`\`\`bash
# Development
docker-compose -f docker-compose.dev.yml up -d

# Production
docker-compose up -d
\`\`\`

## 📱 الميزات

### كيف أضيف منتج جديد؟

1. سجل دخول كـ Admin
2. اذهب إلى لوحة التحكم > المنتجات
3. اضغط "إضافة منتج"
4. املأ التفاصيل
5. ارفع الصور
6. احفظ

### كيف يعمل نظام الدفع؟

المشروع يدعم:
- **Cash on Delivery**
- **ZaloPay** (يتطلب API keys)
- **MoMo** (يتطلب API keys)

لتفعيل بوابات الدفع، أضف keys في server/.env.

### كيف أضيف بوابة دفع جديدة؟

1. أنشئ service جديد في order module
2. طبّق payment logic
3. أضف endpoint للـ callback
4. أضف option في الواجهة

راجع [TODO.md](TODO.md) للميزات المخططة.

## 🛠️ الصيانة

### كيف أحدّث Dependencies؟

\`\`\`bash
# تحقق من updates
npm outdated

# حدّث package واحد
npm update package-name

# حدّث كل packages
npm update

# للـ major updates
npm install package-name@latest
\`\`\`

### كيف أعمل backup لقاعدة البيانات؟

\`\`\`bash
# Export
pg_dump -U postgres ecommerce_db > backup.sql

# Import
psql -U postgres ecommerce_db < backup.sql
\`\`\`

### كيف أراقب الأخطاء؟

استخدم خدمات مثل:
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [New Relic](https://newrelic.com) - Performance monitoring

## 🤝 المساهمة

### كيف أساهم في المشروع؟

1. Fork المشروع
2. أنشئ branch للميزة
3. طوّر وtest
4. افتح Pull Request

راجع [CONTRIBUTING.md](CONTRIBUTING.md) للتفاصيل.

### ما هي coding standards المتبعة؟

- **TypeScript** للـ type safety
- **ESLint** للـ linting
- **Prettier** للـ formatting
- **Conventional Commits** للـ commit messages

### لدي فكرة لميزة جديدة، ماذا أفعل؟

1. افتح Issue على GitHub
2. اشرح الميزة والفائدة
3. انتظر feedback
4. ابدأ التطوير بعد الموافقة

## 📚 التعلم والموارد

### أين أتعلم المزيد عن التقنيات المستخدمة؟

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [TypeORM Docs](https://typeorm.io)
- [React Docs](https://react.dev)

**Courses:**
- [Next.js by Vercel](https://nextjs.org/learn)
- [NestJS Official Course](https://courses.nestjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### هل هناك community للدعم؟

- GitHub Issues للمشاكل التقنية
- GitHub Discussions للنقاشات
- Stack Overflow للأسئلة العامة

## 🆘 لم أجد إجابة لسؤالي؟

1. ابحث في Issues المغلقة على GitHub
2. راجع الـ Documentation الرسمي
3. افتح Issue جديد
4. اتصل بالفريق

---

آخر تحديث: 2026-02-09

**لم تجد ما تبحث عنه؟** [افتح Issue جديد](https://github.com/your-repo/issues/new)
