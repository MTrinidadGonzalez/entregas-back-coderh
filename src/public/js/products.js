btnCards.forEach((button) => {
  const quantityElement = button.parentElement.querySelector('.spam-quantity')
  let quantity = 1

  button.addEventListener('click', () => {
    const productId = button.dataset.productId

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




/*
const btnCards = document.querySelectorAll('.btnCard');

let spamQuantity = 0;
let spamQuantityElement = document.getElementById("spam-quantity");

document.getElementById("btn-subtract-product").addEventListener("click", ()=> {
  if (spamQuantity > 0) {
    spamQuantity--;
    spamQuantityElement.textContent = spamQuantity;
  }
})

document.getElementById("btn-add-more-product").addEventListener("click",()=> {
  spamQuantity++;
  spamQuantityElement.textContent = spamQuantity;
})

btnCards.forEach((button)=>{
    button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        
        const data = {
            productId: productId,
            spamQuantity: spamQuantity
          };
        
          fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(result => {
              console.log(result.message)
            })

            .catch(error => {
              console.error("Error:", error);
            });
        

    })//cierre del addventList

})//cierre del foreach

*/




  /*
  se utiliza la sintaxis dataset.nombreAtributo. 
  En este caso, button.dataset.productId se utiliza 
  para obtener el valor del atributo data-product-id del botón.
  */