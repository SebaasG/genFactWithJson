import { obtenerProductos } from '../controllers/listController.js';

// Definición del componente personalizado 'ListComponent'
class ListComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Plantilla HTML para el componente
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <div class="container mt-4">
        <!-- Input de búsqueda -->
        <input type="text" id="search" class="form-control mb-3" placeholder="Buscar productos..." />

        <!-- Tabla de productos -->
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Value/unit</th>
              <th scope="col">Amount</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>`;
  }

  // Método que se ejecuta al conectar el componente al DOM
  connectedCallback() {
    this.loadProducts(); // Cargar los productos al inicializar el componente
    this.setupSearch();  // Configurar la funcionalidad de búsqueda
  }

  // Método para obtener los productos desde el controlador
  async loadProducts() {
    const products = await obtenerProductos(); 
    this.renderProducts(products); // Renderiza los productos en la tabla
  }

  // Método para renderizar los productos en la tabla
  renderProducts(products) {
    const tbody = this.shadowRoot.querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar contenido previo

    // Itera sobre los productos y crea las filas de la tabla
    products.forEach((product) => {
      const tr = document.createElement("tr");
      tr.innerHTML = /*html*/ `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.value}</td>
        <td>${product.stock}</td>
        <td>${product.value * product.stock}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Configura el evento para el campo de búsqueda
  setupSearch() {
    const searchInput = this.shadowRoot.querySelector("#search");
    searchInput.addEventListener("input", (e) => this.filterProducts(e.target.value)); // Filtrar productos al escribir
  }

  // Filtra los productos basados en el término de búsqueda
  async filterProducts(query) {
    const products = await obtenerProductos(); // Obtiene todos los productos
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) // Filtra por nombre
    );
    this.renderProducts(filteredProducts); // Vuelve a renderizar con los productos filtrados
  }
}

// Definir el componente personalizado en el DOM
customElements.define("list-component", ListComponent);
