import {
  Button,
  Card,
  Input,
  Loading,
  Progress,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useBotChat } from '../../components/common/BotChat';
import translations from '../../libs/translations';

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  useBotChat(false);
  const router = useRouter();
  const [error, setError] = useState<string[] | string>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch('password', '');

  // حساب قوة كلمة المرور
  const calculatePasswordStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 6) strength += 20;
    if (pass.length >= 8) strength += 20;
    if (/[a-z]/.test(pass)) strength += 20;
    if (/[A-Z]/.test(pass)) strength += 20;
    if (/[0-9]/.test(pass)) strength += 20;
    return strength;
  };

  // تحديث قوة كلمة المرور عند التغيير
  React.useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 40) return 'error';
    if (passwordStrength <= 60) return 'warning';
    return 'success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 40) return 'ضعيفة';
    if (passwordStrength <= 60) return 'متوسطة';
    return 'قوية';
  };

  const onSubmit = async (data: RegisterForm) => {
    setError([]);

    // التحقق من تطابق كلمتي المرور
    if (data.password !== data.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    // التحقق من قوة كلمة المرور
    if (passwordStrength < 60) {
      setError('كلمة المرور ضعيفة. يرجى استخدام كلمة مرور أقوى');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        username: data.username,
        password: data.password,
      });

      Swal.fire({
        title: 'تم إنشاء الحساب بنجاح!',
        text: 'يمكنك الآن تسجيل الدخول',
        icon: 'success',
        confirmButtonText: 'تسجيل الدخول',
      }).then(() => {
        router.push('/auth/login');
      });
    } catch (err: any) {
      const errorMessages = err.response?.data?.message;

      if (Array.isArray(errorMessages)) {
        setError(errorMessages.map((msg: string) => translateError(msg)));
      } else {
        setError(translateError(errorMessages || 'حدث خطأ أثناء إنشاء الحساب'));
      }

      Swal.fire({
        title: 'خطأ',
        text: 'حدث خطأ أثناء إنشاء الحساب',
        icon: 'error',
        confirmButtonText: 'حسناً',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ترجمة رسائل الخطأ من الإنجليزية للعربية
  const translateError = (message: string): string => {
    const translations: Record<string, string> = {
      'username already exist': 'اسم المستخدم موجود بالفعل',
      'Username must contains at least 6 letter, no space, no special letters':
        'اسم المستخدم يجب أن يحتوي على 6 أحرف على الأقل، بدون مسافات أو رموز خاصة',
      'Password must contains at least 1 number and uppercase letter':
        'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل وحرف كبير',
      'username must be longer than or equal to 6 characters':
        'اسم المستخدم يجب أن يكون 6 أحرف أو أكثر',
      'username must be shorter than or equal to 32 characters':
        'اسم المستخدم يجب ألا يزيد عن 32 حرف',
      'password must be longer than or equal to 6 characters':
        'كلمة المرور يجب أن تكون 6 أحرف أو أكثر',
      'password must be shorter than or equal to 32 characters':
        'كلمة المرور يجب ألا تزيد عن 32 حرف',
    };

    return translations[message] || message;
  };

  return (
    <>
      <section className="container">
        <div className="bg-preview">
          {!loaded && (
            <Image
              src="/carousel-3.jpg"
              layout="fill"
              priority
              alt="video preview image"
              objectFit="cover"
            />
          )}
        </div>
        <video
          className="video"
          autoPlay
          muted
          loop
          onLoadedData={() => setLoaded(true)}
        >
          <source src="/ahri.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        <form
          autoComplete="off"
          autoSave="off"
          onSubmit={handleSubmit(onSubmit)}
          className="card-form"
        >
          <Card css={{ padding: '$4' }}>
            <Card.Header css={{ flexDirection: 'column', paddingTop: '$10' }}>
              <Text
                h3
                css={{
                  textAlign: 'center',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #7828C8, #1E88E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: 0,
                }}
              >
                {translations.auth.register}
              </Text>

              {error && (
                <div style={{ marginTop: '16px', width: '100%' }}>
                  {Array.isArray(error) ? (
                    error.map((msg, index) => (
                      <Text
                        key={index}
                        color="error"
                        size={14}
                        css={{ textAlign: 'center', marginBottom: '4px' }}
                      >
                        {msg}
                      </Text>
                    ))
                  ) : (
                    <Text color="error" size={14} css={{ textAlign: 'center' }}>
                      {error}
                    </Text>
                  )}
                </div>
              )}
            </Card.Header>

            <Card.Divider />

            <Card.Body css={{ py: '$10', gap: '$8' }}>
              <Input
                clearable
                bordered
                fullWidth
                color="secondary"
                size="lg"
                labelPlaceholder={translations.auth.username}
                {...register('username', {
                  required: 'اسم المستخدم مطلوب',
                  minLength: {
                    value: 6,
                    message: 'اسم المستخدم يجب أن يكون 6 أحرف على الأقل',
                  },
                  maxLength: {
                    value: 32,
                    message: 'اسم المستخدم يجب ألا يزيد عن 32 حرف',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط',
                  },
                })}
                status={errors.username ? 'error' : 'default'}
                helperText={errors.username?.message}
                autoComplete="username"
              />

              <div>
                <Input.Password
                  clearable
                  bordered
                  fullWidth
                  color="secondary"
                  size="lg"
                  labelPlaceholder={translations.auth.password}
                  {...register('password', {
                    required: 'كلمة المرور مطلوبة',
                    minLength: {
                      value: 6,
                      message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
                    },
                    maxLength: {
                      value: 32,
                      message: 'كلمة المرور يجب ألا تزيد عن 32 حرف',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'يجب أن تحتوي على حرف كبير وصغير ورقم',
                    },
                  })}
                  status={errors.password ? 'error' : 'default'}
                  helperText={errors.password?.message}
                  autoComplete="new-password"
                />

                {password && (
                  <div style={{ marginTop: '8px' }}>
                    <Progress
                      value={passwordStrength}
                      color={getPasswordStrengthColor()}
                      size="xs"
                    />
                    <Text size={12} css={{ marginTop: '4px' }}>
                      قوة كلمة المرور:{' '}
                      <Text b size={12} color={getPasswordStrengthColor()}>
                        {getPasswordStrengthText()}
                      </Text>
                    </Text>
                  </div>
                )}
              </div>

              <Input.Password
                clearable
                bordered
                fullWidth
                color="secondary"
                size="lg"
                labelPlaceholder={translations.auth.confirmPassword}
                {...register('confirmPassword', {
                  required: 'تأكيد كلمة المرور مطلوب',
                  validate: (value) =>
                    value === password || 'كلمتا المرور غير متطابقتين',
                })}
                status={errors.confirmPassword ? 'error' : 'default'}
                helperText={errors.confirmPassword?.message}
                autoComplete="new-password"
              />

              <Text size={12} color="warning" css={{ textAlign: 'center' }}>
                {translations.auth.passwordRequirements}
              </Text>
            </Card.Body>

            <Card.Divider />

            <Card.Footer css={{ flexDirection: 'column', gap: '$4' }}>
              <Button
                type="submit"
                size="lg"
                css={{ width: '100%' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  translations.auth.register
                )}
              </Button>

              <Text css={{ textAlign: 'center', fontSize: '14px' }}>
                {translations.auth.alreadyHaveAccount}{' '}
                <Link href="/auth/login">
                  <a
                    style={{
                      color: '#7828C8',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                    }}
                  >
                    {translations.auth.loginHere}
                  </a>
                </Link>
              </Text>
            </Card.Footer>
          </Card>
        </form>
      </section>

      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .bg-preview {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-form {
          position: absolute;
          right: 23%;
          bottom: 5%;
          width: 300px;
        }
      `}</style>
    </>
  );
}
