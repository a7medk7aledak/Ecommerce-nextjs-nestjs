# Project Architecture

## 📐 Overview

هذا المشروع يتبع معمارية Monorepo مع فصل كامل بين Frontend و Backend.

\`\`\`
┌─────────────────────────────────────────────────┐
│ Client (Next.js) │
│ Frontend - Port 3000 │
└────────────────┬────────────────────────────────┘
│ HTTP/REST API
│
┌────────────────▼────────────────────────────────┐
│ Server (NestJS) │
│ Backend - Port 5000 │
└────────────────┬────────────────────────────────┘
│ TypeORM
│
┌────────────────▼────────────────────────────────┐
│ PostgreSQL Database │
│ Port 5432 │
└─────────────────────────────────────────────────┘
\`\`\`

## 🗂️ Project Structure

### Client Structure (Next.js)

\`\`\`
client/
├── components/ # React Components
│ ├── common/ # Shared components
│ │ ├── AdminLayout.tsx
│ │ ├── UserLayout.tsx
│ │ ├── Footer.tsx
│ │ └── ...
│ ├── CategoryAddForm.tsx
│ └── ...
│
├── libs/ # Utilities & Helpers
│ ├── hooks/ # Custom React Hooks
│ │ ├── useAuth.ts
│ │ ├── useMediaQuery.ts
│ │ └── useRoles.ts
│ ├── redux/ # Redux State Management
│ │ ├── store.ts
│ │ └── reducers/
│ ├── swr/ # SWR Data Fetching Hooks
│ │ ├── useProduct.ts
│ │ ├── useUser.ts
│ │ └── ...
│ ├── cloudinary.ts # Image upload utility
│ ├── validate.ts # Validation functions
│ └── ...
│
├── pages/ # Next.js Pages (Routes)
│ ├── \_app.tsx # App wrapper
│ ├── \_document.tsx # Document wrapper
│ ├── index.tsx # Home page
│ ├── [slug].tsx # Dynamic pages
│ │
│ ├── admin/ # Admin panel pages
│ │ ├── dashboard/
│ │ ├── product/
│ │ ├── category/
│ │ └── ...
│ │
│ ├── api/ # API routes
│ │ └── auth/
│ │ └── [...nextauth].ts
│ │
│ └── ...
│
├── public/ # Static files
├── styles/ # CSS files
├── types/ # TypeScript type definitions
└── ...
\`\`\`

### Server Structure (NestJS)

\`\`\`
server/
├── src/
│ ├── main.ts # Entry point
│ ├── app.module.ts # Root module
│ │
│ ├── auth/ # Authentication Module
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ ├── auth.module.ts
│ │ ├── strategies/
│ │ └── guards/
│ │
│ ├── user/ # User Module
│ │ ├── user.controller.ts
│ │ ├── user.service.ts
│ │ ├── user.module.ts
│ │ ├── entities/
│ │ └── dto/
│ │
│ ├── product/ # Product Module
│ │ ├── product.controller.ts
│ │ ├── product.service.ts
│ │ ├── product.module.ts
│ │ ├── entities/
│ │ └── dto/
│ │
│ ├── category/ # Category Module
│ ├── order/ # Order Module
│ ├── attribute/ # Attribute Module
│ ├── variant/ # Product Variant Module
│ │
│ ├── guards/ # Global Guards
│ ├── decorator/ # Custom Decorators
│ ├── enums/ # Enums
│ └── libs/ # Utilities
│
└── test/ # E2E Tests
\`\`\`

## 🏗️ Architecture Patterns

### Client-Side (Next.js)

#### 1. Pages & Routing

- **File-based Routing**: كل ملف في `pages/` يصبح route
- **Dynamic Routes**: `[slug].tsx` للـ routes الديناميكية
- **API Routes**: `pages/api/` للـ serverless functions

#### 2. State Management

- **Redux Toolkit**: للـ global state
- **SWR**: لـ data fetching و caching
- **Redux Persist**: لحفظ الـ state

#### 3. Data Fetching

\`\`\`typescript
// Using SWR
import useSWR from 'swr';

const { data, error } = useSWR(
\`\${process.env.NEXT_PUBLIC_API_URL}/product/\${id}\`,
fetcher
);
\`\`\`

#### 4. Authentication

- **NextAuth.js**: للـ authentication
- **JWT**: للـ tokens
- **Refresh Token**: للـ token refresh

### Server-Side (NestJS)

#### 1. Modular Architecture

كل feature في module منفصل يحتوي على:

- **Controller**: للـ HTTP endpoints
- **Service**: للـ business logic
- **Module**: لربط كل شيء
- **Entity**: للـ database models
- **DTO**: لـ data validation

#### 2. Dependency Injection

\`\`\`typescript
@Injectable()
export class ProductService {
constructor(
@InjectRepository(Product)
private productRepo: Repository<Product>,
) {}
}
\`\`\`

#### 3. Guards & Decorators

\`\`\`typescript
@UseGuards(AccessTokenGuard)
@Get('profile')
getProfile(@CurrentUser() user) {
return user;
}
\`\`\`

#### 4. Database (TypeORM)

\`\`\`typescript
@Entity()
export class Product {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@ManyToOne(() => Category)
category: Category;
}
\`\`\`

## 🔄 Data Flow

### User Request Flow

\`\`\`

1. User Action (Browser)
   ↓
2. Next.js Component
   ↓
3. SWR/Redux (State Management)
   ↓
4. HTTP Request (Axios)
   ↓
5. NestJS Controller
   ↓
6. Service Layer (Business Logic)
   ↓
7. TypeORM Repository
   ↓
8. PostgreSQL Database
   ↓
9. Response back through layers
   ↓
10. UI Update
    \`\`\`

### Authentication Flow

\`\`\`

1. User Login
   ↓
2. NextAuth validates credentials
   ↓
3. Server validates & returns JWT
   ↓
4. JWT stored in session
   ↓
5. Subsequent requests include JWT
   ↓
6. Server validates JWT
   ↓
7. Access granted/denied
   \`\`\`

## 📦 Module Dependencies

### Client Dependencies

**Core:**

- next, react, react-dom
- typescript

**State Management:**

- @reduxjs/toolkit
- react-redux
- redux-persist

**Data Fetching:**

- swr
- axios

**UI:**

- @nextui-org/react
- react-icons
- sweetalert2

**Forms:**

- react-hook-form

**Authentication:**

- next-auth

### Server Dependencies

**Core:**

- @nestjs/core
- @nestjs/common
- typescript

**Database:**

- typeorm
- @nestjs/typeorm
- pg (PostgreSQL)

**Authentication:**

- @nestjs/passport
- @nestjs/jwt
- passport-jwt
- bcrypt

**Validation:**

- class-validator
- class-transformer

**Documentation:**

- @nestjs/swagger

## 🔐 Security Architecture

### Client-Side Security

- **XSS Protection**: React's automatic escaping
- **CSRF Protection**: NextAuth CSRF tokens
- **Secure Headers**: Custom headers in next.config.js
- **Environment Variables**: Prefix with NEXT*PUBLIC*

### Server-Side Security

- **Authentication**: JWT tokens
- **Authorization**: Role-based guards
- **Input Validation**: class-validator DTOs
- **Password Hashing**: bcrypt
- **CORS**: Configured origins
- **Rate Limiting**: (to be implemented)

## 📊 Database Schema

### Main Entities

\`\`\`
User
├── id: number
├── email: string
├── password: string (hashed)
├── role: enum
└── orders: Order[]

Product
├── id: number
├── name: string
├── price: number
├── category: Category
├── variants: Variant[]
└── attributes: Attribute[]

Category
├── id: number
├── name: string
├── slug: string
└── products: Product[]

Order
├── id: number
├── user: User
├── items: OrderItem[]
├── status: enum
└── total: number
\`\`\`

## 🚀 Performance Optimization

### Client-Side

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Dynamic imports
- **Caching**: SWR automatic caching
- **Memoization**: useMemo, useCallback

### Server-Side

- **Database Indexing**: على الحقول الأكثر استخداماً
- **Query Optimization**: TypeORM query builder
- **Caching**: (to be implemented - Redis)
- **Pagination**: على جميع list endpoints

## 📱 Deployment Architecture

\`\`\`
┌─────────────────────────────────────────────────┐
│ Vercel (Client) │
│ your-app.vercel.app │
└────────────────┬────────────────────────────────┘
│
┌────────────────▼────────────────────────────────┐
│ Railway/Render (Server) │
│ your-api.railway.app │
└────────────────┬────────────────────────────────┘
│
┌────────────────▼────────────────────────────────┐
│ PostgreSQL (Managed Database) │
│ Railway/Render/Supabase │
└─────────────────────────────────────────────────┘
\`\`\`

## 📚 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [React Documentation](https://react.dev)

---

للمزيد من التفاصيل، راجع الملفات الأخرى في التوثيق.
