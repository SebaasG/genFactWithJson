export async function crearProduct(product) {
    try {
        console.log(product);
        const productData = {
            "cod" : product.code,
            "name" : product.nameProd,
            "value" : product.valueProd,
            "stock" : product.stockProd,
            "img" : product.imgProd 
        }
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error(`Error al crear el producto: ${response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error:", error);
        return null; 
    }
}

export function getProduct (createComponent) {
    const code = createComponent.shadowRoot.getElementById("codeProd").value;
    const nameProd = createComponent.shadowRoot.getElementById("nameProd").value;
    const valueProd = createComponent.shadowRoot.getElementById("priceProd").value;
    const stockProd = createComponent.shadowRoot.getElementById("stockProd").value;
    const imgProd = createComponent.shadowRoot.getElementById("imageProd").value;
    console.log("Entra aqui");
    const prod = {
        code,
        nameProd,
        valueProd,
        stockProd,
        imgProd
        }
    crearProduct(prod);
    

}
