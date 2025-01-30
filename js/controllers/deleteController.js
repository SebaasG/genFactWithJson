// Función para obtener todos los productos
export async function obtenerProductos() {
    try {
        // Realizar una solicitud GET para obtener los productos desde el servidor
        const response = await fetch("http://localhost:3000/products");

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Error al obtener los productos"); // Error si la respuesta no es exitosa
        }

        // Devolver los productos obtenidos en formato JSON
        return await response.json();
    } catch (error) {
        // Manejo de errores
        console.error("Error:", error);
        return [];  // Retornar un arreglo vacío en caso de error
    }
}

// Función para eliminar un producto
export async function eliminarProducto(id) {
    try {
        // Realizar una solicitud DELETE para eliminar el producto con el id especificado
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error al eliminar el producto con id ${id}`); // Error si la respuesta no es exitosa
        }

        // Devolver la respuesta en formato JSON
        return await response.json();
    } catch (error) {
        // Manejo de errores
        console.error("Error:", error);
    }
}
