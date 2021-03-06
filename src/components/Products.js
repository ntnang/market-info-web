import React, { useState, useEffect } from "react";
import { DataScroller } from "primereact/datascroller";
import { Link } from "react-router-dom";
import ProductService from "../service/ProductService";
import "../scss/products.scss";

const Products = (props) => {
  const [products, setProducts] = useState();

  const productService = new ProductService();

  useEffect(() => {
    productService.getAllProducts().then((products) => {
      setProducts(products);
    });
  }, [props.lastChangeDateTime]);

  const itemTemplate = (product) => {
    return (
      <Link
        to={{
          pathname: `/product/${product.origin}/${product.id}`,
        }}
      >
        <div className="product-item card">
          <div className="product-item-top">
            <img
              src={`https://${product.origin}/favicon.ico`}
              title={product.origin}
              alt={product.origin}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
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
            <div className="product-name" title={product.name}>
              {product.name}
            </div>
          </div>
          <div className="product-item-bottom">
            <div className="product-seller flex">
              <span className="product-price">
                {props.currencyFormatter.format(product.minPrice)}{" "}
                {product.maxPrice > product.minPrice
                  ? "- " + props.currencyFormatter.format(product.maxPrice)
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </Link>
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
