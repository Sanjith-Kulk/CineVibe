import { TrendingUp, Activity, Zap } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: "accuracy" | "loss" | "epoch";
  trend?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  trend,
}) => {
  const iconMap = {
    accuracy: <TrendingUp className="w-6 h-6" />,
    loss: <Activity className="w-6 h-6" />,
    epoch: <Zap className="w-6 h-6" />,
  };

  const colorMap = {
    accuracy: "from-green-400 to-green-600",
    loss: "from-orange-400 to-orange-600",
    epoch: "from-indigo-400 to-indigo-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={`bg-gradient-to-r ${colorMap[icon]} p-4`}>
        <div className="flex items-center justify-between text-white">
          <h3 className="font-semibold">{title}</h3>
          {iconMap[icon]}
        </div>
      </div>
      <div className="p-6">
        <p className="text-4xl font-bold text-gray-900">{value}</p>
        {trend && <p className="text-sm text-gray-500 mt-2">{trend}</p>}
      </div>
    </div>
  );
};
