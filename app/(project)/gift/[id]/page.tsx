"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation'; 
import { useParams } from 'next/navigation';
import Image from 'next/image';

function GiftPage() {
  const router = useRouter();
  const { id } = useParams();
  const [giftData, setGiftData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/get-gift-data/${id}`);
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setGiftData(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados do presente:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(); // Somente busca os dados se o id estiver presente
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>; // Renderiza enquanto está carregando
  }

  if (!giftData) {
    return <div>Presente não encontrado</div>; // Exibe caso não encontre os dados
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative bg-gray-800 rounded-xl p-8 max-w-lg w-full text-white">
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-400 transition duration-300"
          onClick={() => router.push('/')}
        >
          X
        </button>

        <div className="flex items-center mb-4">
          {giftData?.uploadUrls.map((url: string, index: number) => (
            <Image
              key={index}
              src={url}
              alt={`Imagem ${index + 1}`}
              width={40}
              height={40}
              className="rounded-full"
            />
          ))}
          <div className="ml-3">
            <h2 className="text-lg font-semibold">{giftData?.nome}</h2>
            <p className="text-sm text-gray-400">{giftData?.tipoPresente}</p>
          </div>
        </div>

        <p className="mb-6 text-gray-400">{giftData?.mensagem}</p>

        <div className="mb-6">
          <iframe
            width="100%"
            height="200"
            src={giftData.videoLink}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>

        <button className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Editar
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">Feito por: Você é Especial.com</p>
      </div>
    </div>
  );
}

// Usando Suspense para lidar com o estado de carregamento
export default function GiftPageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <GiftPage />
    </Suspense>
  );
}
