
const form= document.getElementById('newPswForm')

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const data= new FormData(form)
    const obj= {}
    data.forEach((value, key)=>obj[key]=value)

    try{
        const response = await fetch('/api/session/newPswRestore', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json '
            } 
        })
        const responseData= await response.json()
      
        if(responseData.status === 'success'){
            window.location.replace('/home')
        }
        if(responseData.status === 'error'){
            const spamUserNotFound= document.getElementById('spamUserNotFound')
            const msj= responseData.error
            spamUserNotFound.innerText= msj
        }
    }
    catch(err){
        console.log(err, 'error del server en login.js')
    }
   
})