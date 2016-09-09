var express = require('express');
var app = express();
var mongoose = require('mongoose');
var colors = require('colors');
var telegram = require('telegram-bot-api');
var watson = require('watson-developer-cloud');
var greetings = require('greetings');
var badwordsArray = require('badwords/array');
var TeleBot = require('telebot');
 
//Enter Your API KEY FOR TELEGRAM API
var bot = new TeleBot('ENTER API KEY FOR TELEGRAM');

//Get some random greetings.
var moreGreetings = greetings.all;

//Function to shuffle an array.
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


//Enter Your API KEY FOR TELEGRAM API
var api = new telegram({
        token: 'ENTER API KEY FOR TELEGRAM',
        updates : {
          enabled : true
        }
});

//A way to start the buttons for the API.
bot.on('/Start', msg => {

  let markup = bot.keyboard([
    ['Rock', 'Paper', 'Scissor'],
    ['/Quit']

  ], { resize: true });

  return bot.sendMessage(msg.from.id, 'Ok, lets play Rock Paper Scissors. I have chosen my choice, now choose yours.', { markup });


});

//A way to have a quit button in the code.
bot.on('/Quit', msg => {

  let markup = bot.keyboard([
    ['/Start']

  ], { resize: true });

  return bot.sendMessage(msg.from.id,'You have Quit, you fucking, quitter. Press /Start or type /Start to restart', { markup });


});

//Connecting the bot.
bot.connect();

//On the bot so that it can recieve messages.
api.on('message', function(message){

  var choices1 = ['Rock', 'Paper', 'Scissor'];
  var choices2 = ['rock', 'paper', 'scissor'];
  var choices3 = ['ROCK', 'PAPER', 'SCISSOR'];

  var fullChoice = choices1.concat(choices2);
  var fullestChoice = fullChoice.concat(choices3);

//Shuffle the array.
 var shuffleChoice = shuffleArray(choices1);

var myChoice = shuffleChoice[0]


  //The tests I did for random bugs.
// console.log(myChoice);
// console.log(message.from.id);
// console.log(typeof(message.text));



//================================================================
                          // Greetings //

  //Add your own custom greetings.
    var greets = ['lalalalallalalalal'];

        //Random greetings from NPM.
  var allGreetings = moreGreetings.concat(greets);

//Loop through all of the greetings.
allGreetings.forEach(function(greet){

var greet2 = greet.toLowerCase();

//Check if the greetings match.
if(message.text === greet || message.text === greet2 ){

//Send a message so you can start.
    api.sendMessage({
        chat_id: message.from.id, //Get the message id.
        text: greetings() + ' type or click "/Start" to vs. me in Rock paper scissors.' //Send a random Greeting.

    }, function(err,data){
      if(err){
        console.log(err);
      }else{

  //console.log(util.inspect(data, false, null));

  console.log('IT WORKED');
       }
     });


     }

  });

                       ///Greetings///
//================================================================

                    //Handling Bad Words//
//================================================================
var badRandom = badwordsArray[Math.floor(Math.random() * badwordsArray.length)];

//String to send back to people.
var randomBad = 'Thats not nice.. would you like it if I called you a ' + badRandom + ' ?';

//Capitalizing the first Letter.
function firstLetterCapital(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);

}

var spliceArray = badwordsArray.indexOf('hell');
// console.log(spliceArray);
// // var newBadWord =

badwordsArray.splice(spliceArray);

badwordsArray.forEach(function(bword){

    //Badwords all capital.
var bword2 = firstLetterCapital(bword);

//A text search to see if the bad word even exists in the string.
if(message.text.search(bword) != -1 || message.text.search(bword2) != -1){

  //Sending a message back if a bad word is recieved.
    api.sendMessage({
        chat_id: message.from.id, //Get the message id.
        text: randomBad
    }, function(err,data){
      if(err){
        console.log(err);
      }else{

  //console.log(util.inspect(data, false, null));
  console.log('IT WORKED');
       }
     });
   }


});
                        //Handling Bad Words//
//================================================================


//================================================================
//Starting Tic Tac Toe Game//




//Many of the Starting Calls.
var startingCalls = ['start', 'START', 'Start'];


//Looping through the Starting calls.
startingCalls.forEach(function(start){


//A text search to see if the bad word even exists in the string.
if(message.text === start){


  //Sending a message back if a bad word is recieved.
    api.sendMessage({
        chat_id: message.from.id, //Get the message id.
        text: 'Ok, I already picked my choice, now pick either Rock, Paper, or Scissors...'
    }, function(err,data){
      if(err){
        console.log(err);
      }else{

  console.log('IT WORKED');
       }
     });
   }

});
   //Starting Tic Tac Toe Game//
//================================================================


//===========================================================
        //== Rocket Paper Scissor Choices ==//
choices1.forEach(function(choice){


  if(message.text === choice){

      if(message.text === myChoice){

          api.sendMessage({
              chat_id: message.from.id, //Get the message id.
              text: 'We both picked ' + myChoice + '. I guess its a tie.'
          }, function(err,data){
            if(err){
              console.log(err);
            }else{
        console.log('IT WORKED');
             }
           });

              //Bot Wins.
      }else if (message.text === 'Scissor' && myChoice === 'Rock'){
        //Sending a message back if a bad word is recieved.
          api.sendMessage({
              chat_id: message.from.id, //Get the message id.
              text: 'HAHAHA I WIN. I picked ' + myChoice + ' BITCHASS!!'
          }, function(err,data){
            if(err){
              console.log(err);
            }else{

        //console.log(util.inspect(data, false, null));
        console.log('IT WORKED');
             }
           });


           //Bot looses.
       }else if(message.text === 'Rock' && myChoice === 'Scissor'){


           api.sendMessage({
               chat_id: message.from.id,
               text: 'You won my choice was ' + myChoice
           }, function(err,data){
             if(err){
               console.log(err);
             }else{
         console.log('IT WORKED');
              }
            });

            //I won.
       }else if(message.text === 'Paper' && myChoice === 'Scissor'){

         api.sendMessage({
             chat_id: message.from.id, //Get the message id.
             text: 'Yeah I chose ' + myChoice + ' so Im gonna shred your bitchass!!!'
         }, function(err,data){
           if(err){
             console.log(err);
           }else{

       console.log('IT WORKED');
            }
          });

              //Opponent Wins.
       }else if(message.text === 'Scissor' && myChoice === 'Paper'){

         api.sendMessage({
             chat_id: message.from.id, //Get the message id.
             text: 'Yeah I lost. My choice was ' + myChoice
         }, function(err,data){
           if(err){
             console.log(err);
           }else{
       console.log('IT WORKED');
            }
          });

            //Bot wins.
       }else if(message.text === 'Rock' && myChoice === 'Paper'){
         api.sendMessage({
             chat_id: message.from.id, //Get the message id.
             text: 'YEAHHH I won, I chose ' + myChoice + ' so Im gonna cover your bitchass!!!'
         }, function(err,data){
           if(err){
             console.log(err);
           }else{

       console.log('IT WORKED');
            }
          });

          //Opponent Wins
       }else if(message.text === 'Paper' && myChoice === 'Rock'){
         api.sendMessage({
             chat_id: message.from.id, //Get the message id.
             text: 'Yeah I chose ' + myChoice + ' so you won.'
         }, function(err,data){
           if(err){
             console.log(err);
           }else{
       console.log('IT WORKED');

         }

          });

              //If everthing else fails, this gets sent.
       }else{
         api.sendMessage({
             chat_id: message.from.id, //Get the message id.
             text: 'I couldn\'t process the info. Please select another one.'
         }, function(err,data){
           if(err){
             console.log(err);
           }else{
       console.log('IT WORKED');

         }
       });
      }
    }
 });

  //== Rocket Paper Scissor Choices ==//
 //==========================================================


//===========================================================
    //== Quit Screen ==//

if(message.text === 'Quit'){

  api.sendMessage({
      chat_id: message.from.id, //Get the message id.
      text: 'You have Quit, you fucking, quitter. Press /Start or type /Start to restart'
  }, function(err,data){
    if(err){
      console.log(err);
    }else{
console.log('IT WORKED');

   }
 });
}

});
  //== Quit Screen ==//
//===========================================================


//Test
app.get('/', function(req,res){
  res.send('TEST');
});

app.listen('3000', function(){
  console.log('==============='.blue);
  console.log(' SERVER IS ON'.blue);
  console.log('==============='.blue);
});
