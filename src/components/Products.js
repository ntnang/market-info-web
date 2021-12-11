import React, { useState, useEffect } from "react";
import { DataScroller } from "primereact/datascroller";
import ProductService from "../service/ProductService";
import ProductOrigins from "../constants/ProductOrigins";
import "../scss/products.scss";

const Products = () => {
  const [products, setProducts] = useState();

  const productService = new ProductService();
  const productOrigins = new ProductOrigins();

  useEffect(() => {
    productService.getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const itemTemplate = (product) => {
    return (
      <div className="product-item card">
        <div className="product-item-top">
          <img
            src={`https://${product.origin}/favicon.ico`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={product.origin}
          />
        </div>
        <div className="product-item-content">
          <div className="flex justify-content-center align-items-center">
            <img
              src={product.thumbnailUrl}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={product.name}
            />
          </div>
          <div className="product-name">{product.name}</div>
        </div>
        <div className="product-item-bottom">
          <span className="product-price">
            {
              Array.from(product.sellers, ([_, value]) => value)[0]
                .priceHistories[0].price
            }
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="col-12">
      <div className="card">
        <h5>Tracked Products</h5>
        <DataScroller value={products} itemTemplate={itemTemplate} rows={10} />
      </div>
    </div>
  );
};
export default Products;
