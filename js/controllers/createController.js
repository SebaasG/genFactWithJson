// Función para crear un producto en el servidor
export async function crearProduct(product) {
    try {
        // Preparar los datos del producto para enviarlos al servidor
        const productData = {
            "id": product.code,
            "name": product.nameProd,
            "value": product.valueProd,
            "stock": product.stockProd,
            "img": product.imgProd
        }

        // Enviar la solicitud POST al servidor para crear el producto
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error("Error al crear el producto: ${response.statusText}"); // Error si la respuesta no es exitosa
        }

        // Devolver la respuesta en formato JSON
        return await response.json();
    } catch (error) {
        // Manejo de errores
        console.error("Error:", error);
        return null;  // Retornar null en caso de error
    }
}

// Función para obtener los datos del producto desde el formulario
export function getProduct(createComponent) {
    // Obtener los valores del formulario a través del Shadow DOM
    const id = createComponent.shadowRoot.getElementById("codeProd").value;
    const nameProd = createComponent.shadowRoot.getElementById("nameProd").value;
    const valueProd = createComponent.shadowRoot.getElementById("priceProd").value;
    const stockProd = createComponent.shadowRoot.getElementById("stockProd").value;
    const imgProd = createComponent.shadowRoot.getElementById("imageProd").value;

    // Crear un objeto producto con los valores obtenidos
    const prod = {
        id,
        nameProd,
        valueProd,
        stockProd,
        imgProd
    }

    // Llamar a la función para crear el producto
    crearProduct(prod);
}
