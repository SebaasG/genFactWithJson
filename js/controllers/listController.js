// Función para obtener productos desde una API o archivo
export async function obtenerProductos() {
    try {
      // Realiza una solicitud a la API para obtener los productos
      const response = await fetch('http://localhost:3000/products'); // Cambia por la URL de tu API o archivo JSON
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanzar un error
        throw new Error('No se pudieron obtener los productos');
      }
      const products = await response.json();
      return products; // Devuelve los productos obtenidos de la API
    } catch (error) {
      // Si ocurre un error, imprimirlo y retornar un array vacío
      console.error('Error al obtener productos:', error);
      return []; // Si ocurre un error, retorna un array vacío
    }
}

// Función para filtrar productos por nombre
export function filtrarProductos(productos, searchTerm) {
    // Filtra los productos cuyo nombre contiene el término de búsqueda (ignora mayúsculas y minúsculas)
    return productos.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}
