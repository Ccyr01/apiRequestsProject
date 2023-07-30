const searchContainer = document.querySelector('.search-container');

//creating a form to append to dom
// <form action="#" method="get">
//     <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>
const form = document.createElement('form');
form.setAttribute('action', '#');
form.setAttribute('method','get');
//creating a search bar the first input
const inputSearch = document.createElement('input');
inputSearch.setAttribute('type','search');
inputSearch.setAttribute('id','search-input');
inputSearch.setAttribute('class','search-input');
inputSearch.setAttribute('placeholder','Search...');
const submitInput = document.createElement('input');
submitInput.setAttribute('type', 'submit');
submitInput.setAttribute('value', '&#x1F50D');
submitInput.setAttribute('value', 'search-submit');
submitInput.setAttribute('class', 'search-submit');
let html;
//appending the elements
searchContainer.appendChild(form);
form.appendChild(inputSearch);



const gallery = document.getElementById('gallery');
//fetch from api
for(let i = 0; i < 12; i++){
    fetch('https://randomuser.me/api/')
    //first .then promise has to be on same line to 
    //implicitly return response.json() 
        .then(response => response.json())
        .then(data => {
            generateImage(data)
            
        })
        .finally(() => {
            //have to check if the images have\
            // been generated before adding eventListeners
            if(i === 11){
                //listen for event on card class
                //when clicked it should display 
                //the modal of that particular person
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.addEventListener("click", () => {
                        console.log('clicked');
                        displayCard();                           
                    })
                })
            }
        })
}


// generate Image with template
function generateImage(data){
    const person = data.results[0]
    const picture = person.picture.thumbnail;
    const firstName = person.name.first;
    const lastName = person.name.last;
    const email = person.email;
    const city = person.location.city;
    const state = person.location.state;
//inserting placeholder for card with template and beforeend
    html = `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src=${picture} alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${state}</p>
    </div>
    </div>`;
gallery.insertAdjacentHTML('beforeend',html);
}

//displayCard function displays a card when one of them has been clicked
function displayCard(){
    html = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap">name</h3>
                <p class="modal-text">email</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        </div>`;
        const body = document.querySelector('body');
        body.insertAdjacentHTML('beforeend',html);
        const modal = document.querySelector('.modal-container');
        modal.style.display = 'block';        
        const modalCloseButton = document.getElementById('modal-close-btn');
        modalCloseButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
}
const body = document.querySelector('body');
body.insertAdjacentHTML('beforeend',html);
