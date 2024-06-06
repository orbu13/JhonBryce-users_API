// # Homework
// 1. Create a Page that fetch 10 random users from the Random user api https://randomuser.me/api/
// 2. present the following data in cards: user image, details, email , country
// 3. clicking the country will execute another api request to https://restcountries.com/ with the relevant country
// and present the flag inside the relevant user

const getUser = document.querySelector("#getUser")
getUser.addEventListener("click", function(){
    let randomUsers = []
    for(let i = 0; i < 10; i++){
        fetch('https://randomuser.me/api/')
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            randomUsers.push(data)
            if(randomUsers.length === 10){
                console.log(randomUsers);
                displayUsers()
            }
            console.log(randomUsers);
        })
    }
    
    addSpinner()
    removeSpinner()

    function displayUsers(){
        setTimeout(() => {
            randomUsers.forEach(element => {
                const container = document.querySelector(".container")
                const card = document.createElement("div")
                card.classList.add("card")
                const img = document.createElement("img")
                const name = document.createElement("h2")
                const gender = document.createElement("p")
                const cell = document.createElement("p")
                const locations = document.createElement("p")
                locations.classList.add("location");
                const flagImg = document.createElement("img")
                locations.id = element.results[0].nat
                locations.addEventListener("click", function(){
                    let countryBasedUrl = 'https://flagcdn.com/32x24/'
                    locations.nextElementSibling.src = countryBasedUrl + locations.id.toLowerCase() + ".png"
                    console.log(locations);
                })
                const email = document.createElement("p")
                email.classList.add("email");
                
                img.src = element.results[0].picture.medium
                name.innerText = element.results[0].name.first + " " + element.results[0].name.last
                gender.innerText = element.results[0].email
                cell.innerText = element.results[0].cell
                locations.innerText = element.results[0].location.country + ", " + element.results[0].location.state + ", " + element.results[0].location.city + ", " + element.results[0].location.street.name + ", " + element.results[0].location.postcode
                email.innerText = element.results[0].email
            
        
                card.appendChild(img)
                card.appendChild(name)
                card.appendChild(gender)
                card.appendChild(cell)
                card.appendChild(locations)
                card.appendChild(flagImg)
                card.appendChild(email)
                container.appendChild(card)
    
            });
            
        }, 2500);
    }

})

const removeUser = document.querySelector("#removeUser")
removeUser.addEventListener("click", function(){
    const container = document.querySelector(".container")
    container.innerHTML = " "
})

function addSpinner(){
    let spinnerOverLay = document.createElement("div")
    spinnerOverLay.classList.add("spinnerOverLay")
    let spinnerContainer = document.createElement("div")
    spinnerContainer.classList.add("spinnerContainer")
    spinner = document.createElement("span")

    spinnerContainer.appendChild(spinner)
    spinnerOverLay.appendChild(spinnerContainer)

    let body = document.querySelector("body")
    body.append(spinnerOverLay)
}

function removeSpinner(){
    setTimeout(() => {
        const spinnerOverLay = document.querySelector(".spinnerOverLay");
        if (spinnerOverLay) {
            spinnerOverLay.remove();
        }
    }, 3500);
}