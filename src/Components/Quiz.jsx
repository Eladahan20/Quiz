import { useState } from 'react';
import QUESTIONS from '../questions';

export default function Quiz() {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([])

    return <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
}