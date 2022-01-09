import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
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

  useEffect(async () => {
    const lastSevenWeekDayNames = timeSpan.LAST_7_DAYS.pointsOfTime().map(
      (date) => date.toLocaleDateString("en-US", { weekday: "long" })
    );
    const productHistories =
      await productService.findLastTrackedProductHistories();
    setLatestProduct({
      name: productHistories.name,
      history: {
        labels: lastSevenWeekDayNames,
        datasets: chartDatasetBuilder.buildChartDataSets(
          productHistories,
          timeSpan.LAST_7_DAYS
        ),
      },
    });
  }, [props.lastChangeDateTime]);

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>{latestProduct.name}</h5>
          <Chart type="line" data={latestProduct.history} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
