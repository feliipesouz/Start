"use client";

import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { faqQuestions } from "../config";

export default function FAQ() {
  const [selectedQuestion, setSelectedQuestion] = useState(
    faqQuestions[0].question
  );

  return (
    <div id="faq" className="bg-white py-[50px] md:py-[100px]">
      <div className="flex flex-col md:flex-row max-w-[90%] md:max-w-[1200px] mx-auto">
        <div className="w-full md:px-8 text-center md:text-left">
          <h5 className="text-2xl md:text-4xl font-bold mb-8 md:mb-2">
            Dúvidas sobre como funciona a <br />
            <span className={"text-[#EF5DA8]"}> voceeespecial?</span>
          </h5>
          <div className="hidden md:block relative w-[180px] h-[180px]">
            <Image
              src="/landing-page/logo.png"
              width={100}
              height={100}
              alt="Logo"
              className="object-cover object-center w-auto h-auto"
            />
          </div>
        </div>
        <div className="w-full flex h-[520px] md:h-[350px] flex-col gap-4 mt-4 md:mt-0">
          <Accordion.Root
            type="single"
            defaultValue="Quais informações conseguirei visualizar?"
            value={selectedQuestion}
          >
            {faqQuestions.map((question) => (
              <Question
                key={question.question}
                question={question.question}
                answer={question.answer}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
              />
            ))}
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
}

function Question({
  question,
  answer,
  selectedQuestion,
  setSelectedQuestion,
}: {
  question: string;
  answer: string;
  selectedQuestion: string;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleAccordionClick() {
    if (selectedQuestion === question) {
      setSelectedQuestion("");
      return;
    }
    setSelectedQuestion(question);
  }

  return (
    <Accordion.Item
      value={question}
      className="p-3 max-w-full data-[state=open]:bg-white rounded-lg"
    >
      <Accordion.Header
        onClick={handleAccordionClick}
        className="flex cursor-pointer"
      >
        <Accordion.Trigger className="w-full">
          <h2 className="text-left text-[#1F2937] font-bold">{question}</h2>
        </Accordion.Trigger>
        {selectedQuestion === question ? (
          <div className="relative w-[20px] h-[20px] data-[state=open]:bg-red-10">
            <Image
              src="/landing-page/minus.svg"
              fill
              alt="Sinal de fechar"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div className="relative w-[20px] h-[20px] data-[state=open]:hidden">
            <Image
              src="/landing-page/plus.svg"
              fill
              alt="Sinal de abrir"
              className="object-cover object-center"
            />
          </div>
        )}
      </Accordion.Header>
      <Accordion.Content className="mt-2 text-sm">{answer}</Accordion.Content>
    </Accordion.Item>
  );
}
