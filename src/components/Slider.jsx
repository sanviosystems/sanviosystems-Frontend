import React, { useEffect, useState } from "react";

// 🔹 Desktop images
const desktopImages = [
 
  "/Barcode-Scanners.webp",
  "/Touch-Pos-System.webp",
  "/TVS-HANDHELD-TOUCH-POS-TERMINAL-SIZE-COMPOSS.webp",
  "/Thermal-receipt-printer.webp",
  "/Label-Printer.webp",
  "/tvs-mouse.webp",
  "/tvs keyboards.webp",
  "/TVS-CASH-DRAWERS-SIZE-COMPOSS.webp",

];

// 🔹 Mobile images
const mobileImages = [
  
  "/Barcode-Scanners.png",
  "/Touch-Pos-System.png",
  "/TVS-HANDHELD-TOUCH-POS-TERMINAL-SIZE-COMPOSS.png",
  "/Thermal-receipt-printer.png",
  "/Label-Printer.png",
  "/tvs-mouse.png",
  "/tvs keyboards.png",
  "/TVS-CASH-DRAWERS-SIZE-COMPOSS.png"

];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Screen size detect
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 568); // mobile <768px
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const sliderStyle = {
    width: "100%",
    position: "relative",
    marginTop: "2cm",
    height: "50vh",
    minHeight: "250px",
    maxHeight: "600px",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    transition: "opacity 0.5s ease-in-out",
  };

  const dotsContainerStyle = {
    position: "absolute",
    bottom: "15px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
  };

  const dotStyle = (isActive) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: isActive ? "#007bff" : "#ccc",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  });

  return (
    <div style={sliderStyle}>
      <img src={images[currentIndex]} alt="Slide" style={imageStyle} />

      <div style={dotsContainerStyle}>
        {images.map((_, index) => (
          <div
            key={index}
            style={dotStyle(currentIndex === index)}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
