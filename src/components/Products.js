import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import ProductService from "../service/ProductService";

const Products = () => {
  const [products, setProducts] = useState();
  const [layout, setLayout] = useState("grid");

  const productService = new ProductService();

  useEffect(() => {
    productService.getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const renderHeader = () => {
    let onOptionChange = (e) => {
      setLayout(e.value);
    };

    return (
      <div style={{ textAlign: "left" }}>
        <DataViewLayoutOptions layout={layout} onChange={onOptionChange} />
      </div>
    );
  };

  const header = renderHeader();

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return renderGridItem(product);
  };

  const renderListItem = (product) => {
    return (
      <div className="p-col-12">
        <div className="product-list-item">
          <img
            src={`${product.imagesUrls[0]}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={product.name}
          />
          <div className="product-list-detail">
            <div className="product-name">{product.name}</div>
          </div>
          <div className="product-list-action">
            {/* <span className="product-price">${product.price}</span> */}
          </div>
        </div>
      </div>
    );
  };

  const renderGridItem = (product) => {
    return (
      <div className="p-col-12 p-md-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-top"></div>
          <div className="product-grid-item-content">
            <img
              src={product.imagesUrls[0]}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={product.name}
            />
            <div className="product-name">{product.name}</div>
          </div>
          <div className="product-grid-item-bottom">
            {/* <span className="product-price">${product.price}</span> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Tracked Products</h5>
          <DataView
            value={products}
            layout={layout}
            header={header}
            itemTemplate={itemTemplate}
          />
        </div>
      </div>
    </div>
  );
};
export default Products;
