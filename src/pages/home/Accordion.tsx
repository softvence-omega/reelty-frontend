import { useState } from "react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    "Can I choose my own brand colors?",
    "Will the AI actors match my brand aesthetic?",
    "Can I choose my own brand colors?",
    "Can I choose my own brand colors?",
    "Can I choose my own brand colors?",
  ];

  const answers = [
    "Yes, you can customize your brand colors to suit your preferences!",
    "Yes, the AI actors can be tailored to match your brand aesthetic.",
    "Yes, you can customize your brand colors to suit your preferences!",
    "Yes, you can customize your brand colors to suit your preferences!",
    "Yes, you can customize your brand colors to suit your preferences!",
  ];

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="text-center">
        <div className="flex flex-col justify-center items-center gap-2 ">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Got Questions? <br /> We’ve Got Answers.
          </h2>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-black rounded-lg mb-2 overflow-hidden transition-all duration-500 ease-in-out"
          >
            <button
              className="w-full text-left p-4 text-white font-semibold text-lg flex justify-between items-center hover:bg-black  focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {question}
              <span
                className={`text-red-500 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className="text-gray-300 p-4 bg-black  overflow-hidden transition-height duration-500 ease-in-out"
              style={{
                height: openIndex === index ? "auto" : "0",
                paddingTop: openIndex === index ? "1rem" : "0",
                paddingBottom: openIndex === index ? "1rem" : "0",
              }}
            >
              {answers[index]}
            </div>
          </div>
        ))}
      </div>


       
    </div>
  );
};

export default Accordion;
