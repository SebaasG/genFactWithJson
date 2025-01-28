export function dataTable(tableBody, summaryComponent) {
  let total = 0;

  tableBody.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length >= 5) {
      const subTotal = parseFloat(cells[4].textContent.trim()) || 0;
      total += subTotal;
    }
  });

  const iva = total * 0.19;
  const grandTotal = total + iva;

  // Actualizar los elementos del resumen en el shadow DOM de summaryComponent
  summaryComponent.shadowRoot.getElementById("subtotal").textContent = `$${total}`;
  summaryComponent.shadowRoot.getElementById("iva").textContent = `$${iva}`;
  summaryComponent.shadowRoot.getElementById("total").textContent = `$${grandTotal}`;
}

export function observeTableChanges(tableBody, callback) {
  if (!tableBody) {
    console.error("No se encontró el cuerpo de la tabla.");
    return;
  }

  const observer = new MutationObserver(() => {
    callback();
  });

  observer.observe(tableBody, { childList: true, subtree: true });

  return observer;
}

export async function saveInvoice(summaryComponent) {
  const dataString = localStorage.getItem("dataParcial");

  if (!dataString) {
    console.error("No hay datos almacenados en localStorage.");
    return;
  }

  try {
    const data = JSON.parse(dataString);
    const { numInvoice, document } = data;

    // Obtener la fecha y hora actual en formato 'YYYY-MM-DD HH:MM:SS'
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



    const invoiceData = {
      invoiceId: numInvoice,
      clientId: document.trim(), // Asegurando que el campo clientId no sea vacío por espacios
      total: total, // Ahora el total es un número entero
      date: fullDateTime,
    };

    console.log("Enviando datos:", invoiceData);

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
    console.error("Error procesando los datos:", error);
  }
}
