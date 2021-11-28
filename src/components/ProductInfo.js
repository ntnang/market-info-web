import React, { useState } from "react";
import { Carousel } from "primereact/carousel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../scss/product-info.scss";

const ProductInfo = (props) => {
  const [expandedRows, setExpandedRows] = useState(null);

  const getImageTemplateForCarousel = (imgUrl) => {
    return <img src={imgUrl} />;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable value={data.priceHistories}>
        <Column field="price" header="Price" />
        <Column field="trackedDate" header="Date" />
      </DataTable>
    );
  };

  return (
    <React.Fragment>
      <div className="product-name">
        [{props.product.origin}] {props.product.name}
      </div>
      <Carousel
        value={props.product.imagesUrls}
        itemTemplate={getImageTemplateForCarousel}
      />
      <DataTable
        value={Array.from(props.product.sellers, ([key, value]) => value)}
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
