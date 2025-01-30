// Función para actualizar el resumen de la factura
export function dataTable(tableBody, summaryComponent) {
  let total = 0;

  // Iterar sobre todas las filas de la tabla para calcular el total
  tableBody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length >= 5) {
      const subTotal = parseFloat(cells[4].textContent.trim()) || 0;
      total += subTotal; // Sumar el subtotal de cada fila al total
    }
  });

  // Calcular el IVA y el total con IVA
  const iva = total * 0.19;
  const grandTotal = total + iva;

  // Actualizar los elementos del resumen en el shadow DOM del componente
  summaryComponent.shadowRoot.getElementById("subtotal").textContent = `$${total}`;
  summaryComponent.shadowRoot.getElementById("iva").textContent = `$${iva}`;
  summaryComponent.shadowRoot.getElementById("total").textContent = `$${grandTotal}`;
}

// Función para observar cambios en la tabla y ejecutar un callback
export function observeTableChanges(tableBody, callback) {
  if (!tableBody) {
    console.error("No se encontró el cuerpo de la tabla.");
    return;
  }

  const observer = new MutationObserver(() => {
    callback(); // Ejecutar el callback cuando haya cambios
  });

  // Observar los cambios en los elementos hijos y el árbol de la tabla
  observer.observe(tableBody, { childList: true, subtree: true });

  return observer;
}

// Función para guardar la factura en la API
export async function saveInvoice(summaryComponent) {
  const dataString = localStorage.getItem("dataParcial");

  // Verificar si hay datos en localStorage
  if (!dataString) {
    console.error("No hay datos almacenados en localStorage.");
    return;
  }

  try {
    const data = JSON.parse(dataString);
    const { numInvoice, document } = data;

    // Obtener la fecha y hora actual
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    const formattedTime = now.toLocaleTimeString("es-CO", {
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
    });

    const fullDateTime = `${formattedDate} ${formattedTime}`;

    // Obtener el total desde el resumen
    const totalElement = summaryComponent.shadowRoot.querySelector("#total");
    let total = totalElement ? parseFloat(totalElement.textContent.replace(/\D/g, "")) : 0;

    // Crear los datos de la factura
    const invoiceData = {
      invoiceId: numInvoice,
      clientId: document.trim(), // Asegurando que el campo clientId no sea vacío por espacios
      total: total, // Ahora el total es un número entero
      date: fullDateTime,
    };

    console.log("Enviando datos:", invoiceData);

    // Enviar los datos a la API
    const response = await fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    if (response.ok) {
      console.log("Factura guardada correctamente");
    } else {
      console.error("Error al guardar la factura");
    }
  } catch (error) {
    console.error("Error procesando los datos:", error); // Manejo de errores
  }
}
