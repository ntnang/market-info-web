import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import ChartDatasetBuilder from "../util/ChartDatasetBuilder";
import TimeSpan from "../constants/TimeSpan";

const ProductPriceChart = (props) => {
  const [productPriceHistoryChartModel, setProductPriceHistoryChartModel] =
    useState({
      name: "",
      history: {
        labels: [],
        datasets: [],
      },
    });

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
          props.product,
          selectedTimespan
        ),
      },
    });
  }, [props.product, selectedTimespanId]);

  //   useEffect(() => {
  //     const selectedTimespan = timeSpanMap.get(selectedTimespanId);
  //     const displayedPointOfTimeLabels = selectedTimespan
  //       .pointsOfTime()
  //       .map((date) =>
  //         new Intl.DateTimeFormat(
  //           "vi-VN",
  //           selectedTimespan.displayTimeFormat
  //         ).format(date)
  //       );
  //     setProductPriceHistoryChartModel({
  //       name: props.product.name,
  //       history: {
  //         labels: displayedPointOfTimeLabels,
  //         datasets: chartDatasetBuilder.buildChartDataSets(
  //           props.product,
  //           selectedTimespan
  //         ),
  //       },
  //     });
  //   }, [selectedTimespanId]);

  return (
    <React.Fragment>
      <Dropdown
        options={timeSpans}
        value={selectedTimespanId}
        onChange={(e) => setSelectedTimespanId(e.value)}
      />
      <Chart type="line" data={productPriceHistoryChartModel.history} />
    </React.Fragment>
  );
};

export default ProductPriceChart;
