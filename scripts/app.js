fetch(
    "https://trackapi.nutritionix.com/v2/search/instant?query=apple",
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