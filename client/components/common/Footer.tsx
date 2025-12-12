import { Grid, Text } from '@nextui-org/react';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';
import { MdMeetingRoom } from 'react-icons/md';
import useMediaQuery from '../../libs/hooks/useMediaQuery';
import translations from '../../libs/translations';

const Footer = () => {
  const isLg = useMediaQuery('(min-width: 1280px)');

  return (
    <>
      <footer className='container'>
        <Grid.Container
          css={{
            borderBottom: '1px solid #e7e7e7',
            borderTop: '1px solid #e7e7e7',
          }}
          justify='center'
        >
          <Grid
            xs={12}
            md={3}
            justify='center'
            alignItems={isLg ? 'baseline' : 'center'}
            direction='column'
            css={{ p: 20 }}
          >
            <h3 className='title'>من نحن</h3>
            <img
              width={170}
              height={100}
              src='/logo.jpg'
              alt='Logo image'
              style={{ objectFit: 'contain' }}
            />
            <Text
              b
              css={{
                textGradient: '45deg, $arabicBlue -20%, $arabicGold 100%',
                fontSize: '0.95rem',
                textAlign: 'center',
                mt: 10,
              }}
            >
              متجر إلكتروني عصري
            </Text>
            <Text
              size={13}
              css={{
                color: '$accents7',
                textAlign: 'center',
                mt: 5,
                lineHeight: '1.6',
              }}
            >
              نوفر لك أفضل المنتجات بأسعار تنافسية
            </Text>
          </Grid>
          <Grid xs={12} sm={4} md={3} direction='column' css={{ p: 20 }}>
            <h3 className='title'>روابط سريعة</h3>
            <ul className='list'>
              <li className='listItem'>{translations.common.home}</li>
              <li className='listItem'>من نحن</li>
              <li className='listItem'>المشاريع</li>
              <li className='listItem'>{translations.common.contact}</li>
              <li className='listItem'>{translations.common.privacyPolicy}</li>
              <li className='listItem'>{translations.common.returnPolicy}</li>
            </ul>
          </Grid>
          <Grid xs={12} sm={4} md={3} direction='column' css={{ p: 20 }}>
            <h3 className='title'>تواصل معنا</h3>
            <div className='contactItem'>
              <MdMeetingRoom color='1E88E5' style={{ marginLeft: '10px' }} />{' '}
              القاهرة، مصر
            </div>
            <div className='contactItem'>
              <AiFillPhone color='1E88E5' style={{ marginLeft: '10px' }} />
              +20 123 456 789
            </div>
            <div className='contactItem'>
              <AiFillMail color='1E88E5' style={{ marginLeft: '10px' }} />{' '}
              ahmed.khaled.dev@gmail.com
            </div>
          </Grid>
          <Grid xs={12} sm={4} md={3} direction='column' css={{ p: 20 }}>
            <h3 className='title'>الخدمات</h3>
            <ul className='list'>
              <li className='listItem'>تطوير Full-Stack</li>
              <li className='listItem'>React & Next.js</li>
              <li className='listItem'>Node.js & NestJS</li>
              <li className='listItem'>تصميم قواعد البيانات</li>
              <li className='listItem'>تطوير API</li>
              <li className='listItem'>تصميم UI/UX</li>
            </ul>
          </Grid>
        </Grid.Container>
        <div className='copyright'>
          <Text size={14} css={{ color: '$accents7' }}>
            جميع الحقوق محفوظة © {new Date().getUTCFullYear()}
          </Text>
          <Text 
            size={14} 
            css={{ 
              color: '$arabicBlue',
              fontWeight: '600',
              mx: 8,
            }}
          >
            |
          </Text>
          <Text 
            size={14}
            css={{
              background: 'linear-gradient(45deg, #1E88E5, #D4AF37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
            }}
          >
            Made by Ahmed Khaled
          </Text>
        </div>
      </footer>
      <style jsx>{`
        .copyright {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 25px 0;
          background: linear-gradient(135deg, rgba(30, 136, 229, 0.03) 0%, rgba(212, 175, 55, 0.03) 100%);
        }
        .container {
          background-color: #fff;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        }

        .logo {
          color: #1E88E5;
        }

        .socialContainer {
          display: flex;
          gap: 5px;
        }

        .title {
          color: #1E88E5;
          margin-bottom: 20px;
          font-size: 1.2rem;
          font-weight: 700;
          position: relative;
          padding-bottom: 10px;
        }

        .title::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #1E88E5, #D4AF37);
          border-radius: 2px;
        }

        .list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
        }

        .listItem {
          width: 100%;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #5a5a5a;
          font-size: 0.9rem;
          padding-right: 10px;
          position: relative;
        }

        .listItem::before {
          content: '•';
          position: absolute;
          right: 0;
          color: #D4AF37;
          font-weight: bold;
        }

        .listItem:hover {
          color: #1E88E5;
          transform: translateX(-5px);
        }

        .contactItem {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: #5a5a5a;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
};

export default Footer;
