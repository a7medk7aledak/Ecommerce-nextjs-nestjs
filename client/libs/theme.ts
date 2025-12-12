import { createTheme } from '@nextui-org/react';

// نظام ألوان عربي حديث ومريح للعين
export const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      // الألوان الأساسية - درجات الأزرق والذهبي
      primary: '#1E88E5', // أزرق أساسي
      primaryLight: '#64B5F6',
      primaryDark: '#1565C0',
      
      secondary: '#D4AF37', // ذهبي
      secondaryLight: '#F4E4A6',
      secondaryDark: '#B8960F',
      
      // ألوان الخلفيات
      background: '#FAFAFA',
      backgroundContrast: '#FFFFFF',
      
      // ألوان النصوص
      text: '#2C3E50',
      
      // ألوان مخصصة
      ghostWhite: '#fdfdff',
      arabicGold: '#D4AF37',
      arabicBlue: '#1E88E5',
      arabicGreen: '#2ECC71',
      arabicRed: '#E74C3C',
      
      // ألوان الحالات
      success: '#2ECC71',
      warning: '#F39C12',
      error: '#E74C3C',
      info: '#3498DB',
    },
    fonts: {
      sans: "'Cairo', 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "Menlo, Monaco, 'Courier New', monospace",
    },
    fontSizes: {
      xs: '0.875rem',
      sm: '1rem',
      base: '1.125rem',
      md: '1.25rem',
      lg: '1.5rem',
      xl: '1.875rem',
      '2xl': '2.25rem',
    },
    radii: {
      xs: '8px',
      sm: '10px',
      md: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
    },
    space: {},
    shadows: {
      xs: '0 2px 8px 1px rgba(30, 136, 229, 0.07)',
      sm: '0 5px 20px 2px rgba(30, 136, 229, 0.1)',
      md: '0 8px 30px rgba(30, 136, 229, 0.12)',
      lg: '0 15px 40px rgba(30, 136, 229, 0.15)',
      xl: '0 20px 60px rgba(30, 136, 229, 0.2)',
    },
  },
});
