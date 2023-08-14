const btnCards = document.querySelectorAll('.btnCard');

btnCards.forEach((button) => {
  const quantityElement = button.parentElement.querySelector('.spam-quantity');
  let quantity = 1;

  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    const data = {
      productId: productId,
      spamQuantity: quantity
    };

    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response); // Agrega este console.log para ver la respuesta
        return response.json();
      })
      .then(result => {
        console.log(result.message);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });

  button.parentElement.querySelector('.btn-subtract-product').addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityElement.textContent = quantity;
    }
  });

  button.parentElement.querySelector('.btn-add-more-product').addEventListener("click", () => {
    quantity++;
    quantityElement.textContent = quantity;
  });
});


const btnConvertToPremium= document.getElementById('btnConvertToPremium')
btnConvertToPremium.addEventListener('click', ()=>{
const userId = btnConvertToPremium.getAttribute('data-user-id');

fetch('/api/session/convertToPremium',
{
  method: 'POST',
  headers: {
      'Content-Type':'application/json'
  },
  body: JSON.stringify({ userId })
})
.then(response=> response.json())
.then(data=> {
  if(data.status === "success"){
  window.location.href = '/login'
  }
})

})


const btnRevertPremium= document.getElementById('btnRevertPremium')

btnRevertPremium.addEventListener('click',()=>{

  const userId = btnRevertPremium.getAttribute('data-user-id');

 fetch('/api/session/revertPremium',
 {
   method: 'POST',
   headers: {
       'Content-Type':'application/json'
   },
   body: JSON.stringify({ userId })
 })
 .then(response=> response.json())
 .then(data=> {
   if(data.status === "success"){
   window.location.href = '/login'
   }
 })





})
