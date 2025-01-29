// Definición del componente personalizado 'TableComponent'
class DeleteComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Plantilla HTML para el componente
    this.shadowRoot.innerHTML = /*html*/ `
      <!-- Inclusión de Bootstrap para el diseño y estilo -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <table class="table container">
        <thead>
          <div class="d-flex ">
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

  // Método para preparar los datos de la tabla
 
}


// Definir el componente personalizado en el DOM
customElements.define("delete-component", DeleteComponent);
