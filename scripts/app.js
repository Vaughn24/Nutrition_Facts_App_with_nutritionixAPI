function getfoodnutrients(search_food){

    fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
        method : "POST",
        body : JSON.stringify({query : search_food}),
        headers: {
        "Content-Type": "application/json", 
        "x-app-id": "f4b3ec1a",
        "x-app-key": "63ee9abe0afb08659336e8666e5ffb86",
        },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })


}


function getfood(search_food){
    fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${search_food}`,
        {
        headers: {
        "x-app-id": "f4b3ec1a",
        "x-app-key": "63ee9abe0afb08659336e8666e5ffb86",
        },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

}



const input_field = document.querySelector("#search")

input_field.addEventListener("keydown", (event) => {
    if(event.keyCode == 13){
        getfoodnutrients(input_field.value)


    }

})
