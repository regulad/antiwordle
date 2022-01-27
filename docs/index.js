let dataCache = null;

function furtherProcess(answerText) {
    let knownLetters = 0;
    
    let possibleMatches = [];
    let answerCharArray = [...answerText.toUpperCase()];

    answerCharArray.forEach(function(char) {
        if (char != '_') knownLetters++;
    });
    
    dataCache.forEach(function(word) {
        let wordCharArray = [...word];
        let chance = 0;
        for (let i = 0; i <= 4; i++) {
            if (answerCharArray[i] == wordCharArray[i]) chance++;
        }
        if (chance == knownLetters) {
            possibleMatches.push(word);
        }
    });
    possibleMatches.forEach(element => 
    $("#answers").append(`<p>Possible answer: ${element}</p>`));
}

$(document).ready(function(){
    // Get value on button click and show alert
    $("#button").click(function(){
        $("#answers").empty();
        let answerText = $("#answer").val();
        if (answerText.length == 5) {
            if (dataCache != null) {
                furtherProcess(answerText);
            } else {
                let request = new XMLHttpRequest();
                request.addEventListener("load", function() {
                    if (request.status == 200) {
                        dataCache = JSON.parse(request.responseText);
                        furtherProcess(answerText);
                    } else {
                        alert(`HTTP ${request.status} raised when fetching answers!`)
                    }
                });
                request.open("GET", "/wordList.json");
                request.send();
            }
        } else {
            alert("Answer is not 5 letters!");
        }
    });
});
