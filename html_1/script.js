function checkGame() {

    let gameName = document.getElementById("gameInput").value;

    if (gameName.toLowerCase() === "fortnite") {

        console.log("Fortnite found!");

        document.getElementById("fortniteLink").style.display = "block";

    } else {

        console.log("Game not found");

        document.getElementById("fortniteLink").style.display = "none";

    }
}