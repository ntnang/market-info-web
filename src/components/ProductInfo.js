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

  const dateTimeTemplate = (data) => {
    return props.dateTimeFormatter.format(Date.parse(data.trackedDate));
  };

  const sellerTemplate = (data) => {
    return (
      <div className="flex">
        <img
          src={data.logoUrl}
          title={data.name}
          alt={data.name}
          width={32}
          height={32}
        />
        <div className="text-aside-logo">{data.name}</div>
      </div>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable value={data.priceHistories}>
        <Column field="price" header="Price" body={priceTemplate} />
        <Column
          field="trackedDate"
          header="Date Time"
          body={dateTimeTemplate}
        />
      </DataTable>
    );
  };

  return (
    <React.Fragment>
      <div className="flex">
        <div>
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
        </div>

        <div className="product-name text-aside-logo">{props.product.name}</div>
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
        <Column field="name" header="Seller" body={sellerTemplate} />
      </DataTable>
    </React.Fragment>
  );
};
export default ProductInfo;
