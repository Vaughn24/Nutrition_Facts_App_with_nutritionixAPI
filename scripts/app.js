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
const vitamin_c = document.querySelector("#vitamin-c")
const calcium = document.querySelector("#calcium")
const iron = document.querySelector("#iron")

const food_quantity_field = document.querySelector("#food-qty")
const search_field = document.querySelector("#search")

var openSearch = false;
var cache_data = null

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function onOpenSearch() {
    openSearch = !openSearch
    if (openSearch) {
        search_field.focus()
    } else {
        search_field.blur()
    }
}

function onBlurSearch() {
    if (openSearch) {
        openSearch = false
        search_field.blur()
    }
}

function getfoodnutrients(search_food) {

    fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
            method: "POST",
            body: JSON.stringify({ query: search_food }),
            headers: {
                "Content-Type": "application/json",
                "x-app-id": "b4da6451",
                "x-app-key": "af3ebc69cbdc0eb1a348bb541fcefcce",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            processData(data, 1)
            cache_data = data
        })
}

function processData(data, multiplier) {
    try {
        food_name = data.foods[0].food_name
        food.innerHTML = capitalizeFirstLetter(food_name);
    }
    catch (err) {
        alert("Sorry, the food entered is not in the database.")
    }

    serving_size.innerHTML = ((data.foods[0].serving_weight_grams)* multiplier).toFixed(1);
    calories.innerHTML = (Math.round(data.foods[0].nf_calories)*multiplier).toFixed(1)


    total_fat.innerHTML = ((Math.round(10 * data.foods[0].nf_total_fat) / 10) * multiplier).toFixed(1);
    // ((APS*100)/65) = %DV
    total_fat_pct.innerHTML = (((data.foods[0].nf_total_fat * 100) / 65)* multiplier).toFixed(1)

    calories_from_fat.innerHTML = (((total_fat.innerHTML) * 9)*multiplier).toFixed(1)

    saturated_fat.innerHTML = (((data.foods[0].nf_saturated_fat))*multiplier).toFixed(1);

    saturated_fat_pct.innerHTML = ((Math.round(((data.foods[0].nf_saturated_fat * 100) / 20)))*multiplier).toFixed(1)



    cholesterol.innerHTML = ((data.foods[0].nf_cholesterol)*multiplier).toFixed(1);
    // ((APS*100)/300) = %DV
    cholesterol_pct.innerHTML = ((Math.round(((data.foods[0].nf_cholesterol * 100) / 300)))*multiplier).toFixed(1)

    sodium.innerHTML = ((Math.round(10 * data.foods[0].nf_sodium) / 10)*multiplier).toFixed(1)
    // ((APS*100)/2400) = %DV
    sodium_pct.innerHTML = ((Math.round(((data.foods[0].nf_sodium * 100) / 2400)))*multiplier).toFixed(1)

    try {
        for (i = 0; i < data.foods[0].full_nutrients.length; i++) {
            counter_nutrient = 0
            if (data.foods[0].full_nutrients[i].attr_id == 306) {
                counter_nutrient = data.foods[0].full_nutrients[i].value

                potassium.innerHTML = ((Math.round(counter_nutrient))*multiplier).toFixed(1)
                potassium_pct.innerHTML = ((Math.round(((counter_nutrient * 100) / 3500)))*multiplier).toFixed(1)

            } else if (counter_nutrient == 0) {
                potassium.innerHTML == 0
                potassium_pct.innerHTML == 0

            }
        }
    } catch (err) {
        potassium.innerHTML = 0;
        potassium_pct.innerHTML = 0;
    }

    total_carbohydrates.innerHTML = ((Math.round(data.foods[0].nf_total_carbohydrate))*multiplier).toFixed(1)

    // ((APS*100)/300) = %DV
    total_carbohydrates_pct.innerHTML = ((Math.round(((data.foods[0].nf_total_carbohydrate * 100) / 300)))*multiplier).toFixed(1)


    dietary_fiber.innerHTML = ((Math.round(10 * data.foods[0].nf_dietary_fiber) / 10)*multiplier).toFixed(1)
    // ((APS*100)/25) = %DV
    dietary_fiber_pct.innerHTML = ((((data.foods[0].nf_dietary_fiber * 100) / 25))*multiplier).toFixed(1)


    sugars.innerHTML = ((Math.round(10 * data.foods[0].nf_sugars) / 10)*multiplier).toFixed(1)
    protein.innerHTML = ((Math.round(10 * data.foods[0].nf_protein) / 10)*multiplier).toFixed(1)

    try {
        for (i = 0; i < data.foods[0].full_nutrients.length; i++) {
            counter_nutrient = 0
            if (data.foods[0].full_nutrients[i].attr_id == 646) {
                counter_nutrient = data.foods[0].full_nutrients[i].value
                polyunsaturated_fat.innerHTML = ((Math.round(10 * counter_nutrient) / 10)*multiplier).toFixed(1)
            } else if (counter_nutrient == 0) {
                polyunsaturated_fat.innerHTML == 0

            }
        }
    } catch (err) {
        polyunsaturated_fat.innerHTML = 0;
    }

    try {
        for (i = 0; i < data.foods[0].full_nutrients.length; i++) {
            counter_nutrient = 0
            if (data.foods[0].full_nutrients[i].attr_id == 645) {
                counter_nutrient = data.foods[0].full_nutrients[i].value
                monounsaturated_fat.innerHTML = ((Math.round(10 * counter_nutrient) / 10)*multiplier).toFixed(1)
            } else if (counter_nutrient == 0) {
                monounsaturated_fat.innerHTML == 0

            }
        }
    } catch (err) {
        monounsaturated_fat.innerHTML = 0;
    }

    try {
        for (i = 0; i < data.foods[0].full_nutrients.length; i++) {
            counter_nutrient = 0
            if (data.foods[0].full_nutrients[i].attr_id == 318) {
                // ((APS*100)/5000)
                counter_nutrient = data.foods[0].full_nutrients[i].value
                vitamin_a.innerHTML = ((Math.round(((counter_nutrient * 100) / 5000)))*multiplier).toFixed(1)
            } else if (counter_nutrient == 0) {
                vitamin_a.innerHTML == 0

            }
        }

    } catch (err) {
        vitamin_a.innerHTML = 0;
    }

    try {
        for (i = 0; i < data.foods[0].full_nutrients.length; i++) {
            counter_nutrient = 0
            if (data.foods[0].full_nutrients[i].attr_id == 401) {
                // ((APS*100)/60) = %DV
                counter_nutrient = data.foods[0].full_nutrients[i].value
                vitamin_c.innerHTML = ((Math.round(((counter_nutrient * 100) / 60)))*multiplier).toFixed(1)
            } else if (counter_nutrient == 0) {
                vitamin_c.innerHTML == 0

            }
        }

    } catch (err) {
        vitamin_c.innerHTML = 0;
    }

    try {
        for (i = 0; i < data.foods[0].full_nutrients.length; i++) {
            counter_nutrient = 0
            if (data.foods[0].full_nutrients[i].attr_id == 301) {

                counter_nutrient = data.foods[0].full_nutrients[i].value
                calcium.innerHTML = ((Math.round(10 * (counter_nutrient / 1300) * 100) / 10)*multiplier).toFixed(1)
            } else if (counter_nutrient == 0) {
                calcium.innerHTML == 0

            }
        }

    } catch (err) {
        calcium.innerHTML = 0;
    }

    try {
        for (i = 0; i < data.foods[0].full_nutrients.length; i++) {
            counter_nutrient = 0
            if (data.foods[0].full_nutrients[i].attr_id == 303) {
                // ((APS*100)/18) = %DV
                counter_nutrient = data.foods[0].full_nutrients[i].value
                iron.innerHTML = ((Math.round(10 * ((counter_nutrient * 100) / 18)) / 10)*multiplier).toFixed(1)
            } else if (counter_nutrient == 0) {
                iron.innerHTML == 0

            }
        }

    } catch (err) {
        iron.innerHTML = 0;
    }


    // IMAGE

    const food_image = document.querySelector("#food-image")
    document.getElementById("food-image").src = data.foods[0].photo.highres;


}


function getfood(search_food) {
    fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${search_food}`,
        {
            headers: {
                "x-app-id": "b4da6451",
                "x-app-key": "af3ebc69cbdc0eb1a348bb541fcefcce",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

        })

}



const input_field = document.querySelector("#search")

input_field.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
        getfoodnutrients(input_field.value)
    }
})

food_quantity_field.addEventListener("change", (event) => {
    let val = event.target.value
    if(val > 0 && !!cache_data){
        processData(cache_data, val)
    }
})



