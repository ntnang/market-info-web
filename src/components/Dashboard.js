import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import ProductService from "../service/ProductService";
import ChartDatasetBuilder from "../util/ChartDatasetBuilder";
import TimeSpan from "../constants/TimeSpan";

const Dashboard = (props) => {
  const [latestProduct, setLatestProduct] = useState({
    name: "",
    imagesUrls: [],
    origin: "",
    sellers: [],
    lastTrackedDate: null,
  });

  const [productPriceHistoryChartModel, setProductPriceHistoryChartModel] =
    useState({
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

  useEffect(() => {
    const displayedPointOfTimeLabels = selectedTimespan
      .pointsOfTime()
      .map((date) =>
        new Intl.DateTimeFormat(
          "vi-VN",
          selectedTimespan.displayTimeFormat
        ).format(date)
      );
    productService.findLastTrackedProductHistories().then((product) => {
      setLatestProduct(product);
      setProductPriceHistoryChartModel({
        name: product.name,
        history: {
          labels: displayedPointOfTimeLabels,
          datasets: chartDatasetBuilder.buildChartDataSets(
            product,
            selectedTimespan
          ),
        },
      });
    });
  }, [props.lastChangeDateTime]);

  useEffect(() => {
    const displayedPointOfTimeLabels = selectedTimespan
      .pointsOfTime()
      .map((date) =>
        new Intl.DateTimeFormat(
          "vi-VN",
          selectedTimespan.displayTimeFormat
        ).format(date)
      );
    setProductPriceHistoryChartModel({
      name: latestProduct.name,
      history: {
        labels: displayedPointOfTimeLabels,
        datasets: chartDatasetBuilder.buildChartDataSets(
          latestProduct,
          selectedTimespan
        ),
      },
    });
  }, [selectedTimespan]);

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
          <Chart type="line" data={productPriceHistoryChartModel.history} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
