import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  /* In order to stop generating questions and show the summary screen we need to know when it's over */
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  /*  This is the react way of adding a value to the state array without deleting the previous values */
  /* Using useCallback here is to prevent this function to recreate each time the component renders, no need dependencies as this state updating function is handled by react */
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  /* Using useCallback here is to prevent this function to recreate each time the component renders, need dependency of itself because it depends on user input */
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  /*  We want to shuffle the answers, so we create a new array and randomise its answers - we don't want to override the original answers array because the first answer is always the right one */
  /* It must be at the bottom so it will execute only if we have answers to display, if not, the return statement above will execute */
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="question">
        {/* I assigned key to the component so react will re render it everytime it changes to launch the timer again */}
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;

            let cssClass = "";
            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                {/* This is react way of passing functions with a parameter to invoke immediatly */}
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
