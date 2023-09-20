const updateDataUser= document.getElementById('updateDataUser')

updateDataUser.addEventListener('submit', (e)=>{
    e.preventDefault()
   
    const data= new FormData(updateDataUser)
    const obj= {}
    data.forEach((value, key)=>obj[key]=value)

    fetch('/api/users',
    {   method: 'PUT',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json '
            } 
          
    }
    )
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            alert("Datos modificados")
            updateDataUser.reset()
        } else {
            alert("Error del sevidor, vuelve a intntarlo más tarde");
        }
    })
})

