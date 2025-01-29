class IndexProducts extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../css/style.css"; // Ruta a tu archivo CSS
    this.shadowRoot.appendChild(link);

    this.shadowRoot.innerHTML = /*html*/ `
    <link rel="stylesheet" href="../../css/style.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">

    <style>
      .nav-item {
        font-size: 18px;
        font-weight: 600;
      }

      .nav-link {
        color: black;
        border-radius: 4px;
        padding-bottom: 5px;
      }

      .nav-link:hover {
        color: #0056b3;
        border-bottom: 3px solid black;
      }

      .nav-link.active {
        color: #0056b3;
        border-bottom: 3px solid black;  /* Línea activa */
      }

      .optionNavProd {
        padding: 10px 20px;
        margin: 5px;
      }

      .optionNavProd:hover {
        background-color: #f1f1f1;
      }
    </style>
    <ul class="nav justify-content-center">
      <li class="nav-item fs-5 px-5">
        <a class="nav-link optionNavProd" id="create-link" aria-current="page" href="#">Create</a>
      </li>
      <li class="nav-item fs-5">
        <a class="nav-link optionNavProd" id="edit-link" href="#">Edit</a>
      </li>
      <li class="nav-item fs-5 px-5">
        <a class="nav-link optionNavProd" id="delete-link" href="#">Delete</a>
      </li>
      <li class="nav-item fs-5 pe-5">
        <a class="nav-link optionNavProd" id="list-link" href="#">List</a>
      </li>
    </ul>
    `;

    this.addEventListeners();
  }

  addEventListeners() {
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        // Remove the 'active' class from all links
        links.forEach(link => link.classList.remove('active'));

        // Add the 'active' class to the clicked link
        event.target.classList.add('active');

        // Toggle the display based on the clicked link
        const section = event.target.id.split('-')[0];  // Get the section name (e.g., "create", "edit", "delete", "list")
        this._toggleDisplay(section);
      });
    });
  }

  _toggleDisplay(component) {
    const productCrud = document.querySelector(".productCrud");
    const editCrud = document.querySelector(".editCrud");
    const deleteCrud = document.querySelector(".deleteCrud");
    const listCrud = document.querySelector(".listCrud");

    // Hide all sections first
    productCrud.style.display = "none";
    editCrud.style.display = "none";
    deleteCrud.style.display = "none";
    listCrud.style.display = "none";

    if (component === "create") {
      productCrud.style.display = "block";  
    } else if (component === "edit") {
      editCrud.style.display = "block";
    } else if (component === "delete") {
      deleteCrud.style.display = "block";
    } else if (component === "list") {
      listCrud.style.display = "block";
    }
  }
}

customElements.define("index-products-component", IndexProducts);
