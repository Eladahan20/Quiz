import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompletedImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  /* In order to stop generating questions and show the summary screen we need to know when it's over */
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  /*  This is the react way of adding a value to the state array without deleting the previous values */
  /* Using useCallback here is to prevent this function to recreate each time the component renders, no need dependencies as this state updating function is handled by react */
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);
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

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
