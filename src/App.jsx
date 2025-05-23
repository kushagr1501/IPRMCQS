import React, { useEffect, useState } from "react";
import questionsData from "./data/lse_mcqs.json";
import QuestionCard from "./QuestionCard";


import ReactGA from "react-ga4";
ReactGA.initialize('G-5R65HLLNLP');
export default function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    const shuffledQuestions = questionsData.map((q) => {
      const optionsArray = Object.entries(q.options).map(([label, text]) => ({
        label,
        text,
        isCorrect: label === q.correct_option,
      }));

      const shuffled = optionsArray.sort(() => 0.5 - Math.random());
      const newOptions = {};
      const labels = ["A", "B", "C", "D"];
      let newCorrect = "";

      shuffled.forEach((opt, idx) => {
        const newLabel = labels[idx];
        newOptions[newLabel] = opt.text;
        if (opt.isCorrect) newCorrect = newLabel;
      });

      return {
        ...q,
        options: newOptions,
        correct_option: newCorrect,
      };
    });
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (isCorrect) => {
    setAnsweredCount((prev) => prev + 1);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-gray-100 font-sans">
      <div className="fixed top-4 right-4 z-50 bg-gray-800 shadow-md rounded-xl px-6 py-4 border border-gray-700 text-right">
        <h2 className="text-xl font-bold text-green-400">Score</h2>
        <p className="text-md text-white">{score} / {questions.length}
        </p>
      </div>

      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-md">😸LSE MCQS🐱</h1>

      <div className="space-y-8 max-w-3xl mx-auto">
        {questions.map((q) => (
          <QuestionCard
            key={q.question_no}
            data={q}
            onAnswer={handleAnswer}
          />
        ))}
      </div>
    </div>
  );
}