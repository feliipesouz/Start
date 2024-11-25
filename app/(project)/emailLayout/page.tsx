// pages/email-preview.js

import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from 'qrcode.react';

export default function EmailPreview() {
    const orderId = "12345"; // Simulação de ID de pedido

    return (
        <div style={{ backgroundColor: "#f4f4f4", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <nav className="relative w-full z-10 md:mt-0 py-4 md:py-5 bg-white">
                <div className="flex items-center justify-center text-[#223645] gap-3 md:gap-9 mx-4 md:mx-[10vw]">
                    <div className="relative">
                        <Link href={"/"} className="flex items-center gap-2">
                            <div className="relative size-7 md:size-9">
                                <Image
                                    src="/landing-page/logo.png"
                                    fill
                                    alt="Template Logo"
                                    className="object-fit object-center"
                                    priority
                                />
                            </div>
                            <span className="text-base md:text-lg">
                                Você é <span className={"text-[#EF5DA8]"}>Especial</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
            <div
                style={{
                    backgroundColor: "#EF5DA8CC",
                    color: "#FFFFFF",
                    textAlign: "center",
                    padding: "28px 0",
                    height: "208px",
                    width: "100%",
                }}
            >
                <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold" }}>Seu produto chegou!!!</h1>
            </div>

            {/* Content */}
            <div
                style={{
                    backgroundColor: "#FFFFFF",
                    maxWidth: "700px",
                    margin: "0 auto",
                    padding: "20px",
                    position: "relative",
                    top: "-100px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 style={{ fontSize: "18px", color: "#333333", fontWeight: "bold", marginBottom: "20px" }}>
                    Resumo da compra:
                </h2>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "15px" }}>
                    <span>🏪</span>
                    <p style={{ margin: 0, color: "#555555" }}>
                        Você comprou de <strong>VOCÊ É ESPECIAL</strong>
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "15px" }}>
                    <span>🛒</span>
                    <p style={{ margin: 0, color: "#555555" }}>Em seu carrinho: Contador de tempo (x1)</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "15px" }}>
                    <span>💵</span>
                    <p style={{ margin: 0, color: "#555555" }}>
                        Pagamento realizado de <strong>R$ 51,00</strong>
                        <br />
                    </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", margin: "40px 0" }}>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", textAlign: "center", }}>
                        <QRCodeSVG
                            value="https://www.voceeespecial.com.br/gift/felipearruda-e-giovannaapolinarioc8cb4cbe-bfeb-4630-9c3e-5ab3c0ad47cf"
                            size={100}
                        />
                        <p style={{ margin: 0 }}>Escanear QRCode</p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <a
                            href={`https://voceeespecial.com/download/${orderId}`}
                            style={{
                                backgroundColor: "#FF007A",
                                color: "#FFFFFF",
                                textDecoration: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                fontSize: "14px",
                            }}
                        >
                            Download
                        </a>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <div
                style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#777777",
                    padding: "10px",
                }}
            >
                <p style={{ margin: 0 }}>Obrigado por comprar conosco!</p>
                <p style={{ margin: 0 }}>VOCÊ É ESPECIAL - Todos os direitos reservados</p>
            </div>
        </div>
    );
}
