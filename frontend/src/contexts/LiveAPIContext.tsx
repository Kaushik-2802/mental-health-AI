import { createContext, FC, ReactNode, useContext, useState } from "react";
import { useLiveAPI, UseLiveAPIResults } from "../hooks/use-live-api";

interface LiveAPIContextType extends UseLiveAPIResults {
  responseModality : string;
  setResponseModality : (responseModality : string) => void;
}

const LiveAPIContext = createContext<LiveAPIContextType | undefined>(undefined);

export type LiveAPIProviderProps = {
  children: ReactNode;
  url?: string;
  apiKey: string;
};

export const LiveAPIProvider: FC<LiveAPIProviderProps> = ({
  url,
  apiKey,
  children,
}) => {
  const liveAPI = useLiveAPI({ url, apiKey });
  const [responseModality, setResponseModality] = useState<string>("audio");

  return (
    <LiveAPIContext.Provider value={{...liveAPI, responseModality, setResponseModality}}>
      {children}
    </LiveAPIContext.Provider>
  );
};

export const useLiveAPIContext = () => {
  const context = useContext(LiveAPIContext);
  if (!context) {
    throw new Error("useLiveAPIContext must be used within a LiveAPIProvider");
  }
  return context;
};
