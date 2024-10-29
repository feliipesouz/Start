"use client";
import { useState } from "react";
import { FiUpload, FiLink } from "react-icons/fi"; // Ícones para upload e link
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image"; // Importando o componente Image do Next.js
import PaymentModal from "./payment";

export default function Features() {
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <>
      <div className="relative z-10 w-full opacity-100 h-[30px] -bottom-3 md:-bottom-2">
        <Image
          src="/landing-page/divisor.png"
          alt="Divisor de topo"
          layout="fill"
          objectFit="contain"
          priority={true}
        />
      </div>
      <div className="relative w-full flex flex-col items-center mx-auto py-16 bg-[#FCEEFD] rounded-lg shadow-lg">
        <div className="absolute left-0 top-0 z-0 w-[400px] h-[500px] opacity-100 transform rotate-45">
          <Image
            src="/landing-page/decorationLeft.png"
            alt="Ícones de fundo à esquerda"
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </div>
        <div className="absolute right-0 -top-10 z-0 w-[400px] h-[400px] opacity-100">
          <Image
            src="/landing-page/decorationRight.png"
            alt="Ícones de fundo à direita"
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </div>

        <div className="w-full flex flex-col items-center relative z-10">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-24 text-[#223645]">
            <span className="text-[#EF5DA8]">Personalize o presente:</span> adicione músicas,
            <br className="hidden md:block" />
            fotos e finalize sua surpresa
          </h2>

          <div className="flex flex-col w-[56%] justify-between items-center gap-8 px-4">
            <div className="w-full flex gap-6 mb-16">
              <label className="block text-[#223645] font-bold mb-2 whitespace-nowrap">
                Upload de arquivos:
              </label>
              <div className="w-full border border-dashed border-[#00000040] p-4 rounded-lg flex items-center justify-between gap-12">
                <div className="flex items-center gap-3">
                  <FiUpload className="text-[#EF5DA8] text-4xl mr-2" />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-black">
                      {fileName || "Escolher arquivo para personalizar seu presente"}
                    </p>
                    <p className="text-xs text-[#6F6F6F]">
                      {!fileName && "Nenhum arquivo selecionado"}
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-xs text-[#EF5DA8] bg-white py-2 px-4 border border-[#EF5DA8] rounded-md inline-block"
                >
                  SELECIONAR
                </label>
              </div>
            </div>

            <div className="w-full flex gap-6 mb-24">
              <label className="block text-[#223645] font-bold mb-2 whitespace-nowrap">
                Selecione a trilha
                <br className="hidden md:block" />
                sonora do presente:
              </label>
              <div className="border border-dashed border-[#00000040] p-4 rounded-lg flex items-center w-full justify-between">
                <FiLink className="text-[#EF5DA8] text-4xl mr-2" />
                <input
                  type="text"
                  placeholder="Cole o Link do vídeo da música desejada do YouTube"
                  className="w-full p-3 text-sm border-none outline-none bg-transparent text-[#6F6F6F]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16 mt-8">
            <button className="flex items-center text-[#EF5DA8] border border-[#EF5DA8] px-6 py-3 rounded-full font-medium hover:bg-[#f8e6ef] transition">
              Ver como ficou
              <span className="ml-2">
                <MdKeyboardArrowRight />
              </span>
            </button>

            <div className="relative">
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-[-1] w-[60px] h-[60px]">
                <Image
                  src="/landing-page/before.png"
                  alt="Decorator"
                  layout="fill"
                  objectFit="contain"
                  className="opacity-100"
                />
              </div>

              <button onClick={() => setIsModalOpen(true)} className="bg-[#EF5DA8] z-10 text-white px-6 py-3 rounded-full font-bold hover:bg-[#e94d96] transition flex items-center">
                Criar meu presente
                <span className="ml-2">
                  <Image
                    src="/landing-page/arrow-right.png"
                    alt="Arrow Right"
                    width={18}
                    height={18}
                  />
                </span>
              </button>

              <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
