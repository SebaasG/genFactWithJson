import { searchProduct, saveProduct } from "../controllers/editController.js";

class CreateComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">

    <style>
      .form-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .form-control {
        width: 100%;
        max-width: 60%; /* Reducir el tamaño de los campos */
        margin-bottom: 15px;
      }

      .form-label {
        font-weight: bold;
        display: block;
        margin-bottom: 8px; /* Añadir algo de espacio entre la etiqueta y el campo */
        text-align: start;
      }

      .btn {
        width: 100%;
        max-width: 200px;
        margin-top: 20px;
        padding: 10px;
      }

      /* Mejorar la estética del campo de la imagen */
      .form-control-image {
        width: 100%;
        max-width: 60%;
        padding: 10px;
        margin-bottom: 15px;
      }

      /* Centrar el contenedor de las filas dentro del formulario */
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
        align-items: start;
      }

     
    </style>

    <form>
      <div class="container form-container">
        
        <!-- Campo de código -->
        <div class="input-container">
        <div class="d-flex gap-3">  
         

      </div>

      <input class="form-control" type="search" placeholder="Search for code " id="searchCode" aria-label="Search">
      <button class="btn btn-outline-success mb-5" id = "searchBtn" >Search</button> 
          <label for="codeProd" class="form-label">Code</label>
          <input type="number" class="form-control" placeholder="Enter code" id="codeProd" disabled required>

        </div>
        <!-- Campo de nombre -->
        <div class="input-container">
        
          <label for="nameProd" class="form-label">Name</label>
          <input type="text" class="form-control" placeholder="Enter name" id="nameProd" disabled required>
        </div>

        <!-- Campo de stock -->
        <div class="input-container">
          <label for="stockProd" class="form-label">Stock</label>
          <input type="number" class="form-control" placeholder="Enter stock" id="stockProd" disabled required>
        </div>

        <!-- Campo de precio -->
        <div class="input-container">
          <label for="priceProd" class="form-label">Price</label>
          <input type="number" class="form-control" placeholder="Enter price" id="priceProd" disabled required>
        </div>

        <!-- Campo de imagen -->
        <div class="input-container">
          <label for="imageProd" class="form-label">Image URL</label>
          <input type="url" class="form-control form-control-image" id="imageProd" placeholder="Enter image URL" disabled required>
        </div>

        <!-- Botón de Submit -->
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary" id= "saveBtn" >Submit</button>
        </div>
      </div>
    </form>
    `;
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector("#searchBtn");
    const btnSave = this.shadowRoot.querySelector("#saveBtn");
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      searchProduct(this);
    });
    btnSave.addEventListener("click", async (event) => {
      event.preventDefault();
      await saveProduct(this);
    });
  }

}

customElements.define("edit-component", CreateComponent);
