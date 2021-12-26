import React, { useState, useEffect } from "react";
import ProductService from "../service/ProductService";

const ProductDetails = (props) => {
  const [product, setProduct] = useState();

  const productService = new ProductService();

  useEffect(() => {
    productService
      .getProductHistory(props.match.params.origin, props.match.params.itemId)
      .then((product) => {
        setProduct(product);
      });
  }, []);

  return <div></div>;
};

export default ProductDetails;
