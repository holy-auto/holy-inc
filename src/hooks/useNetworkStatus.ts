import { useEffect, useState } from "react";

export interface NetworkState {
  online: boolean;
  effectiveType: string | null;
  downlink: number | null;
}

export default function useNetworkStatus(): NetworkState {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [effectiveType, setEffectiveType] = useState<string | null>(null);
  const [downlink, setDownlink] = useState<number | null>(null);

  useEffect(() => {
    const updateConnection = () => {
      setOnline(navigator.onLine);
      const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
      if (conn) {
        setEffectiveType(conn.effectiveType || null);
        setDownlink(conn.downlink || null);
      }
    };

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (conn) {
      conn.addEventListener("change", updateConnection);
      updateConnection();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (conn) {
        conn.removeEventListener("change", updateConnection);
      }
    };
  }, []);

  return { online, effectiveType, downlink };
}