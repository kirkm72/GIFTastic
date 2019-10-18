const topics = ['Fishing', 'Jack Russell', 'Poker', 'Dallas Cowboys', 'Houston Astros'];

function genRand(lower, upper) {
    let rand = (Math.floor(Math.random() * upper + 1));
    if (rand <= lower) {
        console.log("Random# is lower than input. Re-generating");
        genRand(lower, upper);
    }
    return rand;
}

$(document).ready(function () {
    for (let i = 0; i < topics.length; i++) { //loop to create initial buttons shown in DOM as blue
        let el = topics[i];
        let btn = $("<button/>");
        btn.attr("class", "btn btn-primary btnTopic");
        btn.text(el);
        $(".buttonsHolder").append(btn);
    }

    $('.submit').on("click", function (event) { //event listener to submit new buttons shown in DOM as green
        event.preventDefault();
        let btnTag = $(".search").val().trim();
        let btn = $("<button/>");
        btn.attr("class", "btn btn-success btnTopic"); //btn-success in bootstrap renders green
        btn.text(btnTag);
        if (topics.includes(btnTag) === false) { // Prevents duplicates from being added
            topics.push(btnTag);
            //console.log(topics);
            $(".buttonsHolder").append(btn);
            $("#form").get(0).reset(); //native javascript: resets input form after submission
        }

    })

    $(document).on("click", ".btnTopic", function (event) { //This code must be used because the button is not yet created during initial DOM creation.
        event.preventDefault(); //prevent execution
        $(".gifHolder").empty(); // clear previous output
        let value = $(this).text();
        let offset = genRand(1, 20); //generate random number to feed in to API "offset" so that output is randomized
        //console.log(factor);
        $.get("https://api.giphy.com/v1/gifs/search?api_key=2yJcxO2SSW0acd5db0E5RwTgNNGSxIDa&limit=3&rating=g&offset=" + offset + "&q="
            + value, function (data, status) {
                for (let i = 0; i < 3; i++) { //load results in to array
                    let main = $('<div class="row">'); //Set bootstrap row so that gifs can be added in column spacing
                    let gifDiv = $('<div>');
                    let newGif = $("<img>");
                    const stillURL = [];
                    const animaURL = [];
                    stillURL[i] = data.data[i].images.fixed_height_still.url;
                    animaURL[i] = data.data[i].images.fixed_height.url;
                    stillURL[i] = stillURL[i].split('?')[0]; // API returns URL with a ? & truncate URL after the "?"
                    animaURL[i] = animaURL[i].split('?')[0]; // API returns URL with a ? & truncate URL after the "?"
                    newGif.attr('src', stillURL[i]);
                    newGif.attr('gif-still', stillURL[i]);
                    newGif.attr('gif-anima', animaURL[i]);
                    newGif.attr('gif-state', 'still');
                    newGif.attr('height', '350');
                    newGif.addClass('col-md-4 gif'); // in bootstrap columns 3 wide
                    gifDiv.append(newGif);
                    main.append(gifDiv);
                    $('.gifHolder').append(gifDiv);
                }
                $(".gif").on("click", function () { // this event listener needed to be moved within the ".get" scope in order to work
                    let state = '';
                    state = $(this).attr("gif-state");
                    if (state === "still") {
                        $(this).attr('src', $(this).attr('gif-anima'));
                        $(this).attr("gif-state", "animate");
                        state = "animate";
                    } else if (state === "animate") {
                        $(this).attr('src', $(this).attr('gif-still'));
                        $(this).attr("gif-state", "still");
                    }
                });
            });
    });
});
