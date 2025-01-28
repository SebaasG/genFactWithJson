// summaryComponent.js
import { dataTable, observeTableChanges, saveInvoice } from "../controllers/summaryController.js";

class SummaryComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card">
          <div class="card-header text-center text-aling-right">
            <h3>Invoice Detail</h3>
          </div>
          <div class="card-body">
            <div class="mt-3">
              <p><strong>Subtotal:</strong> <span id="subtotal">$0.00</span></p>
              <p><strong>IVA (19%):</strong> <span id="iva">$0.00</span></p>
              <p><strong>Total:</strong> <span id="total">$0.00</span></p>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-primary btn-lg" id="payBtn">Pay</button>
        </div>
      </div>`;
  }

  connectedCallback() {
    const payButton = this.shadowRoot.querySelector("#payBtn");
    const tableComponent = document.querySelector("table-component");

    if (tableComponent) {
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      observeTableChanges(tableBody, () => {
        dataTable(tableBody, this);
      });
    }

    payButton.addEventListener("click", () => {
      const tableBody = tableComponent.shadowRoot.querySelector("tbody");
      if (tableBody) {
        dataTable(tableBody, this);
      }
      saveInvoice(this);
    });

    const userComponent = document.querySelector("user-component");
    if (userComponent) {
      userComponent.addEventListener("userDataSubmitted", (event) => {
        const userData = event.detail;
        localStorage.setItem("dataParcial", JSON.stringify(userData));
      });
    }
  }
}

customElements.define("summary-component", SummaryComponent);
