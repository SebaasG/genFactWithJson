class NavComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
<nav class="navbar navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHPXxVlrNq-SWYWW0dBYgTBFPQskIEVwo1QW9XcU6ATR9DxZ50t4r7t6kPt1M0tdUREQ&usqp=CAU" alt="" width="60" height="60" class="d-inline-block align-text-center">
      CampusLands
    </a>
    <ul class="nav justify-content-center">
  <li class="nav-item">
    <a class="nav-link active fs-4" aria-current="page" href="#">Sell</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active fs-4" href="#">Products</a>
  </li>

</ul>
  </div>

</nav>
    `;
  }
}
customElements.define("nav-component", NavComponent);
