import React from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import classNames from "classnames";

const AppTopbar = (props) => {
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img
          src={
            props.layoutColorMode === "light"
              ? "assets/layout/images/logo-dark.svg"
              : "assets/layout/images/logo-white.svg"
          }
          alt="logo"
        />
        <span>SAKAI</span>
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
            placeholder="Paste Tiki/Shopee link here..."
            onChange={props.onInputValueChanged}
            onKeyDown={props.onEnterKeyDown}
          />
          <Button label="Get" />
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
            <i className="pi pi-link" />
            <span>Product link</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default AppTopbar;
