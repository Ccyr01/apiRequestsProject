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
let dataFetched;
let peopleArray = [];
//fetch from api
for(let i = 0; i < 12; i++){
    fetch('https://randomuser.me/api/?nat=us')
    //first .then promise has to be on same line to 
    //implicitly return response.json() 
        .then(response => response.json())
        .then(data => {
            dataFetched = data.results[0];
            // console.log(dataFetched);
            peopleArray.push(dataFetched);
            // console.log(peopleArray);
            generateImage(data)
            
        })
        .catch((error) => {
            console.log(error,'unable to fetch error');
        })
        .finally(() => {
            //have to check if the images have\
            // been generated before adding eventListeners
            if(i === 11){
                //listen for event on card class
                //when clicked it should display 
                //the modal of that particular person
                const cards = document.querySelectorAll('.card');
                
                cards.forEach((card, index) => {
                    
                    card.addEventListener("click", () => {
                        
                        
                        // // console.log(cardImage);
                        // console.log(name+'\n' + city+'\n'+ email +' clicked');
                        displayCard(peopleArray[index]);                           
                    })
                })
            }
        })
}

    const statesInitials = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'Armed Forces Americas': 'AA',
        'Armed Forces Europe': 'AE',
        'Armed Forces Pacific': 'AP',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'District Of Columbia': 'DC',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam': 'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Marshall Islands': 'MH',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Northern Mariana Islands': 'NP',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvania': 'PA',
        'Puerto Rico': 'PR',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'US Virgin Islands': 'VI',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY',
    };


// generate Image with template
function generateImage(data){
    const person = data.results[0]
    const picture = person.picture.thumbnail;
    const firstName = person.name.first;
    const lastName = person.name.last;
    const email = person.email;
    const city = person.location.city;
    const state = person.location.state;
//inserting user html with user info beforeend of gallery
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
let modalContainer = null;
//displayCard function displays a card when one of them has been clicked
function displayCard(person){
    if(modalContainer){
        modalContainer.remove();
    }
    // let name = card.querySelector('.card-name').textContent;
    // let email = card.querySelector(".card-text").textContent; 
    // let city = card.querySelector(".card-text.cap").textContent;
    // let cardImage = card.querySelector('.card-img').src;
    console.log(person);
    let cardImage = person.picture.thumbnail;
    let firstName = person.name.first;
    let lastName = person.name.last;
    let name = `${firstName} ${lastName}`;
    let email = person.email;
    let streetNumber = person.location.street.number;
    let streetName = person.location.street.name;
    let city = person.location.city;
    let state = person.location.state;
    let stateAbbreviated = (state) => {
        let stateCleaned = state.trim();
        return statesInitials[stateCleaned] || "N/A";
    };
    let postCode = person.location.postCode;
    //prevent null from being printed
    if(!postCode) postCode = '';
    let location = `${streetNumber} ${streetName}., ${city}, ${stateAbbreviated(state)} ${postCode}`;
    let dobRegex = /^(\d{4})-(\d{2})-(\d{2}).*$/;
    let dob = person.dob.date;
    let dobObject = dob.match(dobRegex);
    let formattedDOB = `${dobObject[2]}/${dobObject[3]}/${dobObject[1]}`;
    let phoneRegex = /\d+/g;
    let phone = (person.cell).match(phoneRegex)?.join('') || ('');
    let formattedPhone = `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}`
    



    html = `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${cardImage}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${formattedPhone}</p>
                <p class="modal-text">${location}</p>
                <p class="modal-text">Birthday: ${formattedDOB}</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        </div>`;
        const body = document.querySelector('body');
        body.insertAdjacentHTML('beforeend',html);
        modalContainer = document.querySelector('.modal-container');
        modalContainer.style.display = 'block';        
        const modalCloseButton = document.getElementById('modal-close-btn');
        modalCloseButton.addEventListener('click', () => {
            modalContainer.remove();
        });
}
const body = document.querySelector('body');
body.insertAdjacentHTML('beforeend',html);
