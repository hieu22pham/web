import React, { useState, useMemo, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./slideimage.css";
import { db } from "../../firebase/config";
import 'swiper/css/autoplay'

function SlideImageHome() {
  const messagesRef = db.collection('SlideImage');
  const [productsData, setProductsData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const swiperRef = React.useRef(null);

  useEffect(() => {
    const fetchMessagesData = () => {
      messagesRef
        .get()
        .then((querySnapshot) => {
          const products = querySnapshot.docs.map((doc) => doc.data());
          setProductsData(products);
        })
        .catch((error) => {
          console.error('Error getting messages:', error);
        });
    };

    fetchMessagesData();
  }, []);


  useEffect(() => {
    // Ensure the Swiper component updates to the currentSlide value
    if (swiperRef.current && swiperRef.current.swiper) {
      var a = swiperRef.current.swiper.slideTo(currentSlide);

      const swiperInstance = swiperRef.current.swiper;
      const currentIndex = swiperInstance.activeIndex;
      setCurrentSlide(currentIndex)
    }
  }, [currentSlide]);

  // useEffect(() => {
  //   // Ensure the Swiper component updates to the currentSlide value
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     const swiperInstance = swiperRef.current.swiper;
  //     const currentIndex = swiperInstance.activeIndex;
  //     setCurrentSlide(currentIndex)
  //   }
  // }, [swiperRef.activeIndex]);

  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      const currentIndex = swiperInstance.activeIndex;
      const slidesCount = swiperInstance.slides.length;

      if (currentIndex == 0) {
        // swiperInstance.slideTo(0); // Di chuyển về slide đầu tiên khi đạt slide cuối
        setCurrentSlide(0);
      }
      else {
        setCurrentSlide(currentIndex);
      }
    }
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.on('slideChange', handleSlideChange);
    }
  }, []);

  const slides = productsData.map((item, index) => (
    item.name &&
    <SwiperSlide key={index}  >
      <div className="slide-image">
        <img src={item.photoURL} alt={item.name} />
      </div>
    </SwiperSlide >
  ));

  const swiperSettings = {
    autoplay: {
      delay: 2000,
    },
    pagination: {
      clickable: true,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: (swiper) => {
        setCurrentSlide(swiper.activeIndex);
      }, reachEnd: (swiper) => {
        swiper.slideTo(0); // Di chuyển swiper về slide đầu tiên khi đạt slide cuối
      },
    },
  };

  const swiperRef = React.useRef(null);

  const handleCaptionClick = (index) => {
    // Jump to the corresponding slide when clicking on a slide caption
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="images__home">
        <div className="images__home--item">
          <Swiper {...swiperSettings} initialSlide={currentSlide} ref={swiperRef}
            // modules={Autoplay} 
            autoplay={true}>
            {productsData.map((item, index) => (
              item.name &&
              <SwiperSlide key={index}  >
                <div className="slide-image">
                  <img src={item.photoURL} alt={item.name} />
                </div>
              </SwiperSlide >
            ))}
          </Swiper>
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
          <div className="captions">
            {productsData.map((item, index) => (
              item.name &&
              <div className={`slide-caption ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleCaptionClick(index)}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SlideImageHome;
