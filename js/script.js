let passwordArray = ["Komu w drogę temu trampki", "Bez pracy nie ma kołaczy", "W marcu jak w garncu", "Stół z powyłamywanymi nogami"];

let randomPassword = Math.floor(Math.random() * passwordArray.length);

let password = passwordArray[randomPassword];
password = password.toUpperCase();
let passLength = password.length;
let hiddenPassword = "";
let numbOfWrongAnswers = 0;
let yes = new Audio("yes.wav");
let no = new Audio("no.wav");

for(let i = 0; i < passLength; i++){
    if(password.charAt(i) === " "){
        hiddenPassword += " ";
    } else{
        hiddenPassword += "-";
    }
}

function showPassword(){
    //łapanie diva board i zmiana jego wewnętrznego HTML
    document.getElementById("board").innerHTML = hiddenPassword;
}

//uruchomienie funkcji po załadowaniu strony
window.onload = start;

let lettersArray = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ż', 'Ź'];

//wygenerowanie alfabetu w divie alphabet
function start(){

    let divsWithLetter = "";

    //w pętli do divów przypisuję nr diva oraz nr zdarzenia
    for(let i = 0; i < 35; i++){
        let element = "let" + i;
        divsWithLetter += "<div class='letter' onclick='check("+ i +")' id='" + element + "'>"+lettersArray[i]+"</div>";
        //litery układam po 7 w rzędzie, co 7-my rząd czyszczę - clearfix
        if((i + 1) % 7 === 0) {
            divsWithLetter += "<div class='clearfix'></div>";
        }
    }
    document.getElementById("alphabet").innerHTML = divsWithLetter;
    showPassword();
}

//funkcja zamieniająca znak o zadanym numerze w łańcuchu
String.prototype.setCharacter = function(place, character){
    if(place > this.length -1) {
        return this.toString();
    } else {
        return this.substr(0, place) + character + this.substr(place + 1);
    }
}

//funkcja sprawdza czy litera została trafiona i ja odpowiednio koloruje
function check(divId){
    let hitLetter = false;
    for(let i = 0; i < passLength; i++){
        if(password.charAt(i) === lettersArray[divId]){
            hiddenPassword = hiddenPassword.setCharacter(i, lettersArray[divId]);
            hitLetter = true;
        }
    }

    //kolorowanie trafionej literki
    if(hitLetter === true){
        yes.play();
        let element = "let" + divId;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        showPassword();
    } else {
        no.play();
        let element = "let" + divId;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");

        //zwiększenie wartości błędnych odpowiedzi
        numbOfWrongAnswers++;
        //zamieniamy obrazek
        let picture = "img/s" + numbOfWrongAnswers+".jpg";
        document.getElementById("gallows").innerHTML = "<img src='" + picture + "'/>";
    }

    //wygrana
    if(password == hiddenPassword){
        document.getElementById("alphabet").innerHTML = "Brawo! Podano prawidłowe hasło: " + password + "<br /><br /><span class='reset' onclick='location.reload()'>JESZCZE RAZ?</span>";
    }

    //przegrana
    if(numbOfWrongAnswers >= 9){
        document.getElementById("alphabet").innerHTML = "Przegrana :(( Prawidłowe hasło to: " + password + "<br /><br /><span class='reset' onclick='location.reload()'>JESZCZE RAZ?</span>";
    }

}