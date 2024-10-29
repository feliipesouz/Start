import Image from "next/image";
import { useState } from "react";

interface Props {
    isOpen: boolean,
    onClose: () => void
}

export default function PaymentModal({ isOpen, onClose }: Props) {
    const [payment, setPaymenyt] = useState<'pix' | 'cartão'>('pix')

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl w-full max-w-md py-6 px-9 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                >
                    ✕
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-center mb-8 text-[#223645]">
                    Escolha seu método de pagamento
                </h2>

                <h3 className="mb-4 text-sx text-[#111729]">Método de Pagamento</h3>

                {/* Payment Options */}
                <div className="flex justify-around mt-6 mb-8 gap-5">
                    <div onClick={() => setPaymenyt('pix')} className={`flex items-center justify-center w-1/2 ${payment === 'pix' ? "border-2 border-pink-400" : "border"} justify-between rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all`}>
                        <div className="gap-2 text-xs">
                            <input type="radio" name="payment" className="mr-2" />
                            <span>PIX</span>
                        </div>
                        <Image src="/landing-page/pix.png" alt="Pix" width={22} height={22} />
                    </div>
                    <div onClick={() => setPaymenyt('cartão')} className={`flex items-center justify-center w-1/2 ${payment === 'cartão' ? "border-2 border-pink-400" : "border"} rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all items-start`}>
                        <div className="gap-2 text-xs">
                            <input type="radio" name="payment" className="mr-2" />
                            <span>Cartão de Crédito</span>
                        </div>
                        <Image src="/landing-page/cartao.png" alt="Cartão" width={29} height={29} />
                    </div>
                </div>

                <hr className="w-full my-6" />

                {/* Product Information */}
                <div className="mb-6">
                    <h3 className="text-sx mb-[10px]">Seu produto</h3>
                    <div className="border border-[#28303F] rounded-lg p-4 flex items-center gap-4 max-w-[260px]">
                        <Image src="/landing-page/produto-pet.png" alt="Produto" width={50} height={50} />
                        <div className="flex flex-col items-start">
                            <p className="text-sm mb-2">Cartão Presente</p>
                            <div className="flex gap-5 items-center">
                                <p className="text-xs">Tipo: Pet</p>
                                <p className="text-xs"> Acesso: Básico</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="w-full mt-8 mb-5" />

                {/* Price Breakdown */}
                <div className="text-[#223645] mb-8">
                    <div className="flex text-xs justify-between text-[#EF5DA8] mt-4">
                        <span>Total:</span>
                        <span>R$ 51,00</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="text-[#EF5DA8] border border-[#EF5DA8] rounded-full px-6 py-2 text-xs font-semibold hover:bg-[#f8e6ef]"
                    >
                        Cancelar
                    </button>
                    <button className="bg-[#EF5DA8] text-white rounded-full px-6 py-2 text-xs font-bold hover:bg-[#e94d96]">
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}

