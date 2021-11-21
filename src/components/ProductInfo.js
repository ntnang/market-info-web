import React from "react";
import { Carousel } from "primereact/carousel";
import "../scss/product-info.scss";

const ProductInfo = (props) => {
  const getImageTemplateForCarousel = (imgUrl) => {
    return <img src={imgUrl} />;
  };

  return (
    <React.Fragment>
      <div className="product-name">{props.product.name}</div>
      <Carousel
        value={props.product.imagesUrls}
        itemTemplate={getImageTemplateForCarousel}
      />
    </React.Fragment>
  );
};
export default ProductInfo;
