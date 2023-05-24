const socket= io()

const containerProducts= document.getElementById('realTimeproductsContainer')
socket.on('productRealTime',data=>{
    console.log(data)

})





