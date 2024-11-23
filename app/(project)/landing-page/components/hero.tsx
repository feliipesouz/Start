"use client";

import Image from "next/image";
import Slider from "react-slick";

interface HeroProps {
  onSelectPlan: (plan: string) => void;
  selectedPlan: string;
}

export default function Hero({ onSelectPlan, selectedPlan }: HeroProps) {

  const handleSelectPlan = (plan: string) => {
    onSelectPlan(plan);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>

      <div className="relative text-white h-[560px] md:h-auto bg-[#FCEEFD]">
        <div className="w-full md:px-[74px] flex flex-col md:flex-row justify-between items-center py-9">
          <div className="flex flex-col justify-start w-full md:w-1/2">
            <h1 className="text-lg md:text-5xl text-[#223645] font-bold mb-9 md:mb-[85px] px-12 md:px-0 text-center md:text-left">
              Surpreenda aquela <span className={"text-[#EF5DA8]"}>pessoa</span> que é
              <br className="hidden md:block" />
              <span className={"text-[#EF5DA8]"}> especial para você!</span>
            </h1>
            <p className="text-[#223645] text-xs mb-0 md:mb-8 px-8 md:px-0 w-[265px] md:w-full">
              Selecione o tipo de serviço desejado para este presente:
            </p>


            <div className="px-5 md:px-0 pb-14 md:mb-0">
              <div className="block md:hidden h-48 items-center">
                <Slider {...settings} className="flex flex-col">
                  {/* Acesso Básico */}
                  <div
                    className={`relative max-w-[136px] justify-center bg-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "basico" ? "border-2 border-pink-400 scale-110" : "scale-100"
                      }`}
                    onClick={() => handleSelectPlan("basico")}
                  >
                    {selectedPlan === "basico" && (
                      <div className="absolute bottom-[12px] right-2 z-[-10]">
                        <Image src="/landing-page/before.png" alt="Background circle" width={31} height={31} />
                      </div>
                    )}
                    <h3 className="text-xs font-medium text-[#223645] mb-4 text-center">Acesso Básico</h3>
                    <p className="font-bold mb-1 text-xs text-[#1C1C1C] text-center">R$ 19,90</p>
                    <p className="text-[#6F6F6F] text-[9px] text-center mb-3">Acesso por 30 dias sem música</p>
                    <div className="w-full flex justify-center">
                      <button
                        className={`px-4 py-[6px] rounded-full text-[8px] ${selectedPlan === "basico" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"
                          }`}
                      >
                        {selectedPlan === "basic" ? "Escolhido!" : "Escolher"}
                      </button>
                    </div>
                  </div>

                  {/* Acesso Médio */}
                  <div
                    className={`relative max-w-[136px] bg-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "pro" ? "border-2 border-pink-400 scale-110" : "scale-100"
                      }`}
                    onClick={() => handleSelectPlan("pro")}
                  >
                    {selectedPlan === "pro" && (
                      <div className="absolute bottom-[12px] right-2 z-[-10]">
                        <Image src="/landing-page/before.png" alt="Background circle" width={31} height={31} />
                      </div>
                    )}
                    <h3 className="text-xs font-medium text-[#223645] mb-4 text-center">Acesso Médio</h3>
                    <p className="font-bold mb-1 text-xs text-[#1C1C1C] text-center">R$ 28,90</p>
                    <p className="text-[#6F6F6F] text-[9px] text-center mb-3">Acesso por 60 dias sem música</p>
                    <div className="w-full flex justify-center">
                      <button
                        className={`px-4 py-[6px] rounded-full text-[8px] ${selectedPlan === "pro" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"
                          }`}
                      >
                        {selectedPlan === "pro" ? "Escolhido!" : "Escolher"}
                      </button>
                    </div>
                  </div>

                  {/* Acesso Vitalício */}
                  <div
                    className={`relative max-w-[136px] bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "lifetime" ? "border-2 border-pink-400 scale-110" : "scale-100"
                      }`}
                    onClick={() => handleSelectPlan("lifetime")}
                  >
                    {selectedPlan === "lifetime" && (
                      <div className="absolute bottom-[12px] right-2 z-[-10]">
                        <Image src="/landing-page/before.png" alt="Background circle" width={31} height={31} />
                      </div>
                    )}
                    <div className="absolute -top-2 right-0 bg-black text-white text-[8px] font-bold px-2 py-1 rounded-full z-50">
                      Mais Escolhido
                    </div>

                    <h3 className="text-xs font-medium text-[#223645] mb-4 text-center">Acesso Vitalício</h3>
                    <p className="font-bold mb-1 text-xs text-[#1C1C1C] text-center">R$ 39,90</p>
                    <p className="text-[#6F6F6F] text-[9px] text-center mb-3">Acesso vitalício com música</p>
                    <div className="w-full flex justify-center">
                      <button
                        className={`px-4 py-[6px] rounded-full text-[8px] ${selectedPlan === "lifetime" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"
                          }`}
                      >
                        {selectedPlan === "lifetime" ? "Escolhido!" : "Escolher"}
                      </button>
                    </div>
                  </div>
                </Slider>
              </div>

              <div className="hidden md:flex gap-6">
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
                  <p className="text-[#6F6F6F] text-sm text-center mb-5">Acesso por 30 dias + 3 fotos SEM música</p>
                  <button
                    className={`px-4 py-2 rounded-full text-xs ${selectedPlan === "basic" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
                  >
                    {selectedPlan === "basic" ? "Escolhido!" : "Escolher"}
                  </button>
                </div>

                <div
                  className={`relative max-w-[168px] bg-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 ease-in-out transform ${selectedPlan === "pro" ? "border-2 border-pink-400 scale-110" : "scale-100"}`}
                  onClick={() => handleSelectPlan("pro")}
                >
                  {selectedPlan === "pro" && (
                    <div className="absolute bottom-[5px] right-5 z-[-10]">
                      <Image src="/landing-page/before.png" alt="Background circle" width={50} height={50} />
                    </div>
                  )}
                  <h3 className="text-base font-medium text-[#223645] mb-5">Acesso Médio</h3>
                  <p className="font-bold mb-[7px] text-base text-[#1C1C1C]">R$ 28,90</p>
                  <p className="text-[#6F6F6F] text-sm text-center mb-5">Acesso por 60 dias + 5 fotos + música</p>
                  <button
                    className={`px-4 py-2 rounded-full text-xs ${selectedPlan === "pro" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
                  >
                    {selectedPlan === "pro" ? "Escolhido!" : "Escolher"}
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
                  <div className="absolute right-0 -top-3 bg-black text-white text-xs font-bold px-4 py-1 rounded-full z-50">
                    Mais Escolhido
                  </div>
                  <h3 className="text-base font-medium text-[#223645] mb-5">Acesso Vitalício</h3>
                  <p className="font-bold mb-[7px] text-base text-[#1C1C1C]">R$ 33,90</p>
                  <p className="text-[#6F6F6F] text-sm text-center mb-5">Acesso para sempre + 7 fotos + música</p>
                  <button
                    className={`px-4 py-2 rounded-full text-xs ${selectedPlan === "lifetime" ? "bg-[#EF5DA8] text-white font-bold" : "bg-[#FFFF] text-[#EF5DA8] border border-[#EF5DA8]"}`}
                  >
                    {selectedPlan === "lifetime" ? "Escolhido!" : "Escolher"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-end mx-auto md:left-auto absolute md:relative top-[410px] md:top-0">
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
      <div className="relative w-full opacity-100 h-[30px] bottom-3 md:bottom-2 rotate-180 hidden md:block">
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
