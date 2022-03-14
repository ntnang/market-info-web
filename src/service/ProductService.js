class ProductService {
  getAllProducts() {
    return fetch("http://localhost:3001/api/products").then((res) =>
      res.json()
    );
  }

  getProductCurrentInformationFromOrigin(origin, productId, shopId = "") {
    // use the proxy https://cors-anywhere.herokuapp.com/ to bypass cors from client side
    return fetch(
      `http://localhost:3001/api/${origin}/product/current-info/${productId}/${shopId}`
    )
      .then((res) => res.json())
      .then((product) => {
        if (Array.isArray(product.variants)) {
          product.variants = new Map(product.variants);
        }
        if (Array.isArray(product.sellers)) {
          product.sellers = new Map(product.sellers);
        }
        return product;
      });
  }

  getProduct(origin, productId) {
    // use the proxy https://cors-anywhere.herokuapp.com/ to bypass cors from client side
    return fetch(`http://localhost:3001/api/${origin}/product/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        if (Array.isArray(product.variants)) {
          product.variants = new Map(product.variants);
        }
        if (Array.isArray(product.sellers)) {
          product.sellers = new Map(product.sellers);
        }
        return product;
      });
  }

  findLastTrackedProduct() {
    return fetch("http://localhost:3001/api/product/latest")
      .then((res) => res.json())
      .then((product) => {
        if (Array.isArray(product.variants)) {
          product.variants = new Map(product.variants);
        }
        if (Array.isArray(product.sellers)) {
          product.sellers = new Map(product.sellers);
        }
        return product;
      });
  }

  saveProduct(productId, product) {
    return fetch(`http://localhost:3001/api/product/${productId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product, this.replacer),
    }).then((res) => res.status === 201);
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
