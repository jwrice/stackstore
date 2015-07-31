app.factory('RandomGreetings', function () {

    var getRandomFromArray = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var greetings = [
        "Welcome to our 1337 website!",
        "Here are some Fullstackers.",
        "This person on the left looks cool.",
        "<--- I wish I could be like him.",
        "This website sells people's time."
    ];

    return {
        greetings: greetings,
        getRandomGreeting: function () {
            return getRandomFromArray(greetings);
        }
    };

});
