import { loadProducts, loadCode } from "../controllers/prodController.js";
import { collectUserData } from "../controllers/userController.js";

class ProductComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <form>
        <label for="selectProd" class="form-label">Select Product</label>
        <select class="form-select" aria-label="Default select example" id="selectProd">
        </select>

        <div class="mb-3">
          <label for="codeNumber" class="form-label">Code</label>
          <input type="text" class="form-control" id="codeNumber" disabled aria-describedby="numberFact">
        </div>

        <div class="d-flex gap-3">
          <div class="flex-grow-1">
            <label for="unitValue" class="form-label">Unit Value</label>
            <input type="text" class="form-control" disabled id="unitValue">
          </div>
          <div class="flex-grow-1">
            <label for="amountProd" class="form-label">Amount</label>
            <input type="text" class="form-control" id="amountProd">
          </div>
        </div>

        <div class="d-flex justify-content-center"> 
          <button type="submit" id="submitBtn" class="btn btn-primary mx-auto mt-3">Submit</button>
        </div>
      </form>
    `;
  }

  connectedCallback() {
    loadProducts(this);

    this.shadowRoot
      .querySelector("#submitBtn")
      .addEventListener("click", (event) => {
        event.preventDefault();
        collectUserData(this);
      });

    this.shadowRoot
      .getElementById("selectProd")
      .addEventListener("change", () => {
        loadCode(this);
      });
  }
}

customElements.define("product-component", ProductComponent);
