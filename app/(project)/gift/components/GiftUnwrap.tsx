import React from 'react';
import { FaGift } from 'react-icons/fa';

interface GiftUnwrapProps {
    onUnwrap: () => void;
}

export default function GiftUnwrap({ onUnwrap }: GiftUnwrapProps) {
    return (
        <div className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl text-white mb-8 animate-pulse">Clique aqui para abrir seu presente</h2>
                <button
                    onClick={onUnwrap}
                    className="transform hover:scale-110 transition-transform duration-300"
                >
                    <FaGift className="text-pink-500 text-8xl animate-bounce" />
                </button>
            </div>
        </div>
    );
} 