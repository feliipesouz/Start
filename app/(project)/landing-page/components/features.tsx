"use client";
import { useState } from "react";
import { FiUpload, FiLink } from "react-icons/fi"; // Ícones para upload e link

export default function Features() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto py-16 bg-[#FCEEFD] rounded-lg shadow-lg">
      <div className="w-[80%] flex flex-col items-center">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-20 text-[#223645]">
          <span className="text-[#EF5DA8]">Personalize o presente:</span> adicione músicas, fotos
          <br className="hidden md:block" />
          e finalize sua surpresa
        </h2>

        <div className="flex flex-col justify-between gap-8 px-4">
          <div className="w-full flex gap-6 mb-16">
            <label className="block text-[#223645] font-bold mb-2">
              Upload de arquivos:
            </label>
            <div className="border border-dashed border-[#00000040] p-4 rounded-lg flex items-center justify-between gap-12">
              <div className="flex items-center gap-3">
                <FiUpload className="text-[#EF5DA8] text-4xl mr-2" />
                <div className="flex flex-col">
                  <p className="text-sm text-[#6F6F6F]">
                    {fileName || "Escolher arquivo para personalizar seu presente"}
                  </p>
                  <p className="text-[11px] text-[#6F6F6F]">
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
            <label className="block text-[#223645] font-bold mb-2">
              Selecione a trilha
              <br className="hidden md:block" />
              sonora do presente:
            </label>
            <div className="border border-dashed border-[#00000040] p-4 rounded-lg flex items-center">
              <FiLink className="text-[#EF5DA8] text-4xl mr-2" />
              <input
                type="text"
                placeholder="Cole o Link do vídeo da música desejada do YouTube"
                className="w-full p-3 border-none outline-none bg-transparent text-[#6F6F6F]"
              />
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <button className="text-[#EF5DA8] border border-[#EF5DA8] px-6 py-3 rounded-full font-medium hover:bg-[#f8e6ef] transition">
            Ver como ficou
          </button>
          <button className="bg-[#EF5DA8] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e94d96] transition flex items-center">
            Criar meu presente
            <span className="ml-2">
              <FiUpload />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
