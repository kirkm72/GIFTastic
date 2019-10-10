const topics = ['Fishing', 'Jack Russell', 'Poker', 'Dallas Cowboys', 'Houston Astros'];
let newDiv = $("<div>");
let newGif = $("<img>");
const stillURL = [];
const animaURL = [];

$(document).ready(function () {

    for (let i = 0; i < topics.length; i++) { //loop to create initial buttons
        let el = topics[i];
        let btn = $("<button/>");
        btn.attr("class", "btnTopic");
        btn.text(el);
        $(".buttonsHolder").append(btn);
    }
    $('.submit').on("click", function (event) { //event listener to submit new buttons
        event.preventDefault();
        let btnTag = $(".search").val().trim();
        topics.push(btnTag);
        console.log(topics);
        let btn = $("<button/>");
        btn.attr("class", "btnTopic");
        btn.text(btnTag);
        $(".buttonsHolder").append(btn);
    })

    // $(".btnTopic").on("click", function (event) { //event listener to search
    //     let value = $(this).text();
    //     console.log(value);
    //     $.get('http://api.giphy.com/v1/gifs/search?api_key=2yJcxO2SSW0acd5db0E5RwTgNNGSxIDa&limit=10&rating=g&q=' + value, function (data, status) {
    //         console.log(data);
    //     });
    // })


    $(document).on("click", ".btnTopic", function (event) { //This code must be used because the button is not yet created during initial DOM creation.
        event.preventDefault();
        let value = $(this).text();
        $.get('http://api.giphy.com/v1/gifs/search?api_key=2yJcxO2SSW0acd5db0E5RwTgNNGSxIDa&limit=3&rating=g&q=' + value, function (data, status) {
            //$(".gifHolder").empty();
            for (let i = 0; i < 3; i++) { //load results in to array
                let main = $('<div>');
                let gifDiv = $('<div>');

                stillURL[i] = data.data[i].images.fixed_height_still.url;
                animaURL[i] = data.data[i].images.fixed_height.url;
                console.log('stillURL', stillURL[i]);
                console.log('animaURL', animaURL[i]);
                newGif.attr('src', stillURL[i]);
                newGif.attr('gif-still', stillURL[i]);
                newGif.attr('gif-anima', animaURL[i]);
                newGif.attr('gif-state', 'still');
                newGif.addClass('gif');
                //newDiv.append(newGif);
                gifDiv.append(newGif);
                main.append(gifDiv);

                $('.gifHolder').prepend(main);
                console.log(newGif);
            }

        });
    });

});