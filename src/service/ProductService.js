class ProductService {
  getAllProducts() {
    return fetch("http://localhost:3001/api/products").then((res) =>
      res.json()
    );
  }

  getProductInformation(origin, productId, shopId = "") {
    // use the proxy https://cors-anywhere.herokuapp.com/ to bypass cors from client side
    return fetch(
      `http://localhost:3001/api/${origin}/product/${productId}/${shopId}`
    )
      .then((res) => res.json())
      .then((product) => {
        if (Array.isArray(product.sellers)) {
          product.sellers = new Map(product.sellers);
        }
        return product;
      });
  }

  findLastTrackedProductHistories() {
    return fetch("http://localhost:3001/api/last-product/history")
      .then((res) => res.json())
      .then((product) => {
        if (Array.isArray(product.sellers)) {
          product.sellers = new Map(product.sellers);
        }
        return product;
      });
  }

  saveProductHistories(productId, product) {
    fetch(`http://localhost:3001/api/product/${productId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product, this.replacer),
    });
  }

  replacer(_, value) {
    if (value instanceof Map) {
      return {
        dataType: "Map",
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }
}
export default ProductService;
