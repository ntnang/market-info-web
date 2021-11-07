import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import ProductInfoDialog from "./components/ProductInfoDialog";

class AppTopbar extends Component {
  state = {
    link: "",
    isProductInfoDialogVisible: false,
  };

  onInputValueChanged = (event) => {
    this.setState({ link: event.target.value });
  };

  onSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      this.showProductInfoDialog();
    }
  };

  showProductInfoDialog = () => {
    this.setState({ isProductInfoDialogVisible: true });
  };

  hideProductInfoDialog = () => {
    this.setState({ isProductInfoDialogVisible: false });
  };

  render() {
    return (
      <div className="layout-topbar">
        <Link to="/" className="layout-topbar-logo">
          <img
            src={
              this.props.layoutColorMode === "light"
                ? "assets/layout/images/logo-dark.svg"
                : "assets/layout/images/logo-white.svg"
            }
            alt="logo"
          />
          <span>SAKAI</span>
        </Link>

        <button
          type="button"
          className="p-link  layout-menu-button layout-topbar-button"
          onClick={this.props.onToggleMenuClick}
        >
          <i className="pi pi-bars" />
        </button>
        <div className="p-fluid col-12 md:col-6">
          <InputText
            value={this.state.link}
            placeholder="Paste Tiki/Shopee link here..."
            onChange={this.onInputValueChanged}
            onKeyDown={this.onSearchKeyDown}
          />
        </div>

        <button
          type="button"
          className="p-link layout-topbar-menu-button layout-topbar-button"
          onClick={this.props.onMobileTopbarMenuClick}
        >
          <i className="pi pi-ellipsis-v" />
        </button>

        <ul
          className={classNames("layout-topbar-menu lg:flex origin-top", {
            "layout-topbar-menu-mobile-active":
              this.props.mobileTopbarMenuActive,
          })}
        >
          {/* <li>
                          <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                              <i className="pi pi-calendar"/>
                              <span>Events</span>
                          </button>
                      </li>
                      <li>
                          <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                              <i className="pi pi-cog"/>
                              <span>Settings</span>
                          </button>
                      </li>
                      <li>
                          <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                              <i className="pi pi-user"/>
                              <span>Profile</span>
                          </button>
                      </li> */}
          <li>
            <button
              className="p-link layout-topbar-button"
              onClick={this.props.onMobileSubTopbarMenuClick}
            >
              <i className="pi pi-search" />
              <span>Search</span>
            </button>
          </li>
        </ul>
        <ProductInfoDialog
          link={this.state.link}
          isDialogVisible={this.state.isProductInfoDialogVisible}
          onHide={this.hideProductInfoDialog}
        />
      </div>
    );
  }
}
export default AppTopbar;
