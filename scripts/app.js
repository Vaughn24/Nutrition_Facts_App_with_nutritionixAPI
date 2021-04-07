
$('#test1').nutritionLabel();

var search_food = ""

const input_field = document.querySelector("#search")

input_field.addEventListener("keydown", (event) => {
    if(event.keyCode == 13){

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
    else {
        search_food = input_field.value 
    }

})
