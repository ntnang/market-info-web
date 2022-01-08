import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ProductService from "../service/ProductService";
import ChartDatasetBuilder from "../util/ChartDatasetBuilder";
import TimeSpans from "../constants/TimeSpans";

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
  const timeSpans = new TimeSpans();

  const weekDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(async () => {
    console.log(timeSpans.LAST_7_DAYS.pointsOfTime());
    const lastSevenWeekDayNames = timeSpans.LAST_7_DAYS.pointsOfTime().map(
      (date) => weekDayNames[date.getDay()]
    );
    const productHistories =
      await productService.findLastTrackedProductHistories();
    setLatestProduct({
      name: productHistories.name,
      history: {
        labels: lastSevenWeekDayNames,
        datasets: chartDatasetBuilder.buildChartDataSets(
          productHistories,
          timeSpans.LAST_7_DAYS
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
