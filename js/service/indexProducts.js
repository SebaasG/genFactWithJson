class IndexProducts extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../css/style.css"; // Ruta al archivo CSS
    this.shadowRoot.appendChild(link);

    this.shadowRoot.innerHTML = /*html*/ `
    <link rel="stylesheet" href="../../css/style.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">

    <style>
      /* Estilos de la barra de navegación */
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

      /* Estilos para las opciones de navegación */
      .optionNavProd {
        padding: 10px 20px;
        margin: 5px;
      }

      .optionNavProd:hover {
        background-color: #f1f1f1;
      }
    </style>

    <!-- Barra de navegación -->
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

    this.addEventListeners(); // Se agrega el listener de los enlaces
  }

  connectedCallback() {
    this.setDefaultActiveSection();  // Establecer "Edit" como activo por defecto
  }

  // Método que agrega los eventos de click a cada enlace de navegación
  addEventListeners() {
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        // Eliminar la clase 'active' de todos los enlaces
        links.forEach(link => link.classList.remove('active'));

        event.target.classList.add('active'); // Agregar 'active' al enlace clickeado

        const section = event.target.id.split('-')[0];  // Extraer la sección correspondiente del ID
        this._toggleDisplay(section); // Llamar a la función para mostrar la sección adecuada
      });
    });
  }

  // Método para establecer la sección por defecto (Edit)
  setDefaultActiveSection() {
    const editLink = this.shadowRoot.querySelector('#list-link');
    editLink.classList.add('active'); // Agregar la clase 'active' al enlace de "list"
    this._toggleDisplay('list'); // Mostrar la sección de "list" por defecto
  }

  // Método para mostrar u ocultar las secciones de CRUD según la opción seleccionada
  _toggleDisplay(component) {
    // Secciones principales que contienen los contenedores
    const productCrud = document.querySelector(".productCrud");
    const editCrud = document.querySelector(".editCrud");
    const deleteCrud = document.querySelector(".deleteCrud");
    const listCrud = document.querySelector(".listCrud");

    // Ocultar todas las secciones
    productCrud.style.display = "none";
    editCrud.style.display = "none";
    deleteCrud.style.display = "none";
    listCrud.style.display = "none";

    // Mostrar solo la sección correspondiente según la opción seleccionada
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

// Definir el componente personalizado en el DOM
customElements.define("index-products-component", IndexProducts);
