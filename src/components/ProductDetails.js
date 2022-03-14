import React, { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductPriceChart from "../components/ProductPriceChart";
import ProductService from "../service/ProductService";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({
    name: "",
    thumbnailUrl: "",
    origin: "",
    minPrice: 0,
    maxPrice: 0,
    options: [],
    variants: [],
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
    <React.Fragment>
      <div className="card">
        <ProductInfo
          product={product}
          currencyFormatter={props.currencyFormatter}
          dateTimeFormatter={props.dateTimeFormatter}
        />
      </div>
      <div className="card">
        <ProductPriceChart product={product} />
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
