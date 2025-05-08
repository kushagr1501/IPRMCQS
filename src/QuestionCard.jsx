import React, { useState } from "react";

export default function QuestionCard({ data, onAnswer }) {
    const [selected, setSelected] = useState(null);
  
    const handleClick = (optKey) => {
      if (selected) return;
      setSelected(optKey);
      onAnswer(optKey === data.correct_option);
    };
  
    return (
      <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white">
          {data.question_no}. {data.question}
        </h3>
        <div className="space-y-4">
          {Object.entries(data.options).map(([key, text]) => {
            let base = "py-3 px-5 border rounded-xl cursor-pointer transition-all duration-200 text-lg font-medium";
            let color = "border-gray-600 bg-gray-700 hover:bg-gray-600 text-white";
  
            if (selected) {
              if (key === data.correct_option) color = "bg-green-600 border-green-500 text-white";
              else if (key === selected) color = "bg-red-600 border-red-500 text-white";
              else color = "bg-gray-700 border-gray-600 text-gray-400";
            }
  
            return (
              <div
                key={key}
                className={`${base} ${color}`}
                onClick={() => handleClick(key)}
              >
                <span className="font-bold mr-2">{key}.</span> {text}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
