/*** RYSOWANIE KOLA ZAD 9 ***/

document.getElementById('circle_show').onclick = () => {
    let circle_input = document.getElementById('circle_input');
    if(circle_input.value > 100 || circle_input.value < 0 || circle_input.value.length == 0){
        alert("Zła wartość!");
    }else{
            draw(circle_input.value);
    }
}

function draw(radius)
{
    let canvas = document.getElementById('circle_container');
    if (canvas.getContext)
    {
        let ctx = canvas.getContext('2d');
        let X = canvas.width / 2;
        let Y = canvas.height / 2;
        let R = radius;
        ctx.beginPath();
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
    }
}

/*********** **********/

/**** LOTTO ZAD 20 *****/
function Lotto(){

    let selected_numbers = [];
    let winningNumbers = [];

    this.generateWinningNumbers = function (){

        let number = 0;
        for(let i=0; i<6; i++){
            function randomNumber() {return Math.floor(Math.random() * (49-1)) + 1; }
            number = randomNumber();

            //check if there's no repeated number
            while(winningNumbers.includes(number)){
                number = randomNumber();
            }

            winningNumbers[i] = number;
        }

    }



    this.populateNumbersContainer = function(){
        let numbers_container = document.getElementById('lotto_numbers_container');

        for(let i=0; i<49; i++){
            let numberEl = document.createElement('div');
            numberEl.id = i;
            numberEl.innerText = i;
            numbers_container.appendChild(numberEl);

            numberEl.addEventListener('click', function(event){
                if(event.target.classList.contains('selected')){
                    event.target.classList.remove('selected');
                    selected_numbers.splice(selected_numbers.indexOf(event.target.id), 1);
                }else {
                    if(selected_numbers.length < 7) {
                        event.target.classList.add('selected');
                        selected_numbers.push(event.target.id);
                    }
                }
            });
        }
    }

    this.checkIfUserHasWon = function(){
        console.log("Wylosowane: "+winningNumbers);
            let matchingNumbers = [];
            console.log(selected_numbers);
            for(let i=0; i<selected_numbers.length; i++){
                for(let j=0; j<winningNumbers.length; j++){
                    if(selected_numbers[i] == winningNumbers[j]){
                        matchingNumbers.push(selected_numbers[i]);
                        document.getElementById(selected_numbers[i]).classList.remove('selected');
                        document.getElementById(selected_numbers[i]).classList.add('match');
                    }
                }
            }
            alert("Wylosowane liczby: "+winningNumbers+". Trafiłeś "+matchingNumbers.length+"!");
    }
}


function LottoStart(){
    let LottoObj = new Lotto();
    LottoObj.generateWinningNumbers();
    LottoObj.populateNumbersContainer();
    document.getElementById('lotto_check').onclick = () => {
        LottoObj.checkIfUserHasWon();
    }
}

LottoStart();

/**************** ***************/

/**** DATY ZAD 24 ****/
document.getElementById('dates').onclick = () => {

    let date1 = document.getElementById('date1').value, date2 = document.getElementById('date2').value;
    let dataDo = date2, dataOd = date1;


    if(dataDo > dataOd){
        dataOd = date2;
        dataDo = date1;
    }

    //Calculate the difference between the dates in seconds and then divide by seconds in the day (86400000)
    let diff = Math.floor(
        (Date.parse(dataOd) - Date.parse(dataDo)) / 86400000
    );

    console.log(Date.parse(document.getElementById('date2').value));
    console.log(Date.parse(document.getElementById('date1').value));

    if(!isNaN(diff)) {
        alert("Miedzy tymi datami minelo " + diff + " dni");
    }else{
        alert("Podaj daty!");
    }
}

/**** ZEGAR ZAD 23 ****/
let clockEl = document.getElementById('clock');
clockEl.innerHTML = new Date().toLocaleTimeString();
setInterval(() => {
    clockEl.innerHTML = new Date().toLocaleTimeString();
}, 1000)


//next page
//zad 17
const inpt_zad17 = document.getElementById('input_zad17')
const ts = document.querySelector('#tasks')
const wrapper_zad17 = document.getElementById('wrapper_zad17')

//create task
button2.onclick = function() {
    console.log(ts.value)
    
    let str = null;
    switch(ts.value){
        case '1':
            console.log('ok')
            str = firstThree(inpt_zad17.value)
            break;
            case '2':
                str = secondsCharFromEnd(inpt_zad17.value)
                break
                case '3':
                    str = inpt_zad17.value.slice(-4) //wyświetlenie ostatnich 4 znaków
                    break
                    case '4':
                        str = inpt_zad17.value.toLowerCase() //wyświetlenie tekstu złożonego jedynie z małych liter
                        break
                        case '5':
                            str = inpt_zad17.value.toUpperCase()//wyświetlenie tekstu złożonego jedynie z dużych liter
                            break
                            case '6':
                                str = mixCase(inpt_zad17.value)
                                break
                                case '7':
                                    str = removeSpace(inpt_zad17.value)
                                    break
                                    case '8':
                                        str = inpt_zad17.value.replace( /[aeiou]/g, '' )
                                        break
                                        case '9':
                                            str = reverseString(inpt_zad17.value)
                                            break
    }
    console.log(str)
    let txt = document.createElement('p')
    txt.id= ts.value
    txt.innerHTML = str + '<button id="del" >X</button>'
    txt.style = 'margin-left: 20px'
    wrapper_zad17.insertAdjacentElement('beforeEnd', txt)
  };
//delete task
  wrapper_zad17.onclick = function(event){
      let target = event.target
      //console.log(target.id)
      if(target.id == 'del'){
      target.parentNode.remove()
    }
  }
//wyświetlenie trzech pierwszych znaków
function firstThree(str){
    return str.substring(0,3)
}

//wyświetlenie drugiego znaku od końca
function secondsCharFromEnd(str){
return str.charAt(str.length-2)
}

//wyświetlenie tekstu złożonego małych i dużych liter pisanych naprzemiennie
function mixCase(str){
    let new_str = ''
    for(var i = 0; i < str.length; i++){
        if(i%2 == 0){
        new_str+= str.charAt(i).toLowerCase()
        }else{
            new_str+= str.charAt(i).toUpperCase()
        }
    }
    return new_str
}

//wyświetlenie tekstu pozbawionego spacji
function removeSpace(str){
let new_str = ''
for( var i = 0; i<str.length; i++){
    console.log(str)
    str = str.replace(' ', '')
}
return str
}

//wyświetlenie odwróconego tekstu
function reverseString(str){
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); 
    return joinArray; 
}


