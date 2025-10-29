import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const PopularProducts = () => {
    const images = [
        'product_img/Champ-Pixl.jpg',
        'product_img/BS-i201g_Lite.jpg',
        'product_img/tvs-rp-3220-star.jpg',
        'product_img/BS-i302g.webp',
        'product_img/lp46plus.webp',
        'product_img/BS-i201g.webp',
        'product_img/P1000.jpg',
        'product_img/tvs-print-head.webp',
        'product_img/tp 415c smart.jpg',
        'product_img/BS-i203z_Platina.webp',
    ];

    const videoStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,

    };

    const containerStyle = {
        position: 'relative',
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 10px',
        boxSizing: 'border-box',
    };

    const imageStyle = {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    };

    return (
        <div style={containerStyle}>
            {/* 🔴 Background Video */}
            <video autoPlay muted loop playsInline style={videoStyle}>
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* ✅ Swiper Gallery */}
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Autoplay, Pagination]}
                style={{ width: '100%', maxWidth: '960px', height: '100%' }}
            >
                {images.map((img, i) => (
                    <SwiperSlide
                        key={i}
                        style={{
                            width: '250px',
                            height: '360px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={img} alt={`img-${i}`} style={imageStyle} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularProducts;




