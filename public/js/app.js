const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#para1');
const messageTwo = document.querySelector('#para2');

//messageOne.textContent = 'This is para one';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
    if(!location){
        return messageOne.textContent = 'please enter location';
    }
    
    fetch('/weather?address='+ location ).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
            //console.log('error-->',data.error);
        }else{
            messageTwo.textContent = data.location
            messageOne.textContent = data.forcast
            // console.log('location-->',data.location);
            // console.log('forcast-->',data.forcast);
        }
        
    })
})
})