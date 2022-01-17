import React, { useState, useEffect } from "react";
import ProductPriceChart from "../components/ProductPriceChart";
import ProductService from "../service/ProductService";

const Dashboard = (props) => {
  const [latestProduct, setLatestProduct] = useState({
    name: "",
    imagesUrls: [],
    origin: "",
    sellers: [],
    lastTrackedDate: null,
  });

  const productService = new ProductService();

  useEffect(() => {
    productService.findLastTrackedProduct().then((product) => {
      setLatestProduct(product);
    });
  }, [props.lastChangeDateTime]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>{latestProduct.name}</h5>
          <ProductPriceChart product={latestProduct} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
