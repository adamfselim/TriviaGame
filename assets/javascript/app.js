$(document).ready(function () {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; 
    var answered = false; 
    var correct;
    var triviaGame = [{
        question: "What Year was Fry Frozen ?",
        answer: ["2005", "2001", "1990", "1999"],
        correct: "3",
        image: ("assets/images/FrozenFry.png")
    }, {
        question: "What is Bender's Middle Name?",
        answer: ["Flexible", "Santo", "Bending", "Steven"],
        correct: "2",
        image: ("assets//images/bender.jpg")
    }, {
        question: "What is the Name of the Amusement Park on the Moon?",
        answer: ["Luna Park", "Mooncity", "Moonsneyland", "Luna City"],
        correct: "0",
        image: ("assets//images/LunaPark.png")
    }, {
        question: "Where is Robot Hell?",
        answer: ["New Mexico", "Colorado", "New Jersey", "Pennsylvania"],
        correct: "2",
        image: ("assets//images/RobotHell.jpg")
    }, {
        question: "What is the Name of the Planet Express Janitor? ",
        answer: ["Scruffy", "Fred", "Ralph", "Steven"],
        correct: "0",
        image: ("assets/images/scruffy.png")
    }, {
        question: "What is the Instrument Fry Plays?",
        answer: ["Piano", "Mecha-Saxaphone", "Holophoner", "Violin"],
        correct: "2",
        image: ("assets//images/FryHolophoner.jpg")
    }, {
        question: "What is Fry's Pin Number?",
        answer: ["1077", "1066", "2582", "1234"],
        correct: "0",
        image: ("assets//images/FryMoney.jpg")
    }, {
        question: "When Nixon Gives Everyone 300 Dollars What Does Fry Spend His Money On?",
        answer: ["A Hovercar", "A New Jacket", "Coffee", "New Shoes"],
        correct: "2",
        image: ("assets//images/FryMoney.jpeg")
    }];

    


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; 
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true;
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; 
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); 
        indexQandA++; 
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000);
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});