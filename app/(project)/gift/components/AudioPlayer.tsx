'use client'

import React, { useRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

interface AudioPlayerProps {
    audioUrl: string
    playing?: boolean
    autoUnmute?: boolean
}

export default function AudioPlayer({
    audioUrl,
    playing = false,
    autoUnmute = false,
}: AudioPlayerProps) {
    const playerRef = useRef<ReactPlayer | null>(null)

    // Inicializa o estado com base no `autoUnmute`
    const [muted, setMuted] = useState(!autoUnmute)

    useEffect(() => {
        if (playing && !autoUnmute) {
            // Se não estiver no preview, aguarda interação e desmuta com delay
            const timeout = setTimeout(() => {
                setMuted(false)
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [playing, autoUnmute])

    return (
        <div className="w-full flex justify-center">
            <ReactPlayer
                ref={playerRef}
                url={audioUrl}
                playing={playing}
                muted={muted}
                controls
                width="100%"
                height="80px"
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: 1,
                            controls: 1,
                            modestbranding: 1,
                            rel: 0,
                            playsinline: 1,
                            origin: typeof window !== 'undefined' ? window.location.origin : '',
                        },
                    },
                }}
            />
        </div>
    )
}
