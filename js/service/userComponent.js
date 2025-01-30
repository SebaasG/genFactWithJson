// import { createNumberFact } from "../controllers/userController.js"; // Suponiendo que este import lo tienes en tu código real

class UserComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Generar un número temporal para la factura usando la fecha actual
    let id = Date.now().toString(15); 

    // Estructura HTML dentro del Shadow DOM para el formulario de usuario
    this.shadowRoot.innerHTML = /*html */ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      <form id="user-form">
        <div class="d-flex justify-content-center">
          <h1>Invoice</h1>
        </div>
        
        <!-- Campo de número de factura, generado temporalmente -->
        <div class="mb-3">
          <label for="invNumber" class="form-label mt-3">Invoice Number</label>
          <input type="text" class="form-control" id="invNumber" value="${id}" disabled aria-describedby="numberFact">
        </div>

        <!-- Campo para el documento del cliente -->
        <div class="flex-grow-1">
          <label for="idClient" class="form-label">Document</label>
          <input type="text" class="form-control" id="idClient">
        </div>

        <!-- Campos para nombre y apellido del cliente -->
        <div class="d-flex gap-3">
          <div class="flex-grow-1">
            <label for="nameClient" class="form-label">Name</label>
            <input type="text" class="form-control" id="nameClient">
          </div>
          <div class="flex-grow-1">
            <label for="lastClient" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastClient">
          </div>
        </div>

        <!-- Campo para dirección del cliente -->
        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" aria-describedby="addressHelp">
          <div id="addressHelp" class="form-text">We'll never share your address with anyone else.</div>
        </div>

        <!-- Campo para el correo electrónico del cliente -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>

      </form>`;
  }

}

// Definir el componente personalizado para el usuario
customElements.define("user-component", UserComponent);
