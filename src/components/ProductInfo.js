import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "../scss/product-info.scss";

const ProductInfo = (props) => {
  const [expandedRows, setExpandedRows] = useState(null);
  const [selectedVariantId, setSelectVariantId] = useState(
    props.product.variants[0].id
  );
  const [variantImagesUrls, setVariantImagesUrls] = useState([]);
  const [variantSellers, setVariantSellers] = useState([]);

  useEffect(() => {
    const selectedVariant = props.product.variants.find(
      (variant) => variant.id === selectedVariantId
    );
    setVariantImagesUrls(selectedVariant.imagesUrls);
    setVariantSellers(
      selectedVariant.sellers.map((variantSeller) => {
        const productSeller = props.product.sellers.find(
          (seller) => seller.id === variantSeller.id
        );
        return {
          name: productSeller.name,
          logoUrl: productSeller.logoUrl,
          priceHistories: variantSeller.priceHistories,
        };
      })
    );
  }, [selectedVariantId]);

  const variants = props.product.variants.map((variant) => ({
    label: variant.name,
    value: variant.id,
  }));

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
    return data.trackedDate
      ? props.dateTimeFormatter.format(Date.parse(data.trackedDate))
      : "";
  };

  const sellerTemplate = (seller) => {
    return (
      <div className="flex">
        <img
          src={seller.logoUrl}
          title={seller.name}
          alt={seller.name}
          width={32}
          height={32}
        />
        <div className="text-aside-logo">{seller.name}</div>
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
          />
        </div>

        <div className="product-name text-aside-logo">{props.product.name}</div>
      </div>
      <Dropdown
        options={variants}
        value={selectedVariantId}
        onChange={(e) => setSelectVariantId(e.value)}
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
