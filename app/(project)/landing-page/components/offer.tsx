import React, { useEffect, useState } from "react";

function calculateTimeLeft() {
    const now = new Date();
    const deadline = new Date("2025-06-14T23:59:59");
    const difference = deadline.getTime() - now.getTime();

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            totalSeconds: Math.floor(difference / 1000),
        };
    }

    return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
    };
}

export default function PromoBanner() {
    const deadline = new Date("2025-06-14T23:59:59");
    const initialTotalSeconds = Math.floor((deadline.getTime() - new Date().getTime()) / 1000);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [unitsLeft, setUnitsLeft] = useState(1000);

    useEffect(() => {
        const timer = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft();

            const unitsRemaining = Math.max(
                Math.floor((updatedTimeLeft.totalSeconds / initialTotalSeconds) * 1000),
                0
            );

            setTimeLeft(updatedTimeLeft);
            setUnitsLeft(unitsRemaining);
        }, 1000);

        return () => clearInterval(timer);
    }, [initialTotalSeconds]);

    return (
        <div className="bg-gradient-to-r bg-black text-white py-6 px-4 rounded-lg shadow-lg mx-auto">
            <div className="text-center space-y-4 sm:space-y-3">
                <h2 className="text-base sm:text-lg md:text-xl font-bold flex flex-wrap justify-center items-center gap-x-1 gap-y-1 leading-snug">
                    🌹 Promoção Especial de Conexão e Amor Verdadeiro 🌹
                </h2>

                <p className="text-sm sm:text-base leading-snug">
                    <span className="font-semibold">Até 14 de Junho:</span> Eternize o seu sentimento com o{" "}
                    <span className="font-bold text-[#ec4899]">Acesso Vitalício por R$ 15,90</span>.
                </p>

                <p className="text-sm sm:text-base font-bold flex flex-wrap justify-center items-center gap-x-1 gap-y-1 leading-snug">
                    ♾️ Apenas <span className="text-[#FFD700]">{unitsLeft} unidades</span> disponíveis para almas que desejam eternizar o afeto.
                </p>

                <div className="flex justify-center flex-wrap items-center gap-3 sm:gap-4 text-lg font-bold mt-4">
                    <div className="flex flex-col items-center">
                        <span>{String(timeLeft.days).padStart(2, "0")}</span>
                        <span className="text-xs font-normal">Dias</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center">
                        <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                        <span className="text-xs font-normal">Horas</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center">
                        <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                        <span className="text-xs font-normal">Minutos</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center">
                        <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                        <span className="text-xs font-normal">Segundos</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
