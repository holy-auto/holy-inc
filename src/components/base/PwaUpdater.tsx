import { useEffect, useState, useCallback } from "react";

export default function PwaUpdater() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [showRefreshToast, setShowRefreshToast] = useState(false);

  // Defer PWA initialization by 8 seconds to avoid blocking initial page render
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!("serviceWorker" in navigator)) return;

      const handleControllerChange = () => {
        setNeedRefresh(true);
      };

      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === "NEW_VERSION_AVAILABLE") {
          setNeedRefresh(true);
        }
      };

      navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);
      navigator.serviceWorker.addEventListener("message", handleMessage);

      return () => {
        navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
        navigator.serviceWorker.removeEventListener("message", handleMessage);
      };
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Show refresh toast when update available
  useEffect(() => {
    if (needRefresh) {
      setShowRefreshToast(true);
    }
  }, [needRefresh]);

  const handleRefresh = useCallback(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
      });
    }
    window.location.reload();
  }, []);

  const handleDismissRefresh = useCallback(() => {
    setShowRefreshToast(false);
    setNeedRefresh(false);
  }, []);

  if (!showRefreshToast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3">
      {/* Update available toast */}
      {showRefreshToast && (
        <div className="flex items-center gap-3 rounded-lg bg-neutral-900/90 px-5 py-3 text-sm text-white shadow-lg backdrop-blur-md">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/20">
            <i className="ri-refresh-line text-teal-400 text-sm" />
          </div>
          <span>新しいバージョンが利用可能です</span>
          <button
            onClick={handleRefresh}
            className="ml-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 whitespace-nowrap"
          >
            更新する
          </button>
          <button
            onClick={handleDismissRefresh}
            className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            aria-label="閉じる"
          >
            <i className="ri-close-line text-xs" />
          </button>
        </div>
      )}
    </div>
  );
}