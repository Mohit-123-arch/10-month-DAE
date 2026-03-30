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