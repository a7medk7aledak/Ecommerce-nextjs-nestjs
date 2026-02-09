# أمثلة على الاستخدام (Usage Examples)

أمثلة عملية لكيفية استخدام المشروع وإضافة ميزات جديدة.

## 📋 جدول المحتويات

- [إضافة Entity جديد](#إضافة-entity-جديد)
- [إضافة API Endpoint](#إضافة-api-endpoint)
- [إضافة Component في React](#إضافة-component-في-react)
- [استخدام SWR للـ Data Fetching](#استخدام-swr-للـ-data-fetching)
- [إضافة Guard في NestJS](#إضافة-guard-في-nestjs)
- [استخدام Redux](#استخدام-redux)

---

## إضافة Entity جديد

### 1. إنشاء Entity

\`\`\`typescript
// server/src/review/entities/review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column('text')
  comment: string;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
\`\`\`

### 2. إنشاء DTO

\`\`\`typescript
// server/src/review/dto/create-review.dto.ts
import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  productId: number;
}
\`\`\`

### 3. إنشاء Service

\`\`\`typescript
// server/src/review/review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(userId: number, createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      user: { id: userId },
      product: { id: createReviewDto.productId },
    });
    
    return await this.reviewRepository.save(review);
  }

  async findByProduct(productId: number) {
    return await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    
    return review;
  }

  async remove(id: number, userId: number) {
    const review = await this.findOne(id);
    
    if (review.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }
    
    await this.reviewRepository.remove(review);
    return { message: 'Review deleted successfully' };
  }
}
\`\`\`

### 4. إنشاء Controller

\`\`\`typescript
// server/src/review/review.controller.ts
import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { CurrentUser } from '../decorator/current-user.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(
    @CurrentUser('sub') userId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(userId, createReviewDto);
  }

  @Get('product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProduct(+productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser('sub') userId: number,
  ) {
    return this.reviewService.remove(+id, userId);
  }
}
\`\`\`

### 5. إنشاء Module

\`\`\`typescript
// server/src/review/review.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
\`\`\`

### 6. إضافة Module إلى App Module

\`\`\`typescript
// server/src/app.module.ts
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    // ... other modules
    ReviewModule,
  ],
})
export class AppModule {}
\`\`\`

---

## إضافة API Endpoint

### مثال: Endpoint لإحصائيات المنتج

\`\`\`typescript
// في product.controller.ts
@Get(':id/stats')
async getProductStats(@Param('id') id: string) {
  return this.productService.getStats(+id);
}

// في product.service.ts
async getStats(productId: number) {
  const product = await this.productRepository.findOne({
    where: { id: productId },
    relations: ['reviews', 'orders'],
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  const reviewCount = product.reviews?.length || 0;
  const averageRating = reviewCount > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : 0;
  const totalSold = product.orders?.reduce((sum, o) => sum + o.quantity, 0) || 0;

  return {
    reviewCount,
    averageRating: averageRating.toFixed(1),
    totalSold,
    viewCount: product.viewCount || 0,
  };
}
\`\`\`

---

## إضافة Component في React

### مثال: Review Component

\`\`\`typescript
// client/components/ProductReview.tsx
import { useState } from 'react';
import { Button, Textarea, Card } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ReviewProps {
  productId: number;
  onReviewAdded?: () => void;
}

export default function ProductReview({ productId, onReviewAdded }: ReviewProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      Swal.fire('خطأ', 'يجب تسجيل الدخول أولاً', 'error');
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(
        \`\${process.env.NEXT_PUBLIC_API_URL}/review\`,
        {
          productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: \`Bearer \${session.accessToken}\`,
          },
        }
      );

      Swal.fire('نجح', 'تم إضافة التقييم بنجاح', 'success');
      setComment('');
      setRating(5);
      onReviewAdded?.();
    } catch (error) {
      Swal.fire('خطأ', 'حدث خطأ أثناء إضافة التقييم', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card css={{ p: '$6', mb: '$4' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>التقييم:</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: 'pointer',
                  fontSize: '2rem',
                  color: star <= rating ? '#ffc107' : '#ccc',
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <Textarea
          label="التعليق"
          placeholder="اكتب تقييمك هنا..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          minLength={10}
          rows={4}
        />

        <Button
          type="submit"
          disabled={loading}
          css={{ mt: '$4' }}
        >
          {loading ? 'جاري الإضافة...' : 'إضافة التقييم'}
        </Button>
      </form>
    </Card>
  );
}
\`\`\`

---

## استخدام SWR للـ Data Fetching

### إنشاء Custom Hook

\`\`\`typescript
// client/libs/swr/useProductReviews.ts
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const useProductReviews = (productId: number | null) => {
  const { data, error, mutate } = useSWR(
    productId ? \`\${process.env.NEXT_PUBLIC_API_URL}/review/product/\${productId}\` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    reviews: data,
    isLoading: !error && !data,
    isError: error,
    mutate, // للتحديث اليدوي
  };
};
\`\`\`

### الاستخدام في Component

\`\`\`typescript
// في component
import { useProductReviews } from '../libs/swr/useProductReviews';

export default function ProductPage({ productId }: { productId: number }) {
  const { reviews, isLoading, isError, mutate } = useProductReviews(productId);

  if (isLoading) return <div>جاري التحميل...</div>;
  if (isError) return <div>حدث خطأ</div>;

  return (
    <div>
      {reviews?.map(review => (
        <div key={review.id}>
          <p>{review.comment}</p>
          <p>التقييم: {review.rating}/5</p>
        </div>
      ))}

      <ProductReview 
        productId={productId} 
        onReviewAdded={() => mutate()} // تحديث البيانات
      />
    </div>
  );
}
\`\`\`

---

## إضافة Guard في NestJS

### مثال: Admin Guard

\`\`\`typescript
// server/src/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Admin only.');
    }

    return true;
  }
}
\`\`\`

### الاستخدام

\`\`\`typescript
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/access-token.guard';
import { AdminGuard } from '../guards/admin.guard';

@UseGuards(AccessTokenGuard, AdminGuard)
@Delete(':id')
deleteProduct(@Param('id') id: string) {
  return this.productService.remove(+id);
}
\`\`\`

---

## استخدام Redux

### إنشاء Slice

\`\`\`typescript
// client/libs/redux/slices/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: number[]; // Product IDs
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(id => id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
\`\`\`

### إضافة إلى Store

\`\`\`typescript
// client/libs/redux/store.ts
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
  reducer: {
    // ... other reducers
    wishlist: wishlistReducer,
  },
});
\`\`\`

### الاستخدام في Component

\`\`\`typescript
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../libs/redux/slices/wishlistSlice';
import type { RootState } from '../libs/redux/store';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlist.includes(product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={toggleWishlist}>
        {isInWishlist ? '❤️ في المفضلة' : '🤍 أضف للمفضلة'}
      </button>
    </div>
  );
}
\`\`\`

---

## أمثلة على Validation

### DTO مع Validation مخصص

\`\`\`typescript
// server/src/product/dto/create-product.dto.ts
import { 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  Min, 
  MaxLength,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsUrl({}, { each: true })
  images?: string[];
}
\`\`\`

---

## Best Practices

### 1. Error Handling في Service

\`\`\`typescript
async findOne(id: number) {
  try {
    const item = await this.repository.findOne({ where: { id } });
    
    if (!item) {
      throw new NotFoundException(\`Item with ID \${id} not found\`);
    }
    
    return item;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('An error occurred while fetching the item');
  }
}
\`\`\`

### 2. Environment Variables

\`\`\`typescript
// استخدام ConfigService
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

const apiKey = this.configService.get<string>('API_KEY');
const port = this.configService.get<number>('APP_PORT', 3000); // with default
\`\`\`

### 3. Query Optimization

\`\`\`typescript
// ❌ Not Optimized
const products = await this.productRepository.find();

// ✅ Optimized with pagination and select
const products = await this.productRepository.find({
  skip: (page - 1) * limit,
  take: limit,
  select: ['id', 'name', 'price'], // Only needed fields
  relations: ['category'], // Only needed relations
  order: { createdAt: 'DESC' },
});
\`\`\`

---

لمزيد من الأمثلة، راجع الكود الموجود في المشروع أو ارجع إلى:
- [NestJS Documentation](https://docs.nestjs.com)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [TypeORM Documentation](https://typeorm.io)
