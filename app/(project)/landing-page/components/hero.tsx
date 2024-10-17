"use client";

import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="relative text-white px-4 md:px-0 h-[700px] md:h-[75vh] bg-[#FCEEFD]">
      <div className="md:max-w-full md:px-[74px] mx-auto flex flex-col md:flex-row justify-between items-center h-full">
        <div className="flex flex-col justify-center items-start md:items-start text-left md:w-2/3">
          <h1 className="text-3xl md:text-5xl text-[#223645] font-bold mb-4 mt-[20%] md:mt-[7%]">
            Surpreenda aquela <span className={"text-[#EF5DA8]"}>pessoa</span> que é
            <br className="hidden md:block" />
            <span className={"text-[#EF5DA8]"}>especial para você!</span>
          </h1>
          <p className="text-[#223645] mt-4 mb-8">
            Selecione o tipo de serviço desejado para este presente:
          </p>

          <div className="flex gap-6 text-sm md:text-base">
            {/* Acesso Básico */}
            <div
              className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "basic" ? "border-2 border-pink-400 scale-110" : "scale-100"} w-48 md:w-52`}
              onClick={() => handleSelectPlan("basic")}
            >
              <h3 className="text-xl font-medium text-[#223645]">Acesso Básico</h3>
              <p className="font-bold mt-5 mb-2 text-sm text-[#1C1C1C]">R$ 19,90</p>
              <p className="text-[#6F6F6F] text-xs w-2/3">Acesso por 30 dias sem música</p>
              <button
                className={`mt-4 px-4 py-2 rounded-full text-xs ${selectedPlan === "basic" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
              >
                {selectedPlan === "basic" ? "Escolhido!" : "Escolher"}
              </button>
            </div>

            {/* Acesso Médio */}
            <div
              className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "medium" ? "border-2 border-pink-400 scale-110" : "scale-100"} w-48 md:w-52`}
              onClick={() => handleSelectPlan("medium")}
            >
              <h3 className="text-xl font-medium text-[#223645]">Acesso Médio</h3>
              <p className="font-bold mt-5 mb-2 text-sm text-[#1C1C1C]">R$ 29,90</p>
              <p className="text-[#6F6F6F] text-xs w-2/3">Acesso por 60 dias sem música</p>
              <button
                className={`mt-4 px-4 py-2 rounded-full text-xs ${selectedPlan === "medium" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
              >
                {selectedPlan === "medium" ? "Escolhido!" : "Escolher"}
              </button>
            </div>

            {/* Acesso Vitalício */}
            <div
              className={`bg-white p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "lifetime" ? "border-2 border-pink-400 scale-110" : "scale-100"} w-48 md:w-52`}
              onClick={() => handleSelectPlan("lifetime")}
            >
              <h3 className="text-xl font-medium text-[#223645]">Acesso Vitalício</h3>
              <p className="font-bold mt-5 mb-2 text-sm text-[#1C1C1C]">R$ 39,90</p>
              <p className="text-[#6F6F6F] text-xs w-2/3">Acesso vitalício com música</p>
              <button
                className={`mt-4 px-4 py-2 rounded-full text-xs ${selectedPlan === "lifetime" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
              >
                {selectedPlan === "lifetime" ? "Escolhido!" : "Escolher"}
              </button>
            </div>
          </div>
        </div>

        {/* Imagem ao lado direito */}
        <div className="absolute flex right-24 left-0 mx-auto md:left-auto md:w-[442px] md:h-[451px]">
          <Image
            src="/landing-page/layer.png"
            fill
            alt="Ilustração Gráfico 1"
            className="object-fit object-center"
          />
        </div>
      </div>
    </div>
  );
}
