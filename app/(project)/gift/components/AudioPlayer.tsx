import React from "react";
import ReactPlayer from "react-player";

interface AudioPlayerProps {
    audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    return (
        <div className="w-full max-w-md mx-auto rounded-lg shadow-md">
            <ReactPlayer
                url={audioUrl}
                playing={true}
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
