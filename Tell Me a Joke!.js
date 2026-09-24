var wifi = require("wifi");
var storage = require("storage");
var dialog = require("dialog");

var URL = "https://official-joke-api.appspot.com/random_joke";
var FILE = "/joke.txt";

function main() {
    if (!wifi.connected()) {
        dialog.error("UR broke ahh aint even got no Wifi!");
        return;
    }

    println("Getting a random Joke...");

    try {
        var result = wifi.httpFetch(URL, {
            method: "GET",
            headers: {
                "User-Agent": "Bruce-ESP32"
            }
        });

        if (!result.ok) {
            println("HTTP Fehler: " + result.status);
            dialog.error("HTTP " + result.status);
            return;
        }

        println("Got an answer unlike u when texting ur gf");

        var data = JSON.parse(result.body);

        var text =
            " RANDOM BRUCE JOKE \n\n" +
            "Kategorie: " + data.type + "\n\n" +
            data.setup + "\n\n" +
            "👉 " + data.punchline + "\n";

        println("");
        println(data.setup);
        println(data.punchline);

        storage.write(FILE, text, "write");

        println("");
        println("Gespeichert: " + FILE);

        dialog.success("Joke Saved");
    } catch (e) {
        println("Fehler: " + e);
        dialog.error("Request Error!");
    }
}

main();
