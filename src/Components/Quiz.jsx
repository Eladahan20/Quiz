import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  /* In order to stop generating questions and show the summary screen we need to know when it's over */
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  /*  This is the react way of adding a value to the state array without deleting the previous values */
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

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
  const shuffledArray = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledArray.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledArray.map((answer) => (
            <li key={answer} className="answer">
              {/* This is react way of passing functions with a parameter to invoke immediatly */}
              <button onClick={handleSelectAnswer}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
