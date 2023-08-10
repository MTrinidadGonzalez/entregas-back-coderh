
const formNewProduct= document.getElementById('formNewProduct')

formNewProduct.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(formNewProduct)
    
    const productData = {};
    formData.forEach((value, key) => {
        productData[key] = value;
    })

    fetch('/api/products/newProduct',
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productData)
    }
    )
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            alert("Producto creado")
            formNewProduct.reset()
        } else {
            console.error("Error al crear el producto:", result.message);
        }
    })
})