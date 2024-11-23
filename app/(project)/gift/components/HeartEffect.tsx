import React, { useEffect, useState } from "react";

const HeartEffect: React.FC = () => {
    const [hearts, setHearts] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((prevHearts) => [...prevHearts, Math.random()]);
        }, 300); // Adiciona um novo coração a cada 300ms

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, []);

    return (
        <div className="heart-effect-container">
            {hearts.map((heart, index) => (
                <span
                    key={index}
                    className="heart"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                >
                    ❤️
                </span>
            ))}
        </div>
    );
};

export default HeartEffect;
