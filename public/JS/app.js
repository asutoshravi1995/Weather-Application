

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
     e.preventDefault()
     const location=search.value || ''
     messageOne.textContent="Loading....."
     fetch('/weather/?address='+location)
     .then((responce)=>{
         responce.json()
         .then((data)=>{
             if(data.error){
                 messageOne.textContent=data.error;
             }
             else{
                 messageOne.textContent=data.location;
                 messageTwo.textContent=data.forcast;
             }
         })
     
     })
     .catch((err)=>{
         console.log("Error Outside"+err.message);
     })
})