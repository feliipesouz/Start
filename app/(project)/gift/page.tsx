"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function GiftPage() {
    const router = useRouter();

    // Dados fictícios (exemplo)
    const giftData = {
        nome: 'Nome do Apresentador',
        tipoPresente: 'Tipo de presente',
        mensagem: 'Some default post text here... I have nothing to say but you need to buy it.',
        videoLink: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        avatar: '/path/to/avatar.png',
        presentadorImage: '/path/to/presenter-image.png',
    };

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
                    <Image
                        src={giftData.avatar}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="ml-3">
                        <h2 className="text-lg font-semibold">{giftData.nome}</h2>
                        <p className="text-sm text-gray-400">{giftData.tipoPresente}</p>
                    </div>
                </div>

                <p className="mb-6 text-gray-400">{giftData.mensagem}</p>

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
