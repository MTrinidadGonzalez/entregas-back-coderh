
const form= document.getElementById('registerForm')

form.addEventListener('submit', async(event)=> {
  try{
    event.preventDefault()
    const formData = new FormData(form);
    const obj = {};
    for (let [key, value] of formData) {
      obj[key] = value;
    }
    
    const user= JSON.stringify(obj)
    

    const response = await fetch('/api/session/register', {
        method:'POST',
        body:user,
        headers:{
            "Content-Type":"application/json"
        } 
    })
    console.log(response)
    const responseData= await response.json()
    if(responseData.status === 'success'){
        window.location.replace('/login')
    }
  
}

  catch(err){
    console.log(err)
  }
});
  
  
/*
form.addEventListener('submit',async (e)=>{
    try{
        e.preventDefault()
        const data= new FormData(form)
        
        const obj= {}
        const usuario= data.forEach((value, key)=>(obj[key]=value))
        const response = await fetch('/api/session', {
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            } 
        })
        console.log(response)
        const responseData= await response.json()
        if(responseData.status === 'success'){
            window.location.replace('/login')
        }
        
    }
    catch(err){
        console.log(err)
    }
   
})*/

