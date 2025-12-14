import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface LiveBadgeProps {
  isLive?: boolean;
}

export const LiveBadge: React.FC<LiveBadgeProps> = ({ isLive = true }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setPulse((prev) => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  if (!isLive) return null;

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-100 rounded-full">
      <Activity
        className={`w-4 h-4 text-green-600 transition-transform ${pulse ? "scale-110" : "scale-100"}`}
      />
      <span className="text-sm font-medium text-green-800">Live Updates</span>
      <span
        className={`w-2 h-2 rounded-full bg-green-500 ${pulse ? "animate-ping" : ""}`}
      />
    </div>
  );
};
