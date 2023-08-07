import React, { useState, useMemo, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import "./slideimageHome.css";
import { db } from "../../firebase/config";
import 'swiper/css/autoplay'
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons"

function SlideImageHome() {
  const messagesRef = db.collection('SlideImage');
  const [productsData, setProductsData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [length, setLength] = useState(0);

  // const swiperRef = React.useRef(null);

  useEffect(() => {
    const fetchMessagesData = () => {
      messagesRef
        .get()
        .then((querySnapshot) => {
          const products = querySnapshot.docs.map((doc) => doc.data());
          setProductsData(products);
          setLength(querySnapshot.size);
        })
        .catch((error) => {
          console.error('Error getting messages:', error);
        });
    };

    fetchMessagesData();
  }, []);


  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      var a = swiperRef.current.swiper.slideTo(currentSlide);

      const swiperInstance = swiperRef.current.swiper;
      const currentIndex = swiperInstance.activeIndex;
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
    setCurrentSlide(index);
  };

  const handleNextButtonClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      const slidesCount = swiperInstance.slides.length;
      // if (swiperInstance >= slidesCount) {
      //   setCurrentSlide(0)
      // }
      // else { swiperInstance.slideNext(); } // Move to the next slide
      // setCurrentSlide(swiperInstance);

      swiperInstance.slideNext();
    }
  };

  const handlePrevButtonClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slidePrev(); // Move to the previous slide
    }
  };
  return (
    <>
      <div className="images__home">
        <div className="images__home--item">
          <Swiper {...swiperSettings} initialSlide={currentSlide} ref={swiperRef}
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
          <div className="swiper-button-next" onClick={handleNextButtonClick} >
            <CaretRightOutlined style={{ fontSize: "24px", marginLeft: "5px" }} />
          </div>
          <div className="swiper-button-prev" onClick={handlePrevButtonClick} >
            <CaretLeftOutlined style={{ fontSize: "24px", marginRight: "5px" }} />
          </div>
          <div className="captions">
            {productsData.map((item, index) => (
              item.name &&
              <div className={`border-caption  ${currentSlide === index ? 'active' : ''}
              ${length === (index + 1) ? 'last' : ''}`}
                onClick={() => handleCaptionClick(index)}
              >
                <div className={`slide-caption ${currentSlide === index ? 'active' : ''}`}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >
    </>
  );
}

export default SlideImageHome;
