// Función para agregar o actualizar una fila en la tabla
export function setTable(tableComponent, tableData) {
  // Obtener el cuerpo de la tabla desde el shadow DOM
  const tbody = tableComponent.shadowRoot.querySelector("tbody");

  // Buscar si ya existe una fila con el mismo código de producto
  const existingRow = Array.from(tbody.querySelectorAll("tr")).find((row) => {
    const codeCell = row.querySelector("td:first-child").textContent;
    return codeCell === tableData.codeProd; // Compara el código del producto con el código de la tabla
  });

  // Si ya existe el producto, actualizar la cantidad y el subtotal
  if (existingRow) {
    const amountCell = existingRow.querySelector("td:nth-child(4)");
    const subTotalCell = existingRow.querySelector("td:nth-child(5)");

    const currentAmount = parseInt(amountCell.textContent) || 0; // Obtener la cantidad actual
    const newAmount = parseInt(currentAmount) + parseInt(tableData.amount); // Sumar la nueva cantidad

    // Actualizar los valores en la tabla
    amountCell.textContent = newAmount;
    subTotalCell.textContent = (
      parseInt(newAmount) * parseInt(tableData.value) // Calcular el nuevo subtotal
    ).toFixed(2);
  } else {
    // Si el producto no existe, agregar una nueva fila a la tabla
    const subTotal = tableData.value * tableData.amount; // Calcular el subtotal
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
        <td>${tableData.codeProd}</td>  <!-- Código del producto -->
        <td>${tableData.nameProd}</td>  <!-- Nombre del producto -->
        <td>${tableData.value}</td>    <!-- Valor del producto -->
        <td>${tableData.amount}</td>   <!-- Cantidad del producto -->
        <td>${subTotal.toFixed(2)}</td> <!-- Subtotal calculado -->
        <td><button class="btn btn-danger btnDelete">X</button></td>  <!-- Botón para eliminar -->
      `;
    tbody.appendChild(tableRow);

    // Agregar evento para eliminar la fila cuando se hace clic en el botón
    const btnDelete = tableRow.querySelector(".btnDelete");
    btnDelete.addEventListener("click", () => {
      tableRow.remove(); // Eliminar la fila de la tabla
    });
  }
}
