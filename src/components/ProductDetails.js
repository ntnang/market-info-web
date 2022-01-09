import React, { useState, useEffect } from "react";
import ProductService from "../service/ProductService";
import ProductInfo from "./ProductInfo";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({
    name: "",
    imagesUrls: [],
    origin: "",
    sellers: [],
    lastTrackedDate: null,
  });

  const productService = new ProductService();

  useEffect(() => {
    productService
      .getProduct(props.matchParams.origin, props.matchParams.itemId)
      .then((product) => {
        setProduct(product);
      });
  }, []);

  return (
    <div className="card">
      <ProductInfo
        product={product}
        currencyFormatter={props.currencyFormatter}
        dateTimeFormatter={props.dateTimeFormatter}
      />
    </div>
  );
};

export default ProductDetails;
