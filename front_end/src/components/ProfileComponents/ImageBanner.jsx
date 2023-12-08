import React from "react";

const ImageBanner = ({ imageUrl, children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "200px",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "Black", // Add text color
        fontSize: "24px", // Add font size
        padding: "20px", // Add padding for better visibility on smaller screens
        boxSizing: "border-box", // Ensure padding is included in the height
      }}
    >
     {children}
    </div>
  );
};

export default ImageBanner;
