"use client";

import Image from "next/image";

interface HeroProps {
  onSelectPlan: (plan: string) => void;
  selectedPlan: string;
}

export default function Hero({ onSelectPlan, selectedPlan }: HeroProps) {

  const handleSelectPlan = (plan: string) => {
    onSelectPlan(plan);
  };

  return (
    <>

      <div className="relative text-white h-auto bg-[#FCEEFD]">
        <div className="w-full md:px-[74px] flex flex-col md:flex-row justify-between items-center py-9">
          <div className="flex flex-col justify-start md:w-1/2">
            <h1 className="text-3xl md:text-5xl text-[#223645] font-bold mb-[85px]">
              Surpreenda aquela <span className={"text-[#EF5DA8]"}>pessoa</span> que é
              <br className="hidden md:block" />
              <span className={"text-[#EF5DA8]"}>especial para você!</span>
            </h1>
            <p className="text-[#223645] mb-8">
              Selecione o tipo de serviço desejado para este presente:
            </p>

            <div className="flex gap-6">
              <div
                className={`relative max-w-[168px] bg-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "basic" ? "border-2 border-pink-400 scale-110" : "scale-100"}`}
                onClick={() => handleSelectPlan("basic")}
              >
                {selectedPlan === "basic" && (
                  <div className="absolute bottom-[5px] right-5 z-[-10]">
                    <Image src="/landing-page/before.png" alt="Background circle" width={50} height={50} />
                  </div>
                )}
                <h3 className="text-base font-medium text-[#223645] mb-5">Acesso Básico</h3>
                <p className="font-bold mb-[7px] text-base text-[#1C1C1C]">R$ 19,90</p>
                <p className="text-[#6F6F6F] text-sm text-center mb-5">Acesso por 30 dias sem música</p>
                <button
                  className={`px-4 py-2 rounded-full text-xs ${selectedPlan === "basic" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
                >
                  {selectedPlan === "basic" ? "Escolhido!" : "Escolher"}
                </button>
              </div>

              <div
                className={`relative max-w-[168px] bg-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "medium" ? "border-2 border-pink-400 scale-110" : "scale-100"}`}
                onClick={() => handleSelectPlan("medium")}
              >
                {selectedPlan === "medium" && (
                  <div className="absolute bottom-[5px] right-5 z-[-10]">
                    <Image src="/landing-page/before.png" alt="Background circle" width={50} height={50} />
                  </div>
                )}
                <h3 className="text-base font-medium text-[#223645] mb-5">Acesso Médio</h3>
                <p className="font-bold mb-[7px] text-base text-[#1C1C1C]">R$ 29,90</p>
                <p className="text-[#6F6F6F] text-sm text-center mb-5">Acesso por 60 dias sem música</p>
                <button
                  className={`px-4 py-2 rounded-full text-xs ${selectedPlan === "medium" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
                >
                  {selectedPlan === "medium" ? "Escolhido!" : "Escolher"}
                </button>
              </div>

              <div
                className={`relative max-w-[168px] bg-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "lifetime" ? "border-2 border-pink-400 scale-110" : "scale-100"}`}
                onClick={() => handleSelectPlan("lifetime")}
              >
                {selectedPlan === "lifetime" && (
                  <div className="absolute bottom-[5px] right-5 z-[-10]">
                    <Image src="/landing-page/before.png" alt="Background circle" width={50} height={50} />
                  </div>
                )}
                <h3 className="text-base font-medium text-[#223645] mb-5">Acesso Vitalício</h3>
                <p className="font-bold mb-[7px] text-base text-[#1C1C1C]">R$ 39,90</p>
                <p className="text-[#6F6F6F] text-sm text-center mb-5">Acesso vitalício com música</p>
                <button
                  className={`px-4 py-2 rounded-full text-xs ${selectedPlan === "lifetime" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
                >
                  {selectedPlan === "lifetime" ? "Escolhido!" : "Escolher"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mx-auto md:left-auto">
            <Image
              src="/landing-page/layer.png"
              layout="intrinsic"
              objectFit="contain"
              priority={true}
              width={442}
              height={451}
              alt="Imagem de um casal em um encontro."
              className="w-auto h-auto"
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full opacity-100 h-[30px] bottom-3 md:bottom-2 rotate-180">
        <Image
          src="/landing-page/divisor.png"
          alt="Divisor de topo"
          layout="fill"
          objectFit="contain"
          priority={true}
        />
      </div>
    </>
  );
}
