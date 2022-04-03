import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { SelectButton } from "primereact/selectbutton";
import ChartDatasetBuilder from "../util/ChartDatasetBuilder";
import TimeSpan from "../constants/TimeSpan";
import LodashLang from "lodash/lang";

const ProductPriceChart = (props) => {
  const [productPriceHistoryChartModel, setProductPriceHistoryChartModel] =
    useState({
      name: "",
      history: {
        labels: [],
        datasets: [],
      },
    });

  const [selectedVariantId, setSelectedVariantId] = useState(
    props.product.variants[0].id
  );

  const selectedOptions = props.product.options.map((option) => ({
    name: option.name,
    value: option.values[0],
  }));
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
            (variant) => variant.id === selectedVariantId
          ),
          props.sellers,
          selectedTimespan
        ),
      },
    });
  }, [props.product, selectedTimespanId, selectedVariantId]);

  const findMatchingVariant = () => {
    return props.product.variants.find((variant) =>
      LodashLang.isEqual(variant.configurations, selectedOptions)
    );
  };

  return (
    <React.Fragment>
      <SelectButton
        options={timeSpans}
        value={selectedTimespanId}
        onChange={(e) => setSelectedTimespanId(e.value)}
      />
      {props.product.options.map((option) => {
        const currentOption = selectedOptions.find(
          (selectedOption) => selectedOption.name === option.name
        );
        return (
          <SelectButton
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
        );
      })}
      <Chart type="line" data={productPriceHistoryChartModel.history} />
    </React.Fragment>
  );
};

export default ProductPriceChart;
