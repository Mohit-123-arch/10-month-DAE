function checkGame() {

    let gameName = document.getElementById("gameInput").value;

    if (gameName.toLowerCase() === "infiniterunner") {

        console.log("Infinite Runner found!");

        document.getElementById("image1").style.display = "block";

    } else {

        console.log("Game not found");

        document.getElementById("image1").style.display = "none";
    }
}
function checkGame2() {

    let gameName = document.getElementById("gameInput").value;

    if (gameName.toLowerCase() === "helistikes") {

        console.log("Heli Strikes found!");

        document.getElementById("image2").style.display = "block";

    } else {

        console.log("Game not found");

        document.getElementById("image2").style.display = "none";
    }
}