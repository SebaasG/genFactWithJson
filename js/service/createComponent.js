import { getProduct } from "../controllers/createController.js";

// Definición de la clase CreateComponent que extiende HTMLElement
class CreateComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Adjuntamos el shadow DOM
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
    
      <style>
        /* Estilos para el formulario y sus elementos */
        .form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
  
        .form-control {
          width: 100%;
          max-width: 400px;
          margin-bottom: 15px;
        }
  
        .form-label {
          font-weight: bold;
          display: block;
          margin-bottom: 8px;
        }
  
        .btn {
          width: 100%;
          max-width: 200px;
          margin-top: 20px;
          padding: 10px;
        }
  
        .form-control-image {
          width: 100%;
          max-width: 400px;
          padding: 10px;
          margin-bottom: 15px;
        }
  
        .input-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        .form-container form {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
  
      </style>
  
      <form>
        <div class="container form-container">
          <!-- Campos del formulario para capturar información del producto -->
          <div class="input-container">
            <label for="codeProd" class="form-label">Code</label>
            <input type="number" class="form-control" placeholder="Enter code" id="codeProd" required>
          </div>
    
          <div class="input-container">
            <label for="nameProd" class="form-label">Name</label>
            <input type="text" class="form-control" placeholder="Enter name" id="nameProd" required>
          </div>
    
          <div class="input-container">
            <label for="stockProd" class="form-label">Stock</label>
            <input type="number" class="form-control" placeholder="Enter stock" id="stockProd" required>
          </div>
    
          <div class="input-container">
            <label for="priceProd" class="form-label">Price</label>
            <input type="number" class="form-control" placeholder="Enter price" id="priceProd" required>
          </div>
    
          <div class="input-container">
            <label for="imageProd" class="form-label">Image URL</label>
            <input type="url" class="form-control form-control-image" id="imageProd" placeholder="Enter image URL" required>
          </div>
  
          <!-- Botón para enviar el formulario -->
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary" id="createProd">Submit</button>
          </div>
        </div>
      </form>
    `
  }

  connectedCallback() {
    // Selección del botón de submit dentro del shadow DOM
    const btn = this.shadowRoot.querySelector("#createProd"); 

    // Evento que dispara la función getProduct al hacer clic en el botón
    btn.addEventListener("click", () => {
      getProduct(this); // Llamada a la función getProduct pasando el componente
    });
  }
}

// Definición del nuevo elemento personalizado "create-component"
customElements.define("create-component", CreateComponent);
