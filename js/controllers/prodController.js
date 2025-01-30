// Función para cargar productos en un selector
export function loadProducts(productComponent) {
  // Realiza una solicitud para obtener los productos desde la API
  fetch("http://localhost:3000/products")
    .then((response) => response.json()) // Convierte la respuesta en JSON
    .then((products) => {
      const productSelect =
        productComponent.shadowRoot.getElementById("selectProd");
      productSelect.innerHTML = ""; // Limpia las opciones actuales del selector

      // Crea una opción por defecto que indique "Elegir producto..."
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Choose product...";
      productSelect.appendChild(defaultOption);

      // Itera sobre los productos y los agrega como opciones en el selector
      products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching products:", error)); // Manejo de errores
}

// Función para cargar el código y valor del producto seleccionado
export function loadCode(productComponent) {
  const selectedValue =
    productComponent.shadowRoot.getElementById("selectProd").value;
  const codeInput = productComponent.shadowRoot.getElementById("codeNumber");

  // Asigna el valor seleccionado del producto al campo de código
  codeInput.value = selectedValue;

  // Realiza una solicitud para obtener el producto con el código seleccionado
  fetch(`http://localhost:3000/products?id=${selectedValue}`)
    .then((response) => response.json()) // Convierte la respuesta en JSON
    .then((products) => {
      if (products.length > 0) {
        const product = products[0];
        const value = product.value;

        // Asigna el valor del producto al campo correspondiente
        const inputValue =
          productComponent.shadowRoot.getElementById("unitValue");
        inputValue.value = value;
      } else {
        alert("Product not found"); // Si no se encuentra el producto, mostrar alerta
      }
    })
    .catch((error) => console.error("Error fetching product:", error)); // Manejo de errores
}
