import React, { useEffect, useState } from "react";

interface CounterProps {
    startDate: string;
}

const RelationshipCounter: React.FC<CounterProps> = ({ startDate }) => {
    const [timeElapsed, setTimeElapsed] = useState("");

    useEffect(() => {
        const calculateTimeElapsed = (startDate: string) => {
            const start = new Date(startDate);
            const now = new Date();

            const totalSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);

            const years = Math.floor(totalSeconds / (365 * 24 * 3600));
            const months = Math.floor((totalSeconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
            const days = Math.floor((totalSeconds % (30 * 24 * 3600)) / (24 * 3600));
            const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Função para retornar singular ou plural
            const pluralize = (value: number, singular: string, plural: string) => {
                return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
            };

            return `${pluralize(years, "ano", "anos")}, ${pluralize(months, "mês", "meses")}, ${pluralize(days, "dia", "dias")}, ${pluralize(hours, "hora", "horas")}, ${pluralize(minutes, "minuto", "minutos")} e ${pluralize(seconds, "segundo", "segundos")}`;
        };

        const updateCounter = () => {
            setTimeElapsed(calculateTimeElapsed(startDate));
        };

        // Atualiza o contador a cada segundo
        const interval = setInterval(updateCounter, 1000);

        // Atualiza imediatamente ao montar o componente
        updateCounter();

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div className="text-center text-white mt-4 text-base gap-4 px-4">
            <p className="mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Juntos há</p>
            <p style={{ fontFamily: "'Great Vibes', cursive" }}>{timeElapsed}</p>
        </div>
    );
};

export default RelationshipCounter;
