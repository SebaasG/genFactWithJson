import { loadProducts, loadCode } from "../controllers/prodController.js";
import { collectUserData } from "../controllers/userController.js";

class ProductComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // Definir el HTML dentro del Shadow DOM para encapsular los estilos y el contenido
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <form>
        <!-- Selector de producto -->
        <label for="selectProd" class="form-label">Select Product</label>
        <select class="form-select" aria-label="Default select example" id="selectProd">
        </select>

        <div class="mb-3">
          <!-- Campo de código (deshabilitado) -->
          <label for="codeNumber" class="form-label">Code</label>
          <input type="text" class="form-control" id="codeNumber" disabled aria-describedby="numberFact">
        </div>

        <div class="d-flex gap-3">
          <div class="flex-grow-1">
            <!-- Campo de valor unitario (deshabilitado) -->
            <label for="unitValue" class="form-label">Unit Value</label>
            <input type="text" class="form-control" disabled id="unitValue">
          </div>
          <div class="flex-grow-1">
            <!-- Campo de cantidad -->
            <label for="amountProd" class="form-label">Amount</label>
            <input type="text" class="form-control" id="amountProd">
          </div>
        </div>

        <div class="d-flex justify-content-center"> 
          <!-- Botón de envío -->
          <button type="submit" id="submitBtn" class="btn btn-primary mx-auto mt-3">Submit</button>
        </div>
      </form>
    `;
  }

  connectedCallback() {
    // Cargar los productos al inicializar el componente
    loadProducts(this);

    // Evento para manejar el envío del formulario
    this.shadowRoot
      .querySelector("#submitBtn")
      .addEventListener("click", (event) => {
        event.preventDefault();  // Evitar el comportamiento por defecto del formulario
        collectUserData(this);  // Llamar a la función para recolectar datos del usuario
      });

    // Evento para cargar el código cuando el producto es seleccionado
    this.shadowRoot
      .getElementById("selectProd")
      .addEventListener("change", () => {
        loadCode(this);  // Cargar el código del producto seleccionado
      });
  }
}

// Definir el componente personalizado en el DOM
customElements.define("product-component", ProductComponent);
