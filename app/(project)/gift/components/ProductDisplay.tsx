"use client";
import Image from "next/image";
import { FormInputs } from "../../landing-page/components/sub-hero";
import React from "react";
import ReactPlayer from "react-player";

interface ProductDisplayProps {
    data: FormInputs | null | any
    images?: string[]
    onClose?: () => void;
    isModal?: boolean;
}

export default function ProductDisplay({
    data,
    images,
    onClose,
    isModal = false,
}: ProductDisplayProps) {

    console.log(data)

    if (!data) {
        return <div>Dados do produto não disponíveis</div>;
    }

    const isValidLink = ReactPlayer.canPlay(data.videoLink || '');

    if (!isValidLink) {
        return <p>Link inválido. Por favor, insira um link válido do YouTube.</p>;
    }

    return (
        <div
            className={`flex items-center justify-center ${isModal ? "bg-black/70 fixed inset-0 z-50" : "bg-gray-900 min-h-screen"
                }`}
        >
            <div
                className={`relative bg-gray-800 rounded-xl p-8 max-w-lg w-full text-white ${isModal ? "shadow-lg" : ""
                    }`}
            >
                {isModal && (
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-400 transition duration-300"
                        onClick={onClose}
                    >
                        X
                    </button>
                )}

                <div className="flex flex-col items-center mb-4">
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold">{`${data?.nome} & ${data.destinatario}`}</h2>
                    </div>
                    {images?.map((url, index) => (
                        <Image
                            key={index}
                            src={url}
                            alt={`Imagem ${index + 1}`}
                            width={140}
                            height={140}
                            className="w-auto h-auto"
                        />
                    ))}
                </div>

                <p className="mb-6 text-gray-400">{data?.mensagem}</p>

                {data.videoLink && (
                    <div className="mb-6">
                        <ReactPlayer
                            url={data.videoLink}
                            controls={true} 
                            playing={true}
                            width="100%"
                            height="200px"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
