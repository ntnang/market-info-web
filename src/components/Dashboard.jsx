import React, { Component } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../service/ProductService";

export class Dashboard extends Component {
  state = {
    product: {
      name: "",
      history: {
        labels: [],
        datasets: [],
      },
    },
  };

  lastSevenDates = [...Array(7)]
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    })
    .reverse();

  weekDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  componentDidMount() {
    this.findLastTrackedProductHistories();
  }

  findLastTrackedProductHistories() {
    const lastSevenWeekDayNames = this.lastSevenDates.map(
      (date) => this.weekDayNames[date.getDay()]
    );
    fetch("http://localhost:3001/api/last-product/history")
      .then((res) => res.json())
      .then((history) => {
        this.setState({
          product: {
            name: history.name,
            history: {
              labels: lastSevenWeekDayNames,
              datasets: this.buildChartDataSet(history),
            },
          },
        });
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
    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };
    return (
      <div className="grid">
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Orders</span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">24 new </span>
            <span className="text-500">since last visit</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Revenue</span>
                <div className="text-900 font-medium text-xl">$2.100</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-map-marker text-orange-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">since last week</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Customers
                </span>
                <div className="text-900 font-medium text-xl">28441</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-inbox text-cyan-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">520 </span>
            <span className="text-500">newly registered</span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Comments
                </span>
                <div className="text-900 font-medium text-xl">152 Unread</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-comment text-purple-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">85 </span>
            <span className="text-500">responded</span>
          </div>
        </div>

        <div className="col-12 xl:col-6">
          <div className="card">
            <h5>Recent Sales</h5>
            <DataTable className="p-datatable-customers" rows={5} paginator>
              <Column
                header="Image"
                body={(data) => (
                  <img
                    src={`assets/demo/images/product/${data.image}`}
                    alt={data.image}
                    width="50"
                  />
                )}
              />
              <Column field="name" header="Name" sortable />
              <Column
                field="price"
                header="Price"
                sortable
                body={(data) => formatCurrency(data.price)}
              />
              <Column
                header="View"
                body={() => (
                  <>
                    <Button
                      icon="pi pi-search"
                      type="button"
                      className="p-button-text"
                    />
                  </>
                )}
              />
            </DataTable>
          </div>
          <div className="card">
            <div className="flex justify-content-between align-items-center mb-5">
              <h5>Best Selling Products</h5>
              <div>
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  className="p-button-rounded p-button-text p-button-plain"
                />
                <Menu
                  popup
                  model={[
                    { label: "Add New", icon: "pi pi-fw pi-plus" },
                    { label: "Remove", icon: "pi pi-fw pi-minus" },
                  ]}
                />
              </div>
            </div>
            <ul className="list-none p-0 m-0">
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Space T-Shirt
                  </span>
                  <div className="mt-1 text-600">Clothing</div>
                </div>
                <div className="mt-2 md:mt-0 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-orange-500 h-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                  <span className="text-orange-500 ml-3 font-medium">%50</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Portal Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-cyan-500 h-full"
                      style={{ width: "16%" }}
                    />
                  </div>
                  <span className="text-cyan-500 ml-3 font-medium">%16</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Supernova Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-pink-500 h-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <span className="text-pink-500 ml-3 font-medium">%67</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Wonders Notebook
                  </span>
                  <div className="mt-1 text-600">Office</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <span className="text-green-500 ml-3 font-medium">%35</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Mat Black Case
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-purple-500 h-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <span className="text-purple-500 ml-3 font-medium">%75</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Robots T-Shirt
                  </span>
                  <div className="mt-1 text-600">Clothing</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-teal-500 h-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                  <span className="text-teal-500 ml-3 font-medium">%40</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 xl:col-6">
          <div className="card">
            <h5>Sales Overview</h5>
            <Chart type="line" data={this.state.product.history} />
          </div>

          <div className="card">
            <div className="flex align-items-center justify-content-between mb-4">
              <h5>Notifications</h5>
              <div>
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  className="p-button-rounded p-button-text p-button-plain"
                />
                <Menu
                  popup
                  model={[
                    { label: "Add New", icon: "pi pi-fw pi-plus" },
                    { label: "Remove", icon: "pi pi-fw pi-minus" },
                  ]}
                />
              </div>
            </div>

            <span className="block text-600 font-medium mb-3">TODAY</span>
            <ul className="p-0 mx-0 mt-0 mb-4 list-none">
              <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                  <i className="pi pi-dollar text-xl text-blue-500" />
                </div>
                <span className="text-900 line-height-3">
                  Richard Jones
                  <span className="text-700">
                    {" "}
                    has purchased a blue t-shirt for{" "}
                    <span className="text-blue-500">79$</span>
                  </span>
                </span>
              </li>
              <li className="flex align-items-center py-2">
                <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                  <i className="pi pi-download text-xl text-orange-500" />
                </div>
                <span className="text-700 line-height-3">
                  Your request for withdrawal of{" "}
                  <span className="text-blue-500 font-medium">2500$</span> has
                  been initiated.
                </span>
              </li>
            </ul>

            <span className="block text-600 font-medium mb-3">YESTERDAY</span>
            <ul className="p-0 m-0 list-none">
              <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                  <i className="pi pi-dollar text-xl text-blue-500" />
                </div>
                <span className="text-900 line-height-3">
                  Keyser Wick
                  <span className="text-700">
                    {" "}
                    has purchased a black jacket for{" "}
                    <span className="text-blue-500">59$</span>
                  </span>
                </span>
              </li>
              <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                  <i className="pi pi-question text-xl text-pink-500" />
                </div>
                <span className="text-900 line-height-3">
                  Jane Davis
                  <span className="text-700">
                    {" "}
                    has posted a new questions about your product.
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <div
            className="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
            style={{
              borderRadius: "1rem",
              background:
                "linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1C80CF 47.88%, #FFFFFF 100.01%)",
            }}
          >
            <div>
              <div className="text-blue-100 font-medium text-xl mt-2 mb-3">
                TAKE THE NEXT STEP
              </div>
              <div className="text-white font-medium text-5xl">
                Try PrimeBlocks
              </div>
            </div>
            <div className="mt-4 mr-auto md:mt-0 md:mr-0">
              <a
                href="https://www.primefaces.org/primeblocks-react"
                className="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
