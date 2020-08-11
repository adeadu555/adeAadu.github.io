var questions = [{
  question: "1. Commonly used data types do not include?",
  choices: ["String", "Boolean", "Alert", "Numbers"],
  correctAnswer: 2
}, {
  question: "2. The condition in an if/else ststement is enclosed within",
  choices: ["Quotes", "curly brackets", "Parenthesis", "Square brackets"],
  correctAnswer: 1
}, {
  question: "3. Arrays in Javascript can be used to store?",
  choices: ["Numbers and strings", "Other Arrays", "Booleans", "All the above"],
  correctAnswer: 3
}, {
  question: "4. A very useful tool used during development and debugging for printing content to the debugger is:?",
  choices: ["Javascript", "Terminal/Bash", "For loops", "Console.log"],
  correctAnswer: 3
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 180;
var t;

$(document).ready(function () {
 
  displayCurrentQuestion();
  $(this).find(".quizOutput").hide();
  $(this).find(".preButton").attr('disabled', 'disabled');

  timedCount();

  $(this).find(".preButton").on("click", function () {

    if (!quizOver) {
      if (currentQuestion == 0) { return false; }

      if (currentQuestion == 1) {
        $(".preButton").attr('disabled', 'disabled');
      }

      currentQuestion--; 
      if (currentQuestion < questions.length) {
        displayCurrentQuestion();

      }
    } else {
      if (viewingAns == 3) { return false; }
      currentQuestion = 0; viewingAns = 3;
      viewResults();
    }
  });
 
  $(this).find(".nextButton").on("click", function () {
    if (!quizOver) {

      var val = $("input[type='radio']:checked").val();

      if (val == undefined) {
        $(document).find(".quizOutput").text("Please select an answer");
        $(document).find(".quizOutput").show();
      }
      else {
        
        $(document).find(".quizOutput").hide();
        if (val == questions[currentQuestion].correctAnswer) {
          correctAnswers++;
        }
        iSelectedAnswer[currentQuestion] = val;

        currentQuestion++;
        if (currentQuestion >= 1) {
          $('.preButton').prop("disabled", false);
        }
        if (currentQuestion < questions.length) {
          displayCurrentQuestion();

        }
        else {
          displayScore();
          $('#iTimeShow').html('Quiz Time Completed!');
          $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
          c = 185;
          $(document).find(".preButton").text("View Answer");
          $(document).find(".nextButton").text("Play Again?");
          quizOver = true;
          return false;

        }
      }

    }
    else { 
      quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
      $(document).find(".nextButton").text("Next Question");
      $(document).find(".preButton").text("Previous Question");
      $(".preButton").attr('disabled', 'disabled');
      resetQuiz();
      viewingAns = 1;
      displayCurrentQuestion();
      hideScore();
    }
  });
});

function timedCount() {
  if (c == 185) {
    return false;
  }

  var hours = parseInt(c / 3600) % 24;
  var minutes = parseInt(c / 60) % 60;
  var seconds = c % 60;
  var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  $('#timer').html(result);

  if (c == 0) {
    displayScore();
    $('#iTimeShow').html('Quiz Time Completed!');
    $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
    c = 185;
    $(document).find(".preButton").text("View Answer");
    $(document).find(".nextButton").text("Play Again?");
    quizOver = true;
    return false;

  }

  c = c - 1;
  t = setTimeout(function () {
    timedCount()
  }, 1000);
}

function displayCurrentQuestion() {

  if (c == 185) { c = 180; timedCount(); }
  
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  
  $(questionClass).text(question);
  
  $(choiceList).find("li").remove();
  var choice;


  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];

    if (iSelectedAnswer[currentQuestion] == i) {
      $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
    } else {
      $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
    }
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore() {
  $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}


function viewResults() {

  if (currentQuestion == 10) { currentQuestion = 0; return false; }
  if (viewingAns == 1) { return false; }

  hideScore();
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  
  $(questionClass).text(question);
  
  $(choiceList).find("li").remove();
  var choice;


  for (i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion].choices[i];

    if (iSelectedAnswer[currentQuestion] == i) {
      if (questions[currentQuestion].correctAnswer == i) {
        $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
      } else {
        $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
      }
    } else {
      if (questions[currentQuestion].correctAnswer == i) {
        $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
      } else {
        $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
      }
    }
  }

  currentQuestion++;

  setTimeout(function () {
    viewResults();
  }, 3000);
}
