"use client";
import Image from "next/image";
import { FormInputs } from "../../landing-page/components/sub-hero";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import RelationshipCounter from "./RelationshipCounter";
import AudioPlayer from "./AudioPlayer";
import HeartEffect from "./HeartEffect";

interface ProductDisplayProps {
    data: FormInputs | null | any;
    images?: string[];
    onClose?: () => void;
    isModal?: boolean;
}

export default function ProductDisplay({
    data,
    images = [],
    onClose,
    isModal = false,
}: ProductDisplayProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(data);

    useEffect(() => {
        // Cria um intervalo para mudar a imagem atual
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(timer);
    }, [images]);

    if (!images || images.length === 0) {
        return <p>Nenhuma imagem disponível</p>;
    }

    if (!data) {
        return <div>Dados do produto não disponíveis</div>;
    }

    useEffect(() => {
        // Impede que a página de fundo role enquanto o modal está aberto
        if (isModal) {
            document.body.classList.add("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isModal]);

    const isValidLink = ReactPlayer.canPlay(data.videoLink || "");

    return (
        <div
            className={`fixed inset-0 z-50 bg-gray-900 flex items-center justify-center`}
            style={{ overflowY: "auto", backgroundColor: "#1A202C" }} // Cor azul escuro e scroll no modal
        >
            <div
                className={`relative bg-gray-800 rounded-xl p-6 md:max-w-xl w-full max-h-screen overflow-y-auto text-white shadow-lg`}
            >
                {isModal && (
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-400 transition duration-300"
                        onClick={onClose}
                    >
                        X
                    </button>
                )}
                <div className="w-[95%] max-h-[80vh]">
                    <HeartEffect />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 mb-36 md:mb-12 ">
                    <div className="bg-slate-500 rounded-md w-[90%] overflow-hidden">
                        <h2 className="text-xs font-semibold">{`voceeespecial.com.br/${data.nome.replace(
                            " ",
                            ""
                        )}&${data.destinatario.replace(" ", "")}`}</h2>
                    </div>

                    <div className="w-[90%] h-[340px] mx-auto overflow-hidden rounded-md flex items-center justify-center">
                        <Image
                            src={images[currentIndex]}
                            alt={`Imagem ${currentIndex + 1}`}
                            width={260}
                            height={300} // Altura fixa
                            className="object-cover h-full w-auto"
                        />
                    </div>

                    <RelationshipCounter startDate={data.data} />

                    <div className="border w-40 mx-auto opacity-20 mt-1 flex-shrink-0" />

                    <p className="text-gray-400 text-center">{data?.mensagem}</p>

                    {isValidLink && (
                        <div className="fixed bottom-0 left-0 right-0">
                            <AudioPlayer audioUrl={data.videoLink} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
