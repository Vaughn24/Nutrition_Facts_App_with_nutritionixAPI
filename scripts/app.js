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



            const calories = document.querySelector("#calories")
            const calories_from_fat = document.querySelector("calories-from-fat")
            const total_fat = document.querySelector("#total-fat")
            const saturated_fat = document.querySelector("saturated-fat")
            const polyunsaturated_fat = document.querySelector("#polyunsaturated_fat")
            const monounsaturated_fat = document.querySelector("#monosaturated-fat")
            const cholesterol = document.querySelector("#cholesterol")
            const sodium = document.querySelector("#sodium")
            const sodium_p = document.querySelector("#sodium-p")
            const total_carbohydrates = document.querySelector("#carbohydrates")
            const total_carbohydrates_p = document.querySelector("#carbohydrates-p")
            const dietary_fiber = document.querySelector("#dietary-fiber")
            const dietary_fiber_p = document.querySelector("#dietary-fiber-p")
            const sugars = document.querySelector("#sugars")
            const protein = document.querySelector("#protein")
            const vitamin_a = document.querySelector("#vitamin-a")
            const vitamin_b = document.querySelector("#vitamin-b")
            const vitamin_c = document.querySelector("#vitamin-c")
            const vitamin_d = document.querySelector("#vitamin-d")
            const calcium = document.querySelector("#calcium")
            const iron = document.querySelector("#iron")
            const potassium = document.querySelector("#potassium")


            calories.innerHTML = data.foods[0].nf_calories;
            total_fat.innerHTML = data.foods[0].nf_total_fat;
            saturated_fat


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



