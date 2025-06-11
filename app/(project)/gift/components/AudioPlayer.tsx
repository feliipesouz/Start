import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

interface AudioPlayerProps {
    audioUrl: string;
    playing?: boolean;
    onPlayerReady?: (player: ReactPlayer) => void;
}

export default function AudioPlayer({ audioUrl, playing = false, onPlayerReady }: AudioPlayerProps) {
    const playerRef = useRef<ReactPlayer>(null);

    useEffect(() => {
        if (playerRef.current && onPlayerReady) {
            onPlayerReady(playerRef.current);
        }
    }, [onPlayerReady]);

    return (
        <div className="w-full max-w-md mx-auto rounded-lg shadow-md">
            <ReactPlayer
                ref={playerRef}
                url={audioUrl}
                playing={playing}
                controls
                width="100%"
                height="80px"
                config={{
                    youtube: {
                        playerVars: { showinfo: 0, controls: 1 },
                    },
                }}
                style={{ display: "flex", justifyContent: "center" }}
            />
        </div>
    );
}
