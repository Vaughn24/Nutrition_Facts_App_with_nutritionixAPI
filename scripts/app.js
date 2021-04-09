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



            const food = document.querySelector("#food")
            const serving_size = document.querySelector("#serving-size")
            const calories = document.querySelector("#calories")
            const calories_from_fat = document.querySelector("#calories-from-fat")
            const total_fat = document.querySelector("#total-fat")
            const total_fat_pct = document.querySelector("#total-fat-pct")
            const saturated_fat = document.querySelector("#saturated-fat")
            const saturated_fat_pct = document.querySelector("#saturated-fat-pct")
            const polyunsaturated_fat = document.querySelector("#polyunsaturated-fat")
            const monounsaturated_fat = document.querySelector("#monounsaturated-fat")
            const cholesterol = document.querySelector("#cholesterol")
            const cholesterol_pct = document.querySelector("#cholesterol-pct")
            const sodium = document.querySelector("#sodium")
            const sodium_pct = document.querySelector("#sodium-pct")
            const potassium = document.querySelector("#potassium")
            const potassium_pct = document.querySelector("#potassium-pct")
            const total_carbohydrates = document.querySelector("#total-carbohydrates")
            const total_carbohydrates_pct = document.querySelector("#total-carbohydrates-pct")
            const dietary_fiber = document.querySelector("#dietary-fiber")
            const dietary_fiber_pct = document.querySelector("#dietary-fiber-pct")
            const sugars = document.querySelector("#sugars")
            const protein = document.querySelector("#protein")
            const vitamin_a = document.querySelector("#vitamin-a")
            const vitamin_b = document.querySelector("#vitamin-b")
            const vitamin_c = document.querySelector("#vitamin-c")
            const vitamin_d = document.querySelector("#vitamin-d")
            // const calcium = document.querySelector("#calcium")
            // const iron = document.querySelector("#iron")
            // const potassium = document.querySelector("#potassium")


            food.innerHTML = data.foods[0].food_name;
            serving_size.innerHTML = data.foods[0].serving_weight_grams;
            calories.innerHTML = data.foods[0].nf_calories;

            total_fat.innerHTML = data.foods[0].nf_total_fat;
            // ((APS*100)/65) = %DV
            total_fat_pct.innerHTML = Math.round(((data.foods[0].nf_total_fat*100)/65))


            saturated_fat.innerHTML = data.foods[0].nf_saturated_fat;
            // ((APS*100)/20) = %DV
            saturated_fat_pct.innerHTML = Math.round(((data.foods[0].nf_saturated_fat*100)/20))



            cholesterol.innerHTML = data.foods[0].nf_cholesterol;
            // ((APS*100)/300) = %DV
            cholesterol_pct.innerHTML = Math.round(((data.foods[0].nf_cholesterol*100)/300))

            sodium.innerHTML = data.foods[0].nf_sodium;
            // ((APS*100)/2400) = %DV
            sodium_pct.innerHTML = Math.round(((data.foods[0].nf_sodium*100)/2400))

            try{
                potassium.innerHTML = data.foods[0].full_nutrients[16].value
                // ((APS*100)/3500) = %DV
                potassium_pct.innerHTML = Math.round(((data.foods[0].full_nutrients[16].value*100)/3500))
            } catch(err){
                polyunsaturated_fat.innerHTML = 0;
                potassium_pct.innerHTML = 0;
            }

            total_carbohydrates.innerHTML = data.foods[0].nf_total_carbohydrate

            // ((APS*100)/300) = %DV
            total_carbohydrates_pct.innerHTML = Math.round(((data.foods[0].nf_total_carbohydrate*100)/300));


            dietary_fiber.innerHTML = data.foods[0].nf_dietary_fiber;
            // ((APS*100)/25) = %DV
            dietary_fiber_pct.innerHTML = Math.round(((data.foods[0].nf_dietary_fiber*100)/25))


            sugars.innerHTML = data.foods[0].nf_sugars;
            protein.innerHTML = data.foods[0].nf_protein;

            try{
                polyunsaturated_fat.innerHTML = data.foods[0].full_nutrients[101].value
            } catch(err){
                polyunsaturated_fat.innerHTML = 0;
            }
            try{
                monounsaturated_fat.innerHTML = data.foods[0].full_nutrients[100].value;
            } catch(err){
                monounsaturated_fat.innerHTML = 0;
            }

            vitamin_a.innerHTML = data.foods[0];
            vitamin_b.innerHTML = data.foods[0];
            vitamin_c.innerHTML = data.foods[0];
            vitamin_d.innerHTML = data.foods[0];


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



