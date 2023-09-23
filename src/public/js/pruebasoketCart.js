
const socket= io()
socket.on('cartquantity', data=>{
    const spamCart= document.getElementById('spamCart')
    spamCart.innerText=data
    
})
