import {
  Button,
  Card,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import { getSession, signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useBotChat } from '../../components/common/BotChat';
import translations from '../../libs/translations';

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  useBotChat(false);
  const [error, setError] = useState<string | null>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        Swal.fire({
          icon: 'error',
          title: 'خطأ في تسجيل الدخول',
          text: 'اسم المستخدم أو كلمة المرور غير صحيحة',
          confirmButtonText: 'حسناً',
        });
      } else {
        const session = await getSession();

        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الدخول بنجاح',
          text: `مرحباً ${session?.username || ''}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        if (
          session &&
          session.roles.some(
            (e: string) => e === 'admin' || e === 'manager' || e === 'employee'
          )
        ) {
          const name = (router.query.name as string) || '/admin/dashboard';
          router.replace(name);
        } else if (session && session.roles.includes('user')) {
          const name = (router.query.name as string) || '/';
          router.replace(name);
        }
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول');
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى',
        confirmButtonText: 'حسناً',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [session, status, router]);

  return (
    <>
      <section className="container">
        <div className="bg-preview">
          {!loaded && (
            <Image
              src="/carousel-1.jpg"
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
          <source src="/katarina.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        <form
          autoComplete="off"
          autoSave="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card css={{ width: '350px', padding: '$4' }}>
            <Card.Header css={{ justifyContent: 'center', paddingTop: '$10' }}>
              <Text
                h3
                css={{
                  textAlign: 'center',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #7828C8, #1E88E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {translations.auth.login}
              </Text>
            </Card.Header>

            {error && (
              <Card.Header css={{ justifyContent: 'center', paddingTop: 0 }}>
                <Text
                  color="error"
                  css={{ textAlign: 'center', fontSize: '14px' }}
                >
                  {error}
                </Text>
              </Card.Header>
            )}

            <Card.Divider />

            <Card.Body css={{ py: '$10', gap: '$8' }}>
              <Input
                clearable
                bordered
                fullWidth
                color="secondary"
                size="lg"
                labelPlaceholder={translations.auth.usernameOrEmail}
                {...register('username', {
                  required: true,
                  minLength: 3,
                })}
                status={errors.username ? 'error' : 'default'}
                helperText={errors.username && 'يرجى إدخال اسم المستخدم'}
                autoComplete="username"
              />

              <Input.Password
                clearable
                bordered
                fullWidth
                color="secondary"
                size="lg"
                labelPlaceholder={translations.auth.password}
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
                status={errors.password ? 'error' : 'default'}
                helperText={
                  errors.password && 'يرجى إدخال كلمة المرور (6 أحرف على الأقل)'
                }
                autoComplete="current-password"
              />

              <Link href="/auth/forgot-password">
                <a
                  style={{
                    textAlign: 'left',
                    color: '#1E88E5',
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                  {translations.auth.forgotPassword}
                </a>
              </Link>
            </Card.Body>

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
                  translations.auth.login
                )}
              </Button>

              <Text css={{ textAlign: 'center', fontSize: '14px' }}>
                {translations.auth.dontHaveAccount}{' '}
                <Link href="/auth/register">
                  <a
                    style={{
                      color: '#7828C8',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                    }}
                  >
                    {translations.auth.registerHere}
                  </a>
                </Link>
              </Text>
            </Card.Footer>
          </Card>
        </form>
      </section>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
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
      `}</style>
    </>
  );
}
