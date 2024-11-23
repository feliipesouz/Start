import React, { useEffect, useState } from "react";

interface TypeRelationshipProps {
  proximidade: string
}

const HeartEffect: React.FC<TypeRelationshipProps> = ({ proximidade }) => {
  const [hearts, setHearts] = useState<number[]>([]);
  
  const getEmojis = (proximidade: string): string[] => {
    switch (proximidade.toLowerCase()) {
      case "pet":
        return ["❤️", "🐾"];
      case "jesus cristo":
        return ["❤️", "🙏", "✝️"];
      default:
        return ["❤️"];
    }
  };

  const emojis = getEmojis(proximidade);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [...prevHearts, Math.random()]);
    }, 3000); // Adiciona um novo coração a cada 300ms

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
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </span>
      ))}
    </div>
  );
};

export default HeartEffect;
