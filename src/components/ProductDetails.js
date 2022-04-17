import React, { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductPriceChart from "../components/ProductPriceChart";
import ProductService from "../service/ProductService";

const ProductDetails = (props) => {
  const [product, setProduct] = useState();

  const productService = new ProductService();

  useEffect(() => {
    productService
      .getProduct(props.matchParams.origin, props.matchParams.itemId)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <React.Fragment>
      <div className="card">
        {product && (
          <ProductInfo
            product={product}
            currencyFormatter={props.currencyFormatter}
            dateTimeFormatter={props.dateTimeFormatter}
          />
        )}
      </div>
      <div className="card">
        {product && <ProductPriceChart product={product} />}
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
