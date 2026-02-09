# API Documentation

## Base URL

\`\`\`
Development: http://localhost:5000
Production: https://your-production-url.com
\`\`\`

## Authentication

يستخدم API نظام JWT للمصادقة.

### Login

\`\`\`http
POST /auth/login
Content-Type: application/json

{
"username": "user@example.com",
"password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"user": {
"id": 1,
"email": "user@example.com",
"role": "user"
}
}
\`\`\`

### استخدام Token

\`\`\`http
GET /api/endpoint
Authorization: Bearer {accessToken}
\`\`\`

## Endpoints

### 👤 Users

#### Get User Profile

\`\`\`http
GET /user/:id
Authorization: Bearer {token}
\`\`\`

#### Update User

\`\`\`http
PATCH /user/:id
Authorization: Bearer {token}
Content-Type: application/json

{
"name": "New Name",
"email": "newemail@example.com"
}
\`\`\`

#### Update Password

\`\`\`http
POST /user/update-password
Authorization: Bearer {token}
Content-Type: application/json

{
"oldPassword": "oldpass123",
"newPassword": "newpass123"
}
\`\`\`

### 📦 Products

#### Get All Products

\`\`\`http
GET /product?page=1&limit=10&search=keyword
\`\`\`

**Query Parameters:**

- \`page\` (optional): رقم الصفحة (default: 1)
- \`limit\` (optional): عدد المنتجات (default: 10)
- \`search\` (optional): كلمة البحث

**Response:**
\`\`\`json
{
"items": [
{
"id": 1,
"name": "Product Name",
"price": 99.99,
"description": "Description",
"category": {
"id": 1,
"name": "Category Name"
}
}
],
"meta": {
"totalItems": 100,
"itemCount": 10,
"currentPage": 1,
"totalPages": 10
}
}
\`\`\`

#### Get Product by ID

\`\`\`http
GET /product/:id
\`\`\`

#### Get Products by Category

\`\`\`http
GET /product/category/:slug
\`\`\`

### 🏷️ Categories

#### Get All Categories

\`\`\`http
GET /category
\`\`\`

#### Get Category by Slug

\`\`\`http
GET /category/:slug
\`\`\`

### 🛒 Orders

#### Create Order

\`\`\`http
POST /order
Authorization: Bearer {token}
Content-Type: application/json

{
"items": [
{
"variantId": 1,
"quantity": 2
}
],
"shippingAddress": {
"fullName": "John Doe",
"phone": "0123456789",
"address": "123 Street",
"city": "City",
"district": "District"
},
"paymentMethod": "cash"
}
\`\`\`

#### Get User Orders

\`\`\`http
GET /order/list?page=1&limit=10&type=all
Authorization: Bearer {token}
\`\`\`

**Query Parameters:**

- \`type\`: all | pending | completed | cancelled

#### Get Order by ID

\`\`\`http
GET /order/:id
Authorization: Bearer {token}
\`\`\`

### 🔐 Admin Endpoints

جميع endpoints الإدارة تتطلب role="admin"

#### Admin - Get All Products

\`\`\`http
GET /admin/product?page=1&limit=10
Authorization: Bearer {admin-token}
\`\`\`

#### Admin - Create Product

\`\`\`http
POST /admin/product
Authorization: Bearer {admin-token}
Content-Type: application/json

{
"name": "Product Name",
"price": 99.99,
"description": "Description",
"categoryId": 1,
"images": ["url1", "url2"]
}
\`\`\`

#### Admin - Update Product

\`\`\`http
PATCH /admin/product/:id
Authorization: Bearer {admin-token}
Content-Type: application/json

{
"name": "Updated Name",
"price": 129.99
}
\`\`\`

#### Admin - Delete Product

\`\`\`http
DELETE /admin/product/:id
Authorization: Bearer {admin-token}
\`\`\`

#### Admin - Get All Orders

\`\`\`http
GET /admin/order?page=1&limit=10&status=all
Authorization: Bearer {admin-token}
\`\`\`

#### Admin - Update Order Status

\`\`\`http
PATCH /admin/order/:id
Authorization: Bearer {admin-token}
Content-Type: application/json

{
"status": "completed"
}
\`\`\`

## Error Responses

### 400 Bad Request

\`\`\`json
{
"statusCode": 400,
"message": ["field must be a string"],
"error": "Bad Request"
}
\`\`\`

### 401 Unauthorized

\`\`\`json
{
"statusCode": 401,
"message": "Unauthorized"
}
\`\`\`

### 403 Forbidden

\`\`\`json
{
"statusCode": 403,
"message": "Forbidden resource"
}
\`\`\`

### 404 Not Found

\`\`\`json
{
"statusCode": 404,
"message": "Resource not found"
}
\`\`\`

### 500 Internal Server Error

\`\`\`json
{
"statusCode": 500,
"message": "Internal server error"
}
\`\`\`

## Rate Limiting

- **عدد الطلبات**: 100 طلب
- **الفترة الزمنية**: 15 دقيقة
- **Header**: \`X-RateLimit-Remaining\`

## Pagination

جميع endpoints التي تدعم pagination تستخدم نفس الصيغة:

**Request:**
\`\`\`
GET /endpoint?page=1&limit=10
\`\`\`

**Response:**
\`\`\`json
{
"items": [...],
"meta": {
"totalItems": 100,
"itemCount": 10,
"itemsPerPage": 10,
"totalPages": 10,
"currentPage": 1
}
}
\`\`\`

## Swagger Documentation

للحصول على توثيق تفاعلي كامل، قم بزيارة:

\`\`\`
http://localhost:5000/api
\`\`\`

هناك يمكنك:

- تصفح جميع Endpoints
- اختبار API مباشرة
- رؤية Schemas والنماذج
- تجربة المصادقة

---

لمزيد من المعلومات، راجع [README.md](README.md)
