class NavComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
      
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHPXxVlrNq-SWYWW0dBYgTBFPQskIEVwo1QW9XcU6ATR9DxZ50t4r7t6kPt1M0tdUREQ&usqp=CAU" alt="" width="60" height="60" class="d-inline-block align-text-center">
            CampusLands
          </a>
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-link fs-4" aria-current="page" href="#" id="sell-link">Sell</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fs-4" href="#" id="products-link">Products</a>
            </li>
          </ul>
        </div>
      </nav>
    `;
    this._addEventListeners();
  }

  _addEventListeners() {
    this.shadowRoot
      .querySelector("#sell-link")
      .addEventListener("click", () => {
        this._toggleDisplay("sell");
      });

    this.shadowRoot
      .querySelector("#products-link")
      .addEventListener("click", () => {
        this._toggleDisplay("products");
      });
  }

  _toggleDisplay(component) {
    // Obtener los contenedores de las secciones
    const josehptaContainer = document.querySelector(".josehpta");
    const prodComponent = document.querySelector(".productsIndex");
    
    // Ocultar ambos contenedores
    josehptaContainer.style.display = "none";
    prodComponent.style.display = "none";

    // Mostrar la sección correspondiente al enlace clickeado
    if (component === "sell") {
      josehptaContainer.style.display = "block";
    } else if (component === "products") {
      prodComponent.style.display = "block";
    }
  }
}

// Definir el componente personalizado en el DOM
customElements.define("nav-component", NavComponent);
