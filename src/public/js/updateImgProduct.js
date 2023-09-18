
//para cambiar la img
const formImgProduct= document.getElementById('formImgProduct')
const alerOploadImgproduct= document.getElementById('alerOploadImgproduct')
const btnUpdateImg= document.getElementById('btnUpdateImg')


let isUploadMode = false
alerOploadImgproduct.style.display = 'none'

btnUpdateImg.addEventListener('click', () => {
    if (isUploadMode) {
        alerOploadImgproduct.style.display = 'none'
        btnUpdateImg.innerHTML = `
            <span class="material-symbols-outlined">
                upload_file
            </span>
            Cambiar imagen 
        `;
    } else {
       
        alerOploadImgproduct.style.display = 'block';
        btnUpdateImg.innerHTML = `
            <span class="material-symbols-outlined">
                cancel
            </span>
            Cancelar
        `;
    }
    
    isUploadMode = !isUploadMode
});



formImgProduct.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(formImgProduct)
    
    console.log(formData)
    fetch('/api/products/updateProductImg',
    {
        method: 'POST',
        body:formData
          
    }
    )
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            alert('Imagen modificada')
          //  window.location.replace('/userData')
        } else {
            alert('Lo siento, hubo un error al cargar la imagen, vuelve a intentarlo más tarde')
            console.error("Error al subir archivos");
        }
    })
})


/*





const formUpdateProduct= document.getElementById('formUpdateProduct')

formNewProduct.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(formNewProduct)
    
    console.log(formData)
    fetch('/api/products/newproduct',
    {
        method: 'POST',
        body:formData
          
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

*/

