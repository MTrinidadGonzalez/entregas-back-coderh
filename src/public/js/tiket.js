
console.log('conectado al segundo js')

const btnGenerarTiket= document.getElementById('btnGenerarTiket')


btnGenerarTiket.addEventListener('click', ()=>{

  try{
          
    const cartId = btnGenerarTiket.getAttribute('data-cart-id')

       fetch(`/api/cart/${cartId}/purchase`,{
       method: 'POST',
       body: JSON.stringify({cid:cartId}),
       headers:{
           'Content-Type':'application/json '
       } 
   })
   .then(response=> response.json()) 
   .then(data=>{
    if(data.status=== "success"){
      console.log('success')
      window.location.replace(`/${cartId}/purchase`)
    }
    if(data.status ==="error"){
      console.log(data.error)
    }
   })  
   
  }
  catch(error){
    console.log(error)
  }
})