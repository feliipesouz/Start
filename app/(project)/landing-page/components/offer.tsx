import React, { useEffect, useState } from "react";

function calculateTimeLeft() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const difference = endOfDay.getTime() - now.getTime();

    return difference > 0
        ? {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            totalSeconds: Math.floor(difference / 1000),
        }
        : { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
}

export default function PromoBanner() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [unitsLeft, setUnitsLeft] = useState(1000); // Total inicial de unidades

    useEffect(() => {
        const totalSecondsInDay = 24 * 60 * 60; // Total de segundos no dia
        const timer = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft();

            // Atualize o número de unidades restantes proporcionalmente ao tempo
            const unitsRemaining = Math.max(
                Math.floor((updatedTimeLeft.totalSeconds / totalSecondsInDay) * 1000),
                0 // Garante que o valor não seja negativo
            );

            setTimeLeft(updatedTimeLeft);
            setUnitsLeft(unitsRemaining);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-r bg-black text-white py-6 px-4 rounded-lg shadow-lg mx-auto">
            <div className="text-center space-y-3">
                {/* Título */}
                <h2 className="text-lg md:text-xl font-bold flex items-center justify-center gap-2">
                    🎉 Promoção Exclusiva de Lançamento
                </h2>
                {/* Oferta */}
                <p className="text-sm md:text-base">
                    <span className="font-semibold">Somente hoje:</span> Acesso Vitalício por <span className="font-bold text-yellow-300">R$ 33,90</span>!
                </p>
                {/* Escassez */}
                <p className="text-sm md:text-base font-bold flex items-center justify-center gap-2">
                    ⏳ Apenas <span className="text-yellow-300">{unitsLeft} unidades</span> disponíveis!
                </p>
                {/* Contador */}
                <div className="flex justify-center items-center gap-4 text-lg font-bold mt-4">
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
