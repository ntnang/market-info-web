import React, { useState } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Dialog } from "primereact/dialog";
import ProductService from "../service/ProductService";
import UrlExtractor from "../util/UrlExtractor";

const ProductInfoDialog = (props) => {
  const [product, setProduct] = useState({
    name: "",
    imagesUrls: [],
    origin: "",
    sellers: [],
    lastTrackedDate: null,
  });

  const productService = new ProductService();
  const urlExtractor = new UrlExtractor();

  const getImageTemplateForCarousel = (imgUrl) => {
    return <img src={imgUrl} />;
  };

  const getProductInformation = () => {
    const hostname = urlExtractor.extractHostname(props.link);
    switch (hostname) {
      case urlExtractor.TIKI_VN:
        const productId = urlExtractor.extractTikiProductId(props.link);
        productService
          .getProductInformation(hostname, productId)
          .then((product) => {
            setProduct(product);
          });
        break;
      case urlExtractor.SHOPEE_VN:
        const ids = urlExtractor.extractShopeeProductIds(props.link);
        productService
          .getProductInformation(hostname, ids.itemId, ids.shopId)
          .then((product) => {
            setProduct(product);
          });
        break;
      default:
        alert("Not supported!");
        break;
    }
  };

  const trackProductInformation = () => {
    const productId = urlExtractor.extractTikiProductId(props.link);
    productService.saveProductHistories(productId, product);
    productService.props.onHide();
  };

  const getFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={props.onHide}
          className="p-button-text"
        />
        <Button
          label="Track"
          icon="pi pi-check"
          className="btn-primary"
          onClick={trackProductInformation}
        />
      </div>
    );
  };

  return (
    <Dialog
      header="Product information"
      footer={getFooter}
      visible={props.isDialogVisible}
      style={{ width: "50vw" }}
      onHide={props.onHide}
      onShow={getProductInformation}
      modal
    >
      <div>{product.name}</div>
      <Carousel
        value={product.imagesUrls}
        itemTemplate={getImageTemplateForCarousel}
      />
    </Dialog>
  );
};
export default ProductInfoDialog;
