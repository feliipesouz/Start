import Slider from "react-slick";
import { useRef, useState } from "react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: PaymentModalProps) {
    const [showCarousel, setShowCarousel] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const sliderRef = useRef<any>(null);

    if (!isOpen) return null;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (current: number, next: number) => setSlideIndex(next), // Atualiza o estado do slide atual
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
            <div className="bg-[#070707] rounded-xl w-[80%] md:w-full max-w-md py-8 px-6 shadow-lg relative overflow-hidden ">
                <div className="absolute top-0 left-0 right-0 h-0 bg-gradient-to-b from-[#ff007a] via-[#ff1493] to-transparent z-30 shadow-[0px_15px_100px_30px_rgba(255,20,147,0.8)]" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 z-40"
                >
                    ✕
                </button>

                <div className="absolute top-0 left-0 right-0 h-16 rounded-t-xl flex items-center justify-center">
                    <h1 className="text-white text-lg font-semibold tracking-widest z-50 text">TUTORIAL</h1>
                </div>


                {!showCarousel ? (
                    <div className="text-center mt-10">
                        <h2 className="text-sm md:text-lg font-semibold mb-4 text-white">
                            "As pessoas vão esquecer o que você disse, vão esquecer o que você fez mas não esquecerão o que você as fez sentir"
                        </h2>
                        <button
                            onClick={() => setShowCarousel(true)} // Muda o estado para mostrar o carrossel
                            className="bg-transparent text-sm md:text-base border border-white text-white rounded-full px-8 py-2 mt-6"
                        >
                            Iniciar
                        </button>
                    </div>
                ) : (
                    <Slider ref={sliderRef} {...settings} className="mt-10">
                        <div className="text-center">
                            <h2 className="text-base md:text-lg font-semibold mb-4 text-white">1. Preencha os dados</h2>
                            <p className="text-gray-300 text-sm md:text-base">Insira todas as informações necessárias para personalizar o seu presente.</p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-base md:text-lg font-semibold mb-4 text-white">2. Faça o pagamento</h2>
                            <p className="text-gray-300 text-sm md:text-base">Conclua a compra com nosso sistema seguro de pagamentos.</p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-base md:text-lg font-semibold mb-4 text-white">3. Receba o seu contador direto no e-mail</h2>
                            <p className="text-gray-300 text-sm md:text-base">Após o pagamento, você receberá o link do seu site e o QR Code no seu e-mail.</p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-base md:text-lg font-semibold mb-4 text-white">4. Surpreenda aquela pessoa</h2>
                            <p className="text-gray-300 text-sm md:text-base">Agora é só entregar o presente e surpreender aquela pessoa especial!</p>
                        </div>
                    </Slider>
                )}

                {showCarousel && (
                    <div className="flex justify-center mt-6">
                        {slideIndex < 3 ? (
                            <button
                                onClick={() => {
                                    if (sliderRef.current) {
                                        sliderRef.current.slickGoTo(slideIndex + 1);
                                    }
                                }}
                                className="bg-transparent border border-white text-white rounded-full px-8 py-2"
                            >
                                Próximo
                            </button>
                        ) : (
                            <button
                                onClick={() => { onClose(), setShowCarousel(false), setSlideIndex(0) }}
                                className="bg-pink-500 text-white rounded-full px-8 py-2"
                            >
                                Finalizar
                            </button>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
}
