document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.btnDeleteUserProduct');
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = button.getAttribute('data-product-id');
  
        if (productId) {
            const confirmMessage = "Seguro deseas borrar el producto?";
            const userConfirmed = window.confirm(confirmMessage)

          fetch('/api/products/deleteProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
          })
          .then(response => response.json())
          .then(data => {
            // Manejar la respuesta si es necesario
            console.log(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
      });
    });
  });
