// Importación de funciones desde el controlador de la tabla
import { setTable } from "../controllers/tableController.js";

// Definición del componente personalizado 'TableComponent'
class TableComponent extends HTMLElement {
  constructor() {
    super();
    // Adjuntamos el shadow DOM al componente
    this.attachShadow({ mode: "open" });

    // Plantilla HTML para el componente
    this.shadowRoot.innerHTML = /*html*/ `
      <!-- Inclusión de Bootstrap para el diseño y estilo -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <table class="table">
        <thead>
          <div class="d-flex justify-content-center no-wrap">
            <tr>
              <th colspan="6" class="text-center fs-5 mt-5">Purchase detail</th>
            </tr>
          </div>
          <tr>
            <th scope="col" id="codTable">#</th>
            <th scope="col" id="nameTable">Name</th>
            <th scope="col" id="valueTable">Value/unit</th>
            <th scope="col" id="amountTable">Amount</th>
            <th scope="col" id="subTable">Subtotal</th>
            <th scope="col" id="btnTable"></th>
          </tr>
        </thead>
        <tbody>
          <!-- Aquí se llenarán los datos de la tabla dinámicamente -->
        </tbody>
      </table>`;
  }

  // Método para preparar los datos de la tabla
  prepareTableData(userData) {
    const tableData = [];
    // Recorremos los elementos de los datos del usuario y calculamos el subtotal
    for (const item of userData.items) {
      tableData.push({
        code: item.code,
        name: item.name,
        value: item.value,
        amount: item.amount,
        subTotal: item.value * item.amount, // Calculamos el subtotal
      });
    }
    return tableData;
  }

  connectedCallback() {
    // Usamos setTimeout para esperar un ciclo de evento de la renderización
    setTimeout(() => {
      const userComponent = document.querySelector("user-component");

      if (userComponent) {
        // Ahora agregamos el event listener solo si 'user-component' está presente
        userComponent.addEventListener("userDataSubmitted", (event) => {
          const userData = event.detail;
          setTable(this, userData);
        });
      } else {
        console.warn("user-component no encontrado.");
      }
    }, 0); // Deja que el navegador renderice antes de buscar el 'user-component'
  }
}

// Definir el componente personalizado en el DOM
customElements.define("table-component", TableComponent);
