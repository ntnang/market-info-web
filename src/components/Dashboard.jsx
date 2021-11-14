import React, { Component } from "react";
import { Chart } from "primereact/chart";
import ProductService from "../service/ProductService";

class Dashboard extends Component {
  state = {
    product: {
      name: "",
      history: {
        labels: [],
        datasets: [],
      },
    },
  };

  productService = new ProductService();

  weekDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  lastSevenDates = [...Array(7)]
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    })
    .reverse();

  async componentDidMount() {
    const lastSevenWeekDayNames = this.lastSevenDates.map(
      (date) => this.weekDayNames[date.getDay()]
    );
    const productHistories =
      await this.productService.findLastTrackedProductHistories();
    this.setState({
      product: {
        name: productHistories.name,
        history: {
          labels: lastSevenWeekDayNames,
          datasets: this.buildChartDataSet(productHistories),
        },
      },
    });
  }

  buildChartDataSet(productHistory) {
    const datasets = [];
    const sellerHistoryMap = new Map(Object.entries(productHistory.sellers));
    for (let sellerHistory of sellerHistoryMap.values()) {
      const lastSevenDaysDataSet =
        this.buildLastSevenDaysDataSet(sellerHistory);
      if (
        lastSevenDaysDataSet.data &&
        lastSevenDaysDataSet.data.some((data) => data !== null)
      ) {
        datasets.push(lastSevenDaysDataSet);
      }
    }
    return datasets;
  }

  buildLastSevenDaysDataSet(sellerHistory) {
    const dataset = {};
    const lastSevenDaysHistories = sellerHistory.priceHistories.filter(
      (history) =>
        Date.parse(history.trackedDate) > this.getDateOfSevenDaysAgo()
    );
    dataset.data = this.generateChartData(
      sellerHistory.priceHistories,
      lastSevenDaysHistories,
      this.lastSevenDates
    );
    dataset.label = sellerHistory.name;
    dataset.tension = 0.4;
    dataset.fill = false;
    return dataset;
  }

  getDateOfSevenDaysAgo() {
    return this.lastSevenDates[0];
  }

  generateChartData(wholeHistories, inChartRangeHistories, chartDates) {
    const filledHistories = [];
    let previousHistory = this.getBoundaryStartValue(
      wholeHistories,
      inChartRangeHistories
    );
    chartDates.forEach((date) => {
      const historiesOnCurrentDate = inChartRangeHistories.filter((history) => {
        const trackedDate = new Date(history.trackedDate);
        return (
          trackedDate.getDate() === date.getDate() &&
          trackedDate.getMonth() === date.getMonth() &&
          trackedDate.getFullYear() === date.getFullYear()
        );
      });
      if (historiesOnCurrentDate.length != 0) {
        previousHistory =
          historiesOnCurrentDate[historiesOnCurrentDate.length - 1];
      }
      filledHistories.push(previousHistory);
    });
    return filledHistories.map((history) => (history ? history.price : null));
  }

  getBoundaryStartValue(wholeHistories, inChartRangeHistories) {
    const outChartRangeHistories = wholeHistories.filter(
      (history) => !inChartRangeHistories.includes(history)
    );
    return outChartRangeHistories[outChartRangeHistories.length - 1];
  }

  render() {
    return (
      <div className="grid">
        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>Last 7 days</h5>
            <Chart type="line" data={this.state.product.history} />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
