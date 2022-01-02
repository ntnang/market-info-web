import React, { useState } from "react";
import { Carousel } from "primereact/carousel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../scss/product-info.scss";

const ProductInfo = (props) => {
  const [expandedRows, setExpandedRows] = useState(null);

  const getImageTemplateForCarousel = (imgUrl) => {
    return (
      <div className="flex justify-content-center align-items-center">
        <img src={imgUrl} />
      </div>
    );
  };

  const priceTemplate = (data) => {
    return props.currencyFormatter.format(data.price);
  };

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable value={data.priceHistories}>
        <Column field="price" header="Price" body={priceTemplate} />
        <Column field="trackedDate" header="Date" />
      </DataTable>
    );
  };

  return (
    <React.Fragment>
      <div className="flex">
        <img
          src={`https://${props.product.origin}/favicon.ico`}
          title={props.product.origin}
          alt={props.product.origin}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={props.product.origin}
        />
        <div className="product-name">{props.product.name}</div>
      </div>
      <Carousel
        value={props.product.imagesUrls}
        itemTemplate={getImageTemplateForCarousel}
      />
      <DataTable
        value={Array.from(props.product.sellers, ([_, value]) => value)}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column expander style={{ width: "3em" }} />
        <Column field="name" header="Seller" />
      </DataTable>
    </React.Fragment>
  );
};
export default ProductInfo;
