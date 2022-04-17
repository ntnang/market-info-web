import React, { useState, useEffect } from "react";
import ProductPriceChart from "../components/ProductPriceChart";
import ProductService from "../service/ProductService";

const Dashboard = (props) => {
  const [latestProduct, setLatestProduct] = useState();

  const productService = new ProductService();

  useEffect(() => {
    productService
      .getLastTrackedProduct()
      .then((product) => {
        setLatestProduct(product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.lastChangeDateTime]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>{latestProduct && latestProduct.name}</h5>
          {latestProduct && <ProductPriceChart product={latestProduct} />}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
