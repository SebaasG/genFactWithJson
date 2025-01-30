import { obtenerProductos, eliminarProducto } from '../controllers/deleteController.js';

// Definición del componente personalizado 'DeleteComponent'
class DeleteComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Adjuntamos el shadow DOM

    // Plantilla HTML para el componente
    this.shadowRoot.innerHTML = /*html*/ `
      <!-- Inclusión de Bootstrap para el diseño y estilo -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <table class="table container">
        <thead>
          <div class="d-flex">
            <tr>
              <th colspan="6" class="text-center fs-5">Products</th>
            </tr>
          </div>
          <tr>
            <th scope="col" id="codProd">#</th>
            <th scope="col" id="nameProd">Name</th>
            <th scope="col" id="valueProd">Value/unit</th>
            <th scope="col" id="stockProd">Amount</th>
            <th scope="col" id="imgTable">Subtotal</th>
            <th scope="col" id="btnTable">Delete</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>`;
  }

  // Método que se ejecuta cuando el componente es insertado en el DOM
  connectedCallback() {
    this.loadProducts(); // Llamamos a la función para cargar los productos
  }

  // Método que carga los productos desde el controller
  async loadProducts() {
    const products = await obtenerProductos(); // Obtención de productos desde el controller
    const tbody = this.shadowRoot.querySelector("tbody"); // Seleccionamos el cuerpo de la tabla
    tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    // Iteración sobre cada producto para agregarlo a la tabla
    products.forEach((product) => {
      const tr = document.createElement("tr");
      tr.innerHTML = /*html*/ `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.value}</td>
        <td>${product.stock}</td>
        <td>${product.value * product.stock}</td>
        <td><button class="btn btn-danger" id="delete-${product.id}">Delete</button></td>
      `;
      tbody.appendChild(tr); // Añadir la fila a la tabla

      // Agregar un event listener al botón de eliminación
      const deleteButton = tr.querySelector(`#delete-${product.id}`);
      deleteButton.addEventListener("click", () => {
        this.confirmDelete(product.id); // Llamamos al método para confirmar eliminación
      });
    });
  }

  // Método para confirmar la eliminación del producto
  confirmDelete(id) {
    const confirmation = confirm("¿Estás seguro de eliminar este producto?"); // Preguntar al usuario si está seguro
    if (confirmation) {
      eliminarProducto(id); // Llamar al controller para eliminar el producto
      this.loadProducts(); // Recargar la lista de productos después de eliminar
    }
  }
}

// Definir el componente personalizado en el DOM
customElements.define("delete-component", DeleteComponent);
