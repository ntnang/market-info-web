import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import ProductService from "../service/ProductService";
import ChartDatasetBuilder from "../util/ChartDatasetBuilder";
import TimeSpan from "../constants/TimeSpan";

const Dashboard = (props) => {
  const [latestProduct, setLatestProduct] = useState({
    name: "",
    history: {
      labels: [],
      datasets: [],
    },
  });

  const productService = new ProductService();
  const chartDatasetBuilder = new ChartDatasetBuilder();
  const timeSpan = new TimeSpan();

  const [selectedTimespan, setSelectedTimespan] = useState(
    timeSpan.LAST_7_DAYS
  );

  useEffect(async () => {
    const displayedPointOfTimeLabels = selectedTimespan
      .pointsOfTime()
      .map((date) =>
        new Intl.DateTimeFormat(
          "vi-VN",
          selectedTimespan.displayTimeFormat
        ).format(date)
      );
    const productHistories =
      await productService.findLastTrackedProductHistories();
    setLatestProduct({
      name: productHistories.name,
      history: {
        labels: displayedPointOfTimeLabels,
        datasets: chartDatasetBuilder.buildChartDataSets(
          productHistories,
          timeSpan.LAST_7_DAYS
        ),
      },
    });
  }, [props.lastChangeDateTime, selectedTimespan]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>{latestProduct.name}</h5>
          <Dropdown
            options={timeSpan.VALUES}
            optionLabel="label"
            value={selectedTimespan}
            onChange={(e) => setSelectedTimespan(e.value)}
          />
          <Chart type="line" data={latestProduct.history} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
