export async function searchProduct(editComponent) {
    const selectedValue = editComponent.shadowRoot.getElementById("searchCode").value;

    fetch(`http://localhost:3000/products?id=${selectedValue}`)
      .then((response) => response.json())
      .then((products) => {
        if (products.length > 0) {
          const product = products[0];

          const codeProd = editComponent.shadowRoot.getElementById("codeProd");
          const nameProd = editComponent.shadowRoot.getElementById("nameProd");
          const stockProd = editComponent.shadowRoot.getElementById("stockProd");
          const priceProd = editComponent.shadowRoot.getElementById("priceProd");
          const imageProd = editComponent.shadowRoot.getElementById("imageProd");

          // Asignar valores
          codeProd.value = product.id || "";
          nameProd.value = product.name || "";
          stockProd.value = product.stock || "";
          priceProd.value = product.value || "";
          imageProd.value = product.img || "";

          // Habilitar los campos excepto el código
          nameProd.removeAttribute("disabled");
          stockProd.removeAttribute("disabled");
          priceProd.removeAttribute("disabled");
          imageProd.removeAttribute("disabled");

        } else {
          alert("Product not found");
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
}
