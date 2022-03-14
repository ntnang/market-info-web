import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "../scss/product-info.scss";

const ProductInfo = (props) => {
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedVariant, setSelectVariant] = useState(
    props.product.variants.keys().next().value
  );
  const [variantImagesUrls, setVariantImagesUrls] = useState([]);
  const [variantSellers, setVariantSellers] = useState([]);

  useEffect(() => {
    setVariantImagesUrls(
      props.product.variants.get(selectedVariant).imagesUrls
    );
    setVariantSellers(
      Array.from(
        props.product.variants.get(selectedVariant).sellers,
        ([key, value]) => ({
          key,
          value,
        })
      )
    );
  }, [props.product]);

  const variants = Array.from(props.product.variants.entries()).map(
    ([key, value]) => ({
      label: value.name,
      value: key,
    })
  );

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
    const seller = props.product.sellers.get(data.key);
    return (
      <div className="flex">
        <img
          src={seller.logoUrl}
          title={seller.name}
          alt={seller.name}
          width={32}
          height={32}
        />
        <div className="text-aside-logo">{data.name}</div>
      </div>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable value={data.value.priceHistories}>
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
          />
        </div>

        <div className="product-name text-aside-logo">{props.product.name}</div>
      </div>
      <Dropdown
        options={variants}
        value={selectedVariant}
        onChange={(e) => setSelectVariant(e.value)}
      />
      <Carousel
        value={variantImagesUrls}
        itemTemplate={getImageTemplateForCarousel}
      />
      <DataTable
        value={variantSellers}
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
