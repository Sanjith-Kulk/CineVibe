import { useState, useEffect } from "react";
import { MetricsCard } from "../components/MetricsCard";
import { sentimentApi } from "../api/sentimentApi";
import type { ModelMetrics, TrainingProgress } from "../types/sentiment";
import { Loader2, BarChart3 } from "lucide-react";

export const MetricsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [progress, setProgress] = useState<TrainingProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [metricsResponse, progressResponse] = await Promise.all([
        sentimentApi.getModelMetrics(),
        sentimentApi.getTrainingProgress(),
      ]);

      if (metricsResponse.status === "success") {
        setMetrics(metricsResponse.data);
      }
      if (progressResponse.status === "success") {
        setProgress(progressResponse.data);
      }
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Model Performance</h2>
        <p className="text-gray-600 mt-1">
          LSTM-based sentiment analysis model trained on IMDB dataset
        </p>
      </div>

      {/* Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsCard
            title="Test Accuracy"
            value={`${(metrics.accuracy * 100).toFixed(2)}%`}
            icon="accuracy"
            trend="Model performance on test set"
          />
          <MetricsCard
            title="Loss"
            value={metrics.loss.toFixed(4)}
            icon="loss"
            trend="Binary cross-entropy loss"
          />
          <MetricsCard
            title="Epochs Trained"
            value={metrics.epoch}
            icon="epoch"
            trend="Training iterations completed"
          />
        </div>
      )}

      {/* Training Progress Visualization */}
      {progress && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
                Training History
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Accuracy progression over {progress.totalEpochs} epochs
              </p>
            </div>
          </div>

          {/* Simple Bar Chart Visualization */}
          <div className="space-y-2">
            {progress.trainAccuracy.slice(-10).map((acc, idx) => {
              const epoch = progress.totalEpochs - 9 + idx;
              return (
                <div key={epoch} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 w-16">
                    Epoch {epoch}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${acc * 100}%` }}
                    >
                      <span className="text-xs font-semibold text-white">
                        {(acc * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Test Accuracy Line */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                Final Test Accuracy
              </span>
              <span className="text-lg font-bold text-green-600">
                {(progress.testAccuracy * 100).toFixed(2)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div
                className="h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
                style={{ width: `${progress.testAccuracy * 100}%` }}
              >
                <span className="text-sm font-bold text-white">
                  Test Set Performance
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Model Architecture Info */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Model Architecture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Model Type</p>
            <p className="font-semibold text-gray-900">
              LSTM (Long Short-Term Memory)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Vocabulary Size</p>
            <p className="font-semibold text-gray-900">50,000 words</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Sequence Length</p>
            <p className="font-semibold text-gray-900">500 tokens</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Embedding Dimension</p>
            <p className="font-semibold text-gray-900">128</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">LSTM Units</p>
            <p className="font-semibold text-gray-900">64</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Activation</p>
            <p className="font-semibold text-gray-900">
              Sigmoid (Binary Classification)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
