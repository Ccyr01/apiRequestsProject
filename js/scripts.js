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

//appending the elements
searchContainer.appendChild(form);
form.appendChild(inputSearch);

const gallery = document.getElementById('gallery');
//fetch from api
fetch('https://randomuser.me/api/')
//first .then promise has to be on same line to 
//implicitly return response.json() 
    .then(response => response.json())
    .then(data => generateImage(data.results));


// generate Image with template
function generateImage(data){
//inserting placeholder for card with template and beforeend
    let html = `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src=${data.picture} alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>
    </div>`;
gallery.insertAdjacentHTML('beforeend',html);
}

// html = `<div class="modal-container">
// <div class="modal">
//     <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//     <div class="modal-info-container">
//         <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//         <h3 id="name" class="modal-name cap">name</h3>
//         <p class="modal-text">email</p>
//         <p class="modal-text cap">city</p>
//         <hr>
//         <p class="modal-text">(555) 555-5555</p>
//         <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//         <p class="modal-text">Birthday: 10/21/2015</p>
//     </div>
// </div>

// <div class="modal-btn-container">
//     <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//     <button type="button" id="modal-next" class="modal-next btn">Next</button>
// </div>
// </div>`;
const body = document.querySelector('body');
// body.insertAdjacentHTML('beforeend',html);
