import { useRef, useState } from "react";
import { LiveAPIProvider, useLiveAPIContext } from "../contexts/LiveAPIContext";
import SidePanel from "../components/SidePanel";
import { Altair } from "../components/Altair";
import ControlTray from "../components/control-tray/ControlTray";
import BallVisualizer from "../components/design/BallVisualizer";
import cn from "classnames";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (typeof API_KEY !== "string") {
  throw new Error("set VITE_GEMINI_API_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

function VoiceChatPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white font-mono">
      <LiveAPIProvider url={uri} apiKey={API_KEY}>
        <div className="flex h-full w-full bg-neutral-900 text-gray-300">
          <SidePanel />
          <main className="relative flex flex-col items-center justify-center flex-grow gap-4 max-w-full overflow-hidden">
            <div className="flex flex-1 items-center justify-center">
              <Altair/>
              <BallVisualizer />
              <video
                className={cn("flex-grow max-w-[90%] rounded-2xl", {
                  hidden: !videoRef.current || !videoStream,
                })}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>
            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
            >
              {/* Custom buttons go here */}
            </ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default VoiceChatPage;
