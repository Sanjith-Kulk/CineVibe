import { Film } from "lucide-react";

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Film className="w-8 h-8" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                IMDB Sentiment Analyzer
              </h1>
              <p className="text-sm text-indigo-100 mt-1">
                Real-time Movie Review Analysis
              </p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => onNavigate?.("home")}
              className="hover:text-indigo-200 transition-colors font-medium"
            >
              Reviews
            </button>
            <button
              onClick={() => onNavigate?.("metrics")}
              className="hover:text-indigo-200 transition-colors font-medium"
            >
              Metrics
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
