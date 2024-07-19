//Elementos a guradar en Cache
//Email del usuario que iniciar
//Nombre si se requiere
//Las preguntas con sus respuestas
//Pregunta actual
function Login()
{
    var storedUser = localStorage.getItem('currentName');
    console.log(storedUser);
    if (storedUser!="")
    {
    var cache = sessionStorage
    cache.clear();
    cache.setItem('questionsArray', JSON.stringify(PrepareQuestionnaire()));
    cache.setItem("idQuestion", 1); // revisar si debe iniciar con cero
    cache.setItem("minQuestion", 1);
    cache.setItem("maxQuestion", 11);
    DisplayQuestion();
    }
}


// This functions is used to update the answers to each question
function updateArray()
{
    
    var succes = 1;
    var cache = sessionStorage
    var questionsArray = JSON.parse(cache.getItem('questionsArray'));  
    var idQuestion = parseInt(cache.getItem("idQuestion"));

    var divA = document.getElementById("divA");
    var divB = document.getElementById("divB");
    var divC = document.getElementById("divC");
    var divD = document.getElementById("divD");
    
    

    questionsArray[idQuestion-1].A = divA.parentNode.title
    questionsArray[idQuestion-1].B = divB.parentNode.title
    questionsArray[idQuestion-1].C = divC.parentNode.title
    questionsArray[idQuestion-1].D = divD.parentNode.title

    if ( parseInt(questionsArray[idQuestion-1].A) == 0
            || parseInt(questionsArray[idQuestion-1].B) == 0
            || parseInt(questionsArray[idQuestion-1].C) == 0
            || parseInt(questionsArray[idQuestion-1].D) == 0)
            {
                var divMessages = document.getElementById("messagesdiv");
                divMessages.innerHTML="All the options must be added to the boxes - Question: " + idQuestion
                var btn = document.getElementById("btnqtn" + idQuestion)
                btn.style.backgroundColor="#FF467F";
                succes=0;
            }else
            {
                var btn = document.getElementById("btnqtn" + idQuestion)
                btn.style.backgroundColor="#15424F";
            }
    
    cache.setItem('questionsArray', JSON.stringify(questionsArray));
    
    return succes;
}

// This function is used to validate it the user answered all the questions
function ValidateArray()
{
    //Si estamos en la pregunta 11 validamos y mndamos mensaje de las preguntas que falta contestar
    var succes=1;
    var cache = sessionStorage;
    var questionsArray = JSON.parse(cache.getItem('questionsArray'));  
    var message ="Please answer the question(s): ";
    var questions ="";
    var idQuestion = parseInt(cache.getItem("idQuestion"));
    for (i=0; i<questionsArray.length; i++)
    {
        console.log(questionsArray[i].A);
        
        if (parseInt(questionsArray[i].A) == 0
        || parseInt(questionsArray[i].B) == 0
        || parseInt(questionsArray[i].C) == 0
        || parseInt(questionsArray[i].D) == 0)
        {
            if (questions =="")
                questions = (i+1)
            else
                questions = questions + ", " + (i+1)
            succes=0;
        }
    }

    var idQuestion = parseInt(cache.getItem("idQuestion"));
    //si todas las pregutas están contestadas entonces cambiamos
    if (parseInt(idQuestion)== 11 && succes==0) // si estamos en la pregunta 11 y hay errores pasamos el mensaje
    {
        var divMessages = document.getElementById("messagesdiv");
            divMessages.innerHTML= message + questions;
    } 
return succes;

}


// This functions clear all variables created during the user exectuion 
function LogOut()
{
    cache.clear();
}

//This function is used to navigate in the different questions
function GoToQuestion(question)
{
    if (updateArray()==1)
    {
        var cache = sessionStorage
        var idQuestion = parseInt(question);
        cache.setItem("idQuestion",idQuestion)
        DisplayQuestion();    
    }
}



// This functions is used move to the next questions according to the navigation buttons
function MoveNext()
{
    if (parseInt(updateArray())==1)
    {
        if (ValidateArray()== 1)
        {
            alert('All the questions were answered.... It is time to see the final result!');
            SeeResults();
        };
        

        var cache = sessionStorage
        var idQuestion = parseInt(cache.getItem("idQuestion"));
        var minQuestion = parseInt(cache.getItem("minQuestion"));
        var maxQuestion = parseInt(cache.getItem("maxQuestion"));
        
        if (idQuestion >=minQuestion && idQuestion <maxQuestion)
        {
            idQuestion = idQuestion+1;
            cache.setItem("idQuestion",idQuestion)
            DisplayQuestion();
        }
       
    }
}

// This functions is used to display the results
function SeeResults()
{
    window.open("results.html")
    window.close("questionnaire.html")
}


// This functions is used to move back in the questions according to the navigation buttons
function MoveBack()
{
    if (parseInt(updateArray())==1)
    {
        var cache = sessionStorage
        var idQuestion = parseInt(cache.getItem("idQuestion"));
        var minQuestion = parseInt(cache.getItem("minQuestion"));
        var maxQuestion = parseInt(cache.getItem("maxQuestion"));
        if (idQuestion > minQuestion && idQuestion <=maxQuestion)
        {
            idQuestion = idQuestion-1;
            cache.setItem("idQuestion",idQuestion)
            DisplayQuestion();
        }
    }
}

// This functions is used to display the question and the answers
function DisplayQuestion()
{
    var divMessages = document.getElementById("messagesdiv");
    divMessages.innerHTML=""
    var cache = sessionStorage
    var idQuestion = parseInt(cache.getItem("idQuestion"));
    var minQuestion = parseInt(cache.getItem("minQuestion"));
    var maxQuestion = parseInt(cache.getItem("maxQuestion"));
    if (idQuestion >= minQuestion && idQuestion <=maxQuestion)
    {
        var questionsArray = JSON.parse(cache.getItem('questionsArray'));
        lblQuestion = document.getElementById("lblQuestion").innerHTML= questionsArray[idQuestion-1].questionID + " " + questionsArray[idQuestion-1].question;
        divA = document.getElementById("divA");
       
        divA.innerHTML= questionsArray[idQuestion-1].OptionA;
        divB = document.getElementById("divB");
        divB.innerHTML= questionsArray[idQuestion-1].OptionB;
        divC = document.getElementById("divC");
        divC.innerHTML= questionsArray[idQuestion-1].OptionC;
        divD = document.getElementById("divD");
        divD.innerHTML= questionsArray[idQuestion-1].OptionD;

        SetOptionPosition(divA,questionsArray[idQuestion-1].A)
        SetOptionPosition(divB,questionsArray[idQuestion-1].B)
        SetOptionPosition(divC,questionsArray[idQuestion-1].C)
        SetOptionPosition(divD,questionsArray[idQuestion-1].D)


        //divFour =document.getElementById("four");
        //divFour.appendChild(divC);
    }

}

// This functions is used to assing the options in the right div accorind to the user answers
function SetOptionPosition(divtemp, divParent)
{
    switch (parseInt(divParent))
    {
        case 0:
            document.getElementById("left").appendChild(divtemp)
            break;
        case 1:
            document.getElementById("one").appendChild(divtemp)
            break;
        case 2:
            document.getElementById("two").appendChild(divtemp)
            break;
        case 3:
            document.getElementById("three").appendChild(divtemp)
            break;
        case 4:
            document.getElementById("four").appendChild(divtemp)
            break;

    }
}


// This functions is used to enable the drag and drop
function DragDrop()
{
    let lists = document.getElementsByClassName("list");
    let oneBox = document.getElementById("one");
    let twoBox = document.getElementById("two");
    let threeBox = document.getElementById("three");
    let fourBox = document.getElementById("four");
    let leftBox = document.getElementById("left");
    for(list of lists)
    {
        list.addEventListener("dragstart",function(e){
            let selected = e.target;
            
            leftBox.addEventListener("dragover", function(e){
                e.preventDefault();
            });

            leftBox.addEventListener("drop", function(e){
                leftBox.appendChild(selected);
                selected=null;
            });


            oneBox.addEventListener("dragover", function(e){
                e.preventDefault();
            });

            oneBox.addEventListener("drop", function(e){
                if (oneBox.childElementCount === 0)
                {
                    
                    oneBox.appendChild(selected);
                }
                selected=null;
            });
            
            twoBox.addEventListener("dragover", function(e){
                e.preventDefault();
            });

            twoBox.addEventListener("drop", function(e){
                if (twoBox.childElementCount === 0)
                    twoBox.appendChild(selected);
                selected=null;
            });

            threeBox.addEventListener("dragover", function(e){
                e.preventDefault();
            });

            threeBox.addEventListener("drop", function(e){
                if (threeBox.childElementCount === 0)
                    threeBox.appendChild(selected);
                selected=null;
            });

            fourBox.addEventListener("dragover", function(e){
                e.preventDefault();
            });

            fourBox.addEventListener("drop", function(e){
                if (fourBox.childElementCount === 0)
                    fourBox.appendChild(selected);
                selected=null;
            });

        
        })  
    }
}

// This functions is used to populate and display the results
function DisplayResults()
{
    var cache = sessionStorage
    var questionsArray = JSON.parse(cache.getItem('questionsArray'));  
    var totalA = 0;
    var totalB = 0;
    var totalC = 0;
    var totalD = 0;

    var table = document.getElementById("myTable");

    // Limpiar la tabla antes de añadir nuevas filas
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    // Create rows and columns
    for (var i = 0; i <= 10; i++) {
      // Create a new row
      var row = table.insertRow();

        var cellQuestion = row.insertCell();
        cellQuestion.innerHTML=questionsArray[i].questionID
        var cellA = row.insertCell();
        totalA = parseInt(totalA) + parseInt(questionsArray[i].A);
        cellA.innerHTML=questionsArray[i].A
        var cellB = row.insertCell();
        totalB = parseInt(totalB) + parseInt(questionsArray[i].B);
        cellB.innerHTML=questionsArray[i].B
        var cellC = row.insertCell();
        totalC = parseInt(totalC) + parseInt(questionsArray[i].C);
        cellC.innerHTML=questionsArray[i].C
        var cellD = row.insertCell();
        totalD = parseInt(totalD) + parseInt(questionsArray[i].D);
        cellD.innerHTML=questionsArray[i].D
        // Insert cells into the row
        //var cell = row.insertCell();
        // Add some content to the cell
        //cell.innerHTML = "Row " + (i + 1) + ", Column " + (j + 1);
      }

      var totals = {
        'Orange': parseInt(totalA),
        'Green': parseInt(totalB),
        'Blue': parseInt(totalC),
        'Gold': parseInt(totalD)
    };

    var sortedTotals = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    var topColors = [sortedTotals[0][0], sortedTotals[1][0]];
    console.log(topColors);



      var row = table.insertRow();
      var cellTotal = row.insertCell();
      cellTotal.innerHTML="TOTAL"
      
    var cellTotalA = row.insertCell();
    if (topColors[0] == 'Orange' || topColors[1] == 'Orange')
        cellTotalA.innerHTML="<strong>" + totalA + "</strong>";
    else
        cellTotalA.innerHTML=totalA

    var cellTotalB = row.insertCell();
    if (topColors[0] == 'Green' || topColors[1] == 'Green')
        cellTotalB.innerHTML="<strong>" + totalB + "</strong>";
    else
        cellTotalB.innerHTML=totalB

    var cellTotalC = row.insertCell();
    if (topColors[0] == 'Blue' || topColors[1] == 'Blue')
        cellTotalC.innerHTML="<strong>" + totalC + "</strong>";
    else
        cellTotalC.innerHTML=totalC

    var cellTotalD = row.insertCell();

    if (topColors[0] == 'Gold' || topColors[1] == 'Gold')
        cellTotalD.innerHTML="<strong>" + totalD + "</strong>";
    else
        cellTotalD.innerHTML=totalD

    



}

// This functions is used to display the colors according the test response
function showColorResults() {
    DisplayResults();

    var table = document.getElementById("myTable");
    var lastRow = table.rows[table.rows.length - 1];
    var totals = {
        'Orange': parseInt(lastRow.cells[1].innerHTML),
        'Green': parseInt(lastRow.cells[2].innerHTML),
        'Blue': parseInt(lastRow.cells[3].innerHTML),
        'Gold': parseInt(lastRow.cells[4].innerHTML)
    };

    var sortedTotals = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    var topColors = [sortedTotals[0][0], sortedTotals[1][0]];

    // Aquí necesitas el contenido HTML de las páginas de colores
    var colorContent = {
        'Orange': `<section class="orange-section">
        <div class="orange-div">
          <div>
            <div class="orange-color"><h2>  Are you…</h2> <h1>Orange?</h1></div>
            <br/>
            <h4>    Witty…Charming…Spontaneous?   <br/>  <br/>  
                    Impulsive…Generous…Impactful?   <br/>  <br/>   
                    Optimistic…Eager…Bold?   <br/>   <br/>         
                    Physical…Immediate…Courageous?  </h4>
          </div>
          <br/><br/><br/>
          <div>
              <h2>At school… <br/></h2>
              <p> I learn by doing and experiencing, rather than by listening and reading.
                  I like being physically involved in the learning process and am motivated by my. 
                  own natural competitive self and sense of fun.
                  I am a natural performer.
                  I like doing tasks that allow me to be independent and free
              </p>
          </div>
          
      </div>
      </section>`, // Reemplaza con el contenido real
        
        'Green': `<section class="green-section">
        <div class="green-div">
          <div>
            <div class="green-color"><h2>  Are you…</h2> <h1>Green?</h1></div>
            <br/>
            <h4>    Analytical…Global…Conceptual?   <br/>  <br/>  
                Cool…Calm…Collected?   <br/>  <br/>   
                Inventive…Logical…Problem Solver?   <br/>   <br/>         
                Abstract…Creative…Investigative?  </h4>
          </div>
          <br/><br/><br/>
          <div>
              <h2>At school… <br/></h2>
              <p> I am conceptual and am an independent thinker.
                For me, work is play.
                I am drawn to constant challenge.
                I like to develop models and explore ideas
              </p>
          </div>
          
      </div>
      </section>`,
        
        'Blue': ` <section class="blue-section">
        <div class="blue-div">
          <div>
            <div class="blue-color"><h2>  Are you…</h2> <h1>Blue?</h1></div>
            <br/>
            <h4>    Enthusiastic…Sympathetic…Personal?   <br/>  <br/>  
                    Warm…Communicative…Compassionate?   <br/>  <br/>   
                    Idealistic…Spiritual…Sincere?   <br/>   <br/>         
                    Peaceful…Flexible…Imaginative?  </h4>
          </div>
          <br/><br/><br/>
          <div>
              <h2>At school… <br/></h2>
              <p>  I have a strong desire to be a role model for my classmates.
                I am skilled at motivating and interacting with others – I make friends easily 
                and like having friends.
                I respond well to encouragement rather than competition.
                I like being artistic, communicating with people, and helping people
              </p>
          </div>
          
      </div>
      </section>`,
        
        'Gold': `<section class="gold-section">
        <div class="gold-div">
          <div>
            <div class="gold-color"><h2>  Are you…</h2> <h1>Gold?</h1></div>
            <br/>
            <h4>    Loyal…Dependable…Prepared?  <br/>  <br/>  
                Thorough…Sensible…Punctual?   <br/>  <br/>   
                Faithful…Stable…Organized?   <br/>   <br/>         
                Caring…Concerned…Helper?  </h4>
          </div>
          <br/><br/><br/>
          <div>
              <h2>At school… <br/></h2>
              <p>  I am stable and organized.
                I am detailed oriented and predictable.
                I believe that work comes before play, even if I must work overtime to 
                complete the job.
                I understand and respect authority and am comfortable with how school 
                goes 
              </p>
          </div>
          
      </div>
      </section>`
    };

    // Abrir una nueva página
    var resultPage = window.open('', '_blank');
    resultPage.document.write('<html lang="en-CA"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="style.css"><title>Colors</title></head><body>');
    resultPage.document.write(colorContent[topColors[0]]); // Insertar el contenido del primer color
    resultPage.document.write(colorContent[topColors[1]]); // Insertar el contenido del segundo color
    resultPage.document.write('<br><center><button id="btn-test" onclick="closePage()">Close</button></center><br><script>function closePage() {  window.close();}</script></body></html>');
}



//Prepare all the questions and set the answers to 0 for all options
function PrepareQuestionnaire()
{

    for (i=1;i<=11;i++)
    {
        var btn = document.getElementById("btnqtn" + i)
        //btn.style.backgroundColor="lightcoral";
    }

    var questionsArray = [
        {
            questionID: 1,
            question: " When I make decisions:",
            OptionA: "I do it quickly and go with the first impressions.",
            A: 0,
            OptionB: "I think about it, consider the options and then decide.",
            B: 0,
            OptionC: "I listen to my feelings and consider how my decisions will affect others.",
            C: 0,
            OptionD: "I take it seriously and always try to make the right decision",
            D: 0
        },
        {
            questionID: 2,
            question: " The best way for others to show me they care about me is to:",
            OptionA: "Do fun things with me.",
            A: 0,
            OptionB: "Give me space to be myself.",
            B: 0,
            OptionC: "Spend time with me doing whatever.",
            C: 0,
            OptionD: "Do what I want to do; not let me down or go back on their word.",
            D: 0
        },
        {
            questionID: 3,
            question: " When I'm with my friends, I like to provide:",
            OptionA: "The excitement; the fun; the jokes.",
            A: 0,
            OptionB: "Questions; answers; a logical way of looking at things.",
            B: 0,
            OptionC: "Concern for others; a lot of caring.",
            C: 0,
            OptionD: "The planning; a sense of security; a good standard.",
            D: 0
        },
        {
            questionID: 4,
            question: " I like to:",
            OptionA: "Act on a moment's notice; do risky things.",
            A: 0,
            OptionB: "Provide answers or give thought to people's questions.",
            B: 0,
            OptionC: "Help maintain a sense of harmony and togetherness.",
            C: 0,
            OptionD: "Be responsible, dependable, and helpful to others.",
            D: 0
        },
        {
            questionID: 5,
            question: " One thing I am really good at is:",
            OptionA: "Acting courageously.",
            A: 0,
            OptionB: "Thinking.",
            B: 0,
            OptionC: "Being sensitive.",
            C: 0,
            OptionD: "Organizing.",
            D: 0
        },
        {
            questionID: 6,
            question: " Friends who know me best would say that I am",
            OptionA: "Competitive",
            A: 0,
            OptionB: "Reserved, thoughtful.",
            B: 0,
            OptionC: "Emotional, friendly.",
            C: 0,
            OptionD: "Neat, prepared.",
            D: 0
        },
        {
            questionID: 7,
            question: " My basic approach to life is:",
            OptionA: "To take one day at a time and have fun.",
            A: 0,
            OptionB: "To figure out what life is all about.",
            B: 0,
            OptionC: "To help others and be happy and succeed.",
            C: 0,
            OptionD: "To plan for the future and make it as good as possible.",
            D: 0
        },
        {
            questionID: 8,
            question: " When I am feeling discouraged or “down in the dumps”:",
            OptionA: "I often become rude, mad, or sometimes even mean.",
            A: 0,
            OptionB: "I withdraw, don't talk very much, and try to think my way out of the problem.",
            B: 0,
            OptionC: "I feel emotional, am sad, and usually like to talk it over with someone close to me.",
            C: 0,
            OptionD: "I try to figure out what's causing the problem and fix it.",
            D: 0
        },
        {
            questionID: 9,
            question: " I feel good about myself when:",
            OptionA: "OptiI can do things that are difficult.",
            A: 0,
            OptionB: "I can solve problems or figure things out.",
            B: 0,
            OptionC: "I can help other people.",
            C: 0,
            OptionD: "I am appreciated or rewarded for things I do.",
            D: 0
        },
        {
            questionID: 10,
            question: " Teachers at school who saw me when I wasn not on my best behavior might describe me as:",
            OptionA: "Rowdy or a little wild.",
            A: 0,
            OptionB: "Arrogant.",
            B: 0,
            OptionC: "Talkative.",
            C: 0,
            OptionD: "Someone who wants things my way; dominant; worrying.",
            D: 0
        },
        {
            questionID: 11,
            question: " Teachers at school (who like me and in whose class I do pretty well) would probably describe me as",
            OptionA: "Charming, a natural leader, clever, someone who is fun to have around.",
            A: 0,
            OptionB: "Thoughtful, someone who has good answers, someone who likes to figure out problems.",
            B: 0,
            OptionC: "Nice, friendly, someone who gets along with other students and is helpful to the teacher and others.",
            C: 0,
            OptionD: "Neat, organized, prepared, someone who does assignments and is a good student. ",
            D: 0
        }
    ];
 return questionsArray;

}


//login used to validate the user
function getUsernameAndPassword() {
    username = $('#user').val();
    password = $('#password').val(); 
    validateLogin(username, password);
}


//Function requested to validate the authentification
function validateLogin(username, password) {
    
    var find=false;

    if (username.trim() === "" || password.trim() === "") {
        var message = $('#message').html("sorry, The username and password can not be empty");
    } else {
        var inputUsername = $('#user').val();
        var inputPassword = $('#password').val();
        
        // Get the total number of stored users
        var totalUsers = parseInt(localStorage.getItem('counter')) || 0;
        
        // Iterate over the stored users
        for (var i = 0; i < totalUsers; i++) {
            // Get the data for the current user
            var storedData = JSON.parse(localStorage.getItem('data' + i));
        
            // Check if the data exists and if the username and password match
            if (storedData && inputUsername === storedData.userName && inputPassword === storedData.password) {
                alert('Welcome ' + storedData.userName);
               find = true;
                nextPage = "index.html";
                window.open(nextPage);
                // window.close(this);
                break; 
            }
        }
        
        // If the loop ends without finding a match, show an error message
        if (!find) {
            alert('Username or password invalid');
        }
    }
}

//This function generates a random password
function generatePassword() {
    // List of possible characters for the password
    var possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Desired length of the password
    var passwordLength = 8;

    // Variable to store the generated password
    var generatedPassword = "";

    // Generate the random password
    for (var i = 0; i < passwordLength; i++) {
        var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        generatedPassword += randomCharacter;
    }

    // Display the generated password in the password input field
    var generatedPassword=$('#passwordGenerated').val(generatedPassword);
}


function ShowRegister(){
    $(".register").toggle();
}


//Function used to register a new user
function registerNewUser(){
    // Get the current value of 'i' from localStorage
    var storedCounter = localStorage.getItem('counter');
    // Convert the value to a number or set it to 0 if it's not valid
    var i = parseInt(storedCounter) || 0;
    var nameLogin = $('#nName').val();
    var newUsername = $('#nUsername').val();
    var newPassword = $('#passwordGenerated').val();
   if  (userNameValidation(newUsername)){
       alert("sorry, this username already exits")
   }else{
       var data = {
           name: nameLogin,
           userName: newUsername,
           password: newPassword
       };
       
       // Use the current value of 'i' as part of the key in localStorage
       localStorage.setItem("data" + i, JSON.stringify(data));
       
       // Increment 'i' for the next time
       i++;
       
       // Save the new value of 'i' in localStorage
       localStorage.setItem('counter', i);
      
      alert("User created successfully")
      $('#nName').val("");
      $('#nUsername').val("")
      $('#passwordGenerated').val("")
   
   }
}
   
//Validation of the user name   
   function userNameValidation(username){
   
       var inputUsername = username;
      
       
       // Get the total number of stored users
       var totalUsers = parseInt(localStorage.getItem('counter')) || 0;
       
       // Iterate over the stored users
       for (var i = 0; i < totalUsers; i++) {
           // Get the data for the current user
           var storedData = JSON.parse(localStorage.getItem('data' + i));
       
           // Check if the data exists and if the username matches
           if (storedData && inputUsername === storedData.userName) {
             return true;
             
           }
       }
       return false;
   }
   
//This button is used to activate or not when the user is logged
   function activateButton(){
   
       if (username.trim() === "" || password.trim() === "") {
           $('#btn-form').prop("disabled", true);
          
       }else{
   
           $('#btn-form').prop("disabled", false);
       }
   }