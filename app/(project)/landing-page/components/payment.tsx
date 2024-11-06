import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useState } from "react";
import { FormInputs } from "./sub-hero";
import useMercadoPago from "@/app/hooks/useMercadoPago";
import useStripe from "@/app/hooks/useStripe";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: FormInputs | null;
    selectedPlan: string;
    images: string;
    handleUploadImages: (data: FormInputs) => void;
}

export default function PaymentModal({
    isOpen,
    onClose,
    formData,
    selectedPlan,
    images,
    handleUploadImages,
}: PaymentModalProps) {
    const [payment, setPayment] = useState<"pix" | "cartão">("pix");

    const { createMercadoPagoCheckout } = useMercadoPago();
    const { createPaymentStripeCheckout } = useStripe();


    const handlePayment = async () => {
        await handleUploadImages(formData as FormInputs);

        if (payment === "cartão") {
            return createPaymentStripeCheckout({ email: formData?.email, selectedPlan });
        } else if (payment === "pix") {
            await createMercadoPagoCheckout({
                testeId: '123',
                email: formData?.email,
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl w-full max-w-md py-6 px-6 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-center mb-8 text-[#223645]">
                    Escolha seu método de pagamento
                </h2>

                <h3 className="mb-4 text-sx text-[#111729]">Método de Pagamento</h3>

                <div className="flex justify-around mt-6 mb-8 gap-4">

                    <label
                        onClick={() => setPayment("pix")}
                        className={`flex items-center justify-center w-1/2 ${payment === "pix"
                            ? "border-2 border-pink-400 bg-pink-100"
                            : "border border-gray-300"
                            } justify-between rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value="pix"
                            className="hidden"
                            checked={payment === "pix"}
                        />
                        <div className="flex items-center gap-2 text-xs">
                            <span
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === "pix" ? "border-pink-500" : "border-gray-300"
                                    }`}
                            >
                                {payment === "pix" && (
                                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                )}
                            </span>
                            <span>PIX</span>
                        </div>
                        <Image src="/landing-page/pix.png" alt="Pix" width={22} height={22} />
                    </label>
                    <label
                        onClick={() => setPayment("cartão")}
                        className={`flex items-center justify-center w-1/2 ${payment === "cartão"
                            ? "border-2 border-pink-400 bg-pink-100"
                            : "border border-gray-300"
                            } justify-between rounded-lg p-[12px] cursor-pointer hover:shadow-lg transition-all`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value="cartão"
                            className="hidden"
                            checked={payment === "cartão"}
                        />
                        <div className="flex items-center w-full justify-between">
                            <div className="flex gap-1 items-center text-xs">
                                <span
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === "cartão"
                                        ? "border-pink-500"
                                        : "border-gray-300"
                                        }`}
                                >
                                    {payment === "cartão" && (
                                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                    )}
                                </span>
                                <span className="whitespace-nowrap">Cartão de Crédito</span>
                            </div>
                            <Image src="/landing-page/cartao.png" alt="Cartão" width={20} height={20} />
                        </div>
                    </label>

                </div>

                <hr className="w-full my-6" />

                <div className="mb-6">
                    <h3 className="text-sx mb-[10px]">Seu produto</h3>
                    <div className="border border-[#28303F] rounded-lg p-4 flex items-center gap-4 max-w-[260px]">
                        <Image src={images} alt="Produto" width={50} height={50} />
                        <div className="flex flex-col items-start">
                            <p className="text-sm mb-2">Contador dinâmico</p>
                            <div className="flex gap-5 items-center">
                                <p className="text-xs">Proximidade: {formData?.proximidade}</p>
                                <p className="text-xs"> Acesso: {formData?.plano === 'lifetime' ? 'Vitalício' : formData?.plano === 'basic' ? '30 dias' : '60 dias'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="w-full mt-8 mb-5" />

                {/* Price Breakdown */}
                <div className="text-[#223645] mb-8">
                    <div className="flex text-xs justify-between text-[#EF5DA8] mt-4">
                        <span>Total:</span>
                        <span>R$ {formData?.plano === 'lifetime' ? '33,90' : formData?.plano === 'basic' ? '19,90' : '28,90'}</span>
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
                    <button
                        onClick={handlePayment}
                        className="bg-[#EF5DA8] text-white rounded-full px-6 py-2 text-xs font-bold hover:bg-[#e94d96]"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}