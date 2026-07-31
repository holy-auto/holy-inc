import { useEffect, useState } from "react";
import useNetworkStatus from "@/hooks/useNetworkStatus";

export default function OfflineIndicator() {
  const { online } = useNetworkStatus();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!online) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [online]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
        online ? "bg-emerald-500 text-white" : "bg-teal-500 text-white"
      }`}
    >
      <i className={online ? "ri-wifi-line" : "ri-wifi-off-line"} />
      <span>{online ? "オンラインに戻りました" : "オフライン - キャッシュ済みコンテンツを表示しています"}</span>
    </div>
  );
}