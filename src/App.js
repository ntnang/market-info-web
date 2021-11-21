import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import AppTopbar from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";

import Dashboard from "./components/Dashboard";
import ProductInfo from "./components/ProductInfo";

import PrimeReact from "primereact/api";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import ProductService from "./service/ProductService";
import UrlExtractor from "./util/UrlExtractor";
import react from "react";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";

const App = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("light");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

  const [isTopBarVisible, setIsTopBarVisible] = useState(false);
  const [
    isProductInfoFullScreenPopupVisible,
    setIsProductInfoFullScreenPopupVisible,
  ] = useState(false);
  const [productLink, setProductLink] = useState();
  const [isProductInfoDialogVisible, setIsProductInfoDialogVisible] =
    useState(false);
  const [product, setProduct] = useState({
    name: "",
    imagesUrls: [],
    origin: "",
    sellers: [],
    lastTrackedDate: null,
  });

  const productService = new ProductService();
  const urlExtractor = new UrlExtractor();

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  useEffect(() => {
    if (productLink) {
      getProductInformation();
    }
  }, [productLink]);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    setIsTopBarVisible(true);

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };

  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const onProductLinkInputValueChanged = (event) => {
    setProductLink(event.target.value);
  };

  function onProductLinkInputKeyDown(event, callback) {
    if (event.key === "Enter") {
      if (productLink) {
        getProductInformation();
      }
      setProductLink("");
      setIsTopBarVisible(false);
      callback();
    }
  }

  function onSearchButtonClicked(callback) {
    if (productLink) {
      getProductInformation();
    }
    setProductLink("");
    setIsTopBarVisible(false);
    callback();
  }

  const showProductInfoDialog = () => {
    setIsProductInfoDialogVisible(true);
  };

  const hideProductInfoDialog = () => {
    setIsProductInfoDialogVisible(false);
  };

  const showProductInfoFullScreenPopup = () => {
    setIsProductInfoFullScreenPopupVisible(true);
  };

  const hideProductInfoFullScreenPopup = () => {
    setIsProductInfoFullScreenPopupVisible(false);
  };

  const getProductInformation = () => {
    const hostname = urlExtractor.extractHostname(productLink);
    switch (hostname) {
      case urlExtractor.TIKI_VN:
        const productId = urlExtractor.extractTikiProductId(productLink);
        productService
          .getProductInformation(hostname, productId)
          .then((product) => {
            setProduct(product);
          });
        break;
      case urlExtractor.SHOPEE_VN:
        const ids = urlExtractor.extractShopeeProductIds(productLink);
        productService
          .getProductInformation(hostname, ids.itemId, ids.shopId)
          .then((product) => {
            setProduct(product);
          });
        break;
      default:
        alert("Not supported!");
        break;
    }
  };

  function trackProductInformation(callback) {
    const productId = urlExtractor.extractTikiProductId(productLink);
    productService.saveProductHistories(productId, product);
    callback();
  }

  const getFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={hideProductInfoDialog}
          className="p-button-text"
        />
        <Button
          label="Track"
          icon="pi pi-check"
          className="btn-primary"
          onClick={() => trackProductInformation(hideProductInfoDialog)}
        />
      </div>
    );
  };

  const menu = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
      ],
    },
  ];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
    "layout-theme-light": layoutColorMode === "light",
  });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode={layoutColorMode}
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={onMobileTopbarMenuClick}
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
        productLink={productLink}
        onProductLinkInputValueChanged={onProductLinkInputValueChanged}
        onProductLinkInputKeyDown={(event) =>
          onProductLinkInputKeyDown(event, showProductInfoDialog)
        }
        onSearchButtonClicked={() =>
          onSearchButtonClicked(showProductInfoDialog)
        }
      />

      <Sidebar
        visible={isTopBarVisible}
        position="top"
        onHide={() => setIsTopBarVisible(false)}
      >
        <div className="col-12 md:col-6">
          <div className="p-inputgroup">
            <InputText
              value={productLink}
              placeholder="Insert keyword or link here..."
              onChange={onProductLinkInputValueChanged}
              onKeyDown={(event) =>
                onProductLinkInputKeyDown(event, showProductInfoFullScreenPopup)
              }
            />
            <Button
              label="Search"
              onClick={() =>
                onSearchButtonClicked(showProductInfoFullScreenPopup)
              }
            />
          </div>
        </div>
      </Sidebar>

      <Sidebar
        visible={isProductInfoFullScreenPopupVisible}
        fullScreen
        onHide={hideProductInfoFullScreenPopup}
      >
        <div>Product information</div>
        <ProductInfo product={product} />
      </Sidebar>

      <Dialog
        header="Product information"
        footer={getFooter}
        visible={isProductInfoDialogVisible}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        onHide={hideProductInfoDialog}
        modal
        maximizable
      >
        <ProductInfo product={product} />
      </Dialog>

      <div className="layout-sidebar" onClick={onSidebarClick}>
        <AppMenu
          model={menu}
          onMenuItemClick={onMenuItemClick}
          layoutColorMode={layoutColorMode}
        />
      </div>

      <div className="layout-main-container">
        <div className="layout-main">
          <Route path="/" exact component={Dashboard} />
        </div>

        <AppFooter layoutColorMode={layoutColorMode} />
      </div>

      <AppConfig
        rippleEffect={ripple}
        onRippleEffect={onRipple}
        inputStyle={inputStyle}
        onInputStyleChange={onInputStyleChange}
        layoutMode={layoutMode}
        onLayoutModeChange={onLayoutModeChange}
        layoutColorMode={layoutColorMode}
        onColorModeChange={onColorModeChange}
      />

      <CSSTransition
        classNames="layout-mask"
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>
    </div>
  );
};

export default App;
