import { dataTable, observeTableChanges, saveInvoice } from "../controllers/summaryController.js";

class SummaryComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // Definir el HTML dentro del Shadow DOM para encapsular los estilos y el contenido
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card">
          <div class="card-header text-center text-aling-right">
            <h3>Invoice Detail</h3>
          </div>
          <div class="card-body">
            <div class="mt-3">
              <!-- Muestra el subtotal, IVA y total -->
              <p><strong>Subtotal:</strong> <span id="subtotal">$0.00</span></p>
              <p><strong>IVA (19%):</strong> <span id="iva">$0.00</span></p>
              <p><strong>Total:</strong> <span id="total">$0.00</span></p>
            </div>
          </div>
        </div>
        <!-- Botón para proceder con el pago -->
        <div class="text-center mt-4">
          <button class="btn btn-primary btn-lg" id="payBtn">Pay</button>
        </div>
      </div>`;
  }

  connectedCallback() {
    // Obtener el botón de pago y el componente de la tabla
    const payButton = this.shadowRoot.querySelector("#payBtn");
    const tableComponent = document.querySelector("table-component");

    // Observar cambios en la tabla y actualizar los datos al cambiar
    if (tableComponent) {
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      observeTableChanges(tableBody, () => {
        dataTable(tableBody, this);  // Actualizar la tabla con los nuevos datos
      });
    }

    // Agregar evento al botón de pago
    payButton.addEventListener("click", () => {
      // Actualizar la tabla y guardar la factura al hacer clic en el botón de pago
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      if (tableBody) {
        dataTable(tableBody, this);  // Actualizar la tabla con los datos actuales
      }
      saveInvoice(this);  // Guardar la factura
    });

    // Obtener el componente de usuario y escuchar el evento 'userDataSubmitted'
    const userComponent = document.querySelector("user-component");
    if (userComponent) {
      userComponent.addEventListener("userDataSubmitted", (event) => {
        // Guardar los datos del usuario en el almacenamiento local cuando se envían
        const userData = event.detail;
        localStorage.setItem("dataParcial", JSON.stringify(userData));
      });
    }
  }
}

// Definir el componente personalizado en el DOM
customElements.define("summary-component", SummaryComponent);
