import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";

const ProductInfo = (props) => {
  const getImageTemplateForCarousel = (imgUrl) => {
    return <img src={imgUrl} width="300" />;
  };

  return (
    <React.Fragment>
      <div>{props.product.name}</div>
      <Carousel
        value={props.product.imagesUrls}
        itemTemplate={getImageTemplateForCarousel}
      />
    </React.Fragment>
  );
};
export default ProductInfo;
