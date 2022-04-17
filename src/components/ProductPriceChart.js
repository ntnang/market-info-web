import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { SelectButton } from "primereact/selectbutton";
import ChartDatasetBuilder from "../util/ChartDatasetBuilder";
import TimeSpan from "../constants/TimeSpan";
import LodashLang from "lodash/lang";

const ProductPriceChart = (props) => {
  const [productPriceHistoryChartModel, setProductPriceHistoryChartModel] =
    useState();

  const [selectedVariantId, setSelectedVariantId] = useState(
    props.product.variants[0].id
  );

  const [selectedOptions, setSelectedOptions] = useState();

  const chartDatasetBuilder = new ChartDatasetBuilder();
  const timeSpan = new TimeSpan();

  const [selectedTimespanId, setSelectedTimespanId] = useState(
    timeSpan.LAST_7_DAYS.id
  );

  const timeSpans = timeSpan.VALUES.map((timeSpanValue) => {
    return { label: timeSpanValue.label, value: timeSpanValue.id };
  });
  const timeSpanMap = new Map(
    timeSpan.VALUES.map((timeSpanValue) => [
      timeSpanValue.id,
      timeSpanValue.value,
    ])
  );

  useEffect(() => {
    if (props.product?.variants.length == 0) {
      return;
    }
    const selectedVariant = props.product.variants.find(
      (variant) => variant.id === selectedVariantId
    );
    setSelectedOptions(
      selectedVariant.configurations.map((config) => ({
        name: config.option,
        value: config.value,
      }))
    );
    const selectedTimespan = timeSpanMap.get(selectedTimespanId);
    const displayedPointOfTimeLabels = selectedTimespan
      .pointsOfTime()
      .map((date) =>
        new Intl.DateTimeFormat(
          "vi-VN",
          selectedTimespan.displayTimeFormat
        ).format(date)
      );
    setProductPriceHistoryChartModel({
      name: props.product.name,
      history: {
        labels: displayedPointOfTimeLabels,
        datasets: chartDatasetBuilder.buildChartDataSets(
          props.product.variants.find(
            (variant) =>
              variant.id ===
              (selectedVariantId
                ? selectedVariantId
                : props.product.variants[0].id)
          ),
          props.product.sellers,
          selectedTimespan
        ),
      },
    });
  }, [props.product, selectedTimespanId, selectedVariantId]);

  const findMatchingVariant = () => {
    return props.product.variants.find((variant) =>
      LodashLang.isEqual(
        variant.configurations.map((config) => ({
          name: config.option,
          value: config.value,
        })),
        selectedOptions
      )
    );
  };

  return (
    <React.Fragment>
      <SelectButton
        options={timeSpans}
        value={selectedTimespanId}
        onChange={(e) => setSelectedTimespanId(e.value)}
      />
      {selectedOptions &&
        props.product.options.map((option, index) => {
          const currentOption = selectedOptions.find(
            (selectedOption) => selectedOption.name === option.name
          );
          return (
            <React.Fragment key={index}>
              {option.name}
              <SelectButton
                key={index}
                options={option.values.map((optionValue) => ({
                  label: optionValue,
                  value: optionValue,
                }))}
                value={currentOption.value}
                onChange={(e) => {
                  currentOption.value = e.value;
                  setSelectedVariantId(findMatchingVariant().id);
                }}
              />
            </React.Fragment>
          );
        })}
      {productPriceHistoryChartModel && (
        <Chart type="line" data={productPriceHistoryChartModel.history} />
      )}
    </React.Fragment>
  );
};

export default ProductPriceChart;
