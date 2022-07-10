import React from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import classNames from "classnames";
import "./scss/app-top-bar.scss";

const AppTopbar = (props) => {
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <i className="pi pi-chart-line" />
        <span>eComTrax</span>
      </Link>

      <button
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={props.onToggleMenuClick}
      >
        <i className="pi pi-bars" />
      </button>
      <div id="product-link" className="p-fluid col-12 md:col-8">
        <div className="p-inputgroup">
          <InputText
            value={props.link}
            placeholder="Insert keyword or link here..."
            onChange={props.onProductLinkInputValueChanged}
            onKeyDown={props.onProductLinkInputKeyDown}
          />
          <Button label="Search" onClick={props.onSearchButtonClicked} />
        </div>
      </div>

      <button
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <ul
        className={classNames("layout-topbar-menu lg:flex origin-top", {
          "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive,
        })}
      >
        <li>
          <button
            id="product-link-button"
            className="p-link layout-topbar-button"
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className="pi pi-search" />
            <span>Search</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default AppTopbar;
