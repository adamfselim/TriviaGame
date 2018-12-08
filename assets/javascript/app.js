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
        image: ("assets/images/baconPancakes.jpg")
    }, {
        question: "What is Bender's Middle Name?",
        answer: ["Flexible", "Santo", "Bending", "Steven"],
        correct: "2",
        image: ("assets//images/baby.jpg")
    }, {
        question: "What is the Name of the Amusement Park on the Moon?",
        answer: ["Luna Park", "Mooncity", "Moonsneyland", "Luna City"],
        correct: "0",
        image: ("assets//images/hubble.jpg")
    }, {
        question: "Where is Robot Hell?",
        answer: ["New Mexico", "Colorado", "New Jersey", "Pennsylvania"],
        correct: "2",
        image: ("assets//images/deepThoughts.png")
    }, {
        question: "What is the Name of the Planet Express Janitor? ",
        answer: ["Scruffy", "Fred", "Ralph", "Steven"],
        correct: "0",
        image: ("assets/images/scruffy.png")
    }, {
        question: "Banging your Head Against a wall burns how many calories an hour?",
        answer: ["10", "150", "25", "425"],
        correct: "1",
        image: ("assets//images/bang-head-on-wall.jpg")
    }, {
        question: "What is Lionel Richie's MOST Greatest Song?",
        answer: ["All Night Long", "Deep Into the Night", "Carrabba Fiesta Forever", "Prince, formerly known as The Artist, formerly known as Prince"],
        correct: "0",
        image: ("assets//images/Lionel_Richie.jpg")
    }, {
        question: "What is your quest?",
        answer: ["You seek the Holy Grail", "Blue, No...", "The airspeed of an unladen swallow", "I don't know that!"],
        correct: "2",
        image: ("assets//images/quest.jpeg")
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