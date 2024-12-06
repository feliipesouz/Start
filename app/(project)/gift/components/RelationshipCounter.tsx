import React, { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";
import { toZonedTime } from "date-fns-tz"; // Para ajustar para o fuso horário de Brasília

interface CounterProps {
    startDate: string;
}

const RelationshipCounter: React.FC<CounterProps> = ({ startDate }) => {
    const [timeElapsed, setTimeElapsed] = useState("");

    useEffect(() => {
        const calculateTimeElapsed = (startDate: string) => {
            const timeZone = "America/Sao_Paulo"; // Fuso horário de Brasília
            const start = toZonedTime(new Date(startDate), timeZone); // Ajusta a data inicial para o fuso horário
            const now = toZonedTime(new Date(), timeZone); // Ajusta a data atual para o fuso horário

            const duration = intervalToDuration({ start, end: now });

            // Função para retornar singular ou plural
            const pluralize = (value: number, singular: string, plural: string) => {
                return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
            };

            return `${pluralize(duration.years || 0, "ano", "anos")}, ${pluralize(
                duration.months || 0,
                "mês",
                "meses"
            )}, ${pluralize(duration.days || 0, "dia", "dias")}, ${pluralize(
                duration.hours || 0,
                "hora",
                "horas"
            )}, ${pluralize(duration.minutes || 0, "minuto", "minutos")} e ${pluralize(
                duration.seconds || 0,
                "segundo",
                "segundos")}`;
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
            <p className="mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Colecionando momentos há</p>
            <p style={{ fontFamily: "'Great Vibes', cursive" }}>{timeElapsed}</p>
        </div>
    );
};

export default RelationshipCounter;
