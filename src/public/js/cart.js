
console.log('conectado al primer js')

const btnDeleteProductCart= document.querySelectorAll('.delete-product-btn')


btnDeleteProductCart.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        const pid = e.target.dataset.productId;
    
        const data={
            pid:pid
        }

        fetch('/api/cart/deleteproductcart',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response)=>{
            response.json()
            console.log('La respuesta del envio del btn borrar product fue', response)
        }
        )
        .catch(error => {
            console.error('Ocurrió un error al enviar la solicitud borrar product:', error);
        })
       


    })
});


// /api/cart/deleteproductcart