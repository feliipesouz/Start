'use client'
import React, { useRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

interface AudioPlayerProps {
    audioUrl: string
    playing?: boolean
    autoUnmute?: boolean
    playerRef?: React.RefObject<ReactPlayer>
}

export default function AudioPlayer({
    audioUrl,
    playing = false,
    autoUnmute = false,
    playerRef,
}: AudioPlayerProps) {
    const internalRef = useRef<ReactPlayer | null>(null)
    const effectiveRef = playerRef || internalRef
    const [muted, setMuted] = useState(!autoUnmute)

    useEffect(() => {
        if (playing && autoUnmute) {
            setMuted(false)
        } else if (playing && !autoUnmute) {
            setMuted(true)
            const timeout = setTimeout(() => setMuted(false), 500)
            return () => clearTimeout(timeout)
        }
    }, [playing, autoUnmute])

    return (
        <div className="w-full flex justify-center">
            <ReactPlayer
                ref={effectiveRef}
                url={audioUrl}
                playing={playing}
                muted={muted}
                controls
                width="100%"
                height="200px"
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
