"use client";
import Image from "next/image";
import { FormInputs } from "../../landing-page/components/sub-hero";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import RelationshipCounter from "./RelationshipCounter";
import AudioPlayer from "./AudioPlayer";
import HeartEffect from "./HeartEffect";
import { ClipLoader } from "react-spinners";
import GiftUnwrap from "./GiftUnwrap";

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
    const [imageSources, setImageSources] = useState<string[]>([]);
    const [isUnwrapped, setIsUnwrapped] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Se existem URLs de upload, use-as; caso contrário, use o array de imagens padrão
        if (data?.uploadUrls && data.uploadUrls.length > 0) {
            setImageSources(data.uploadUrls);
        } else if (images.length > 0) {
            setImageSources(images);
        }
    }, [data, images]);

    useEffect(() => {
        // Cria um intervalo para mudar a imagem atual
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
        }, 4000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(timer);
    }, [imageSources]);

    useEffect(() => {
        // Impede que a página de fundo role enquanto o modal está aberto
        if (isModal) {
            document.body.classList.add("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isModal]);

    const playerRef = useRef<ReactPlayer | null>(null)

    const handleUnwrap = () => {
        setIsUnwrapped(true)
        setIsPlaying(true)

        // Aguarda renderização do player e tenta dar play manual
        setTimeout(() => {
            const internalPlayer = playerRef.current?.getInternalPlayer()
            try {
                // API do player do YouTube
                if (internalPlayer?.playVideo) {
                    internalPlayer.playVideo()
                }
            } catch (err) {
                console.warn("Erro ao tentar dar play manual:", err)
            }
        }, 1000) // aguarde 1s para garantir que o player foi montado
    }


    if (!data) {
        return <div>Dados do produto não disponíveis</div>;
    }

    if (!isUnwrapped) {
        return <GiftUnwrap onUnwrap={handleUnwrap} />;
    }

    const isValidLink = ReactPlayer.canPlay(data.videoLink || "");

    return (
        <div
            className={`fixed inset-0 z-50 bg-gray-900 flex items-center justify-center`}
            style={{ overflowY: "auto", backgroundColor: "#1A202C", }}
        >
            <div
                className={`relativ px-6 py-14 md:max-w-xl w-full max-h-screen overflow-y-auto text-white product-container`}
            >
                {isModal && (
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-400 transition duration-300"
                        onClick={onClose}
                    >
                        X
                    </button>
                )}

                <HeartEffect proximidade={data.proximidade} />

                <div className="flex flex-col items-center justify-center gap-4 ">
                    <div className="w-[90%] overflow-hidden">
                        <h2 className="text-xs text-center font-semibold">{`${data.nome} & ${data.destinatario}`}</h2>
                    </div>

                    <div className="w-[90%] h-[340px] mx-auto overflow-hidden rounded-md flex items-center justify-center">
                        {imageSources.length > 0 ? (
                            <Image
                                src={imageSources[currentIndex]}
                                alt={`Imagem ${currentIndex + 1}`}
                                width={260}
                                height={300}
                                priority={true}
                                className="object-cover h-full w-auto"
                            />
                        ) : (
                            <ClipLoader color="#ffffff" size={50} />
                        )}
                    </div>

                    <RelationshipCounter startDate={data.data} />

                    <div className="border w-40 mx-auto opacity-20 mt-1 flex-shrink-0" />

                    <p className="text-gray-400 text-center pb-4" style={{ whiteSpace: "pre-line" }}>{data?.mensagem}</p>

                    {isValidLink && (
                        <div className="bottom-0 left-0 right-0">
                            <AudioPlayer
                                audioUrl={data.videoLink}
                                playing={isPlaying}
                                autoUnmute={!isModal}
                                key={isUnwrapped ? 'unwrapped' : 'wrapped'}
                                playerRef={playerRef}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
