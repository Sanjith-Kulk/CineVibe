import { useState, useEffect } from "react";
import { Brain, Sparkles, TrendingUp, Database, Quote } from "lucide-react";
import { ReviewInput } from "../components/ReviewInput";
import { sentimentApi } from "../api/sentimentApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  Review,
  ModelMetrics,
  TrainingProgress,
} from "../types/sentiment";

export const HomePage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [progress, setProgress] = useState<TrainingProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reviewsRes, metricsRes, progressRes] = await Promise.all([
        sentimentApi.getReviews(),
        sentimentApi.getModelMetrics(),
        sentimentApi.getTrainingProgress(),
      ]);

      if (reviewsRes.status === "success") setReviews(reviewsRes.data);
      if (metricsRes.status === "success") setMetrics(metricsRes.data);
      if (progressRes.status === "success") setProgress(progressRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fadeInUp">
            <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
              <Brain className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-block">🎭</span>{" "}
            <span className="gradient-text">Sentiment AI</span>{" "}
            <span className="inline-block">🧠</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            An interactive deep learning showcase powered by LSTM neural
            networks trained on the IMDB dataset.
          </p>
        </div>
      </section>

      {/* Live Sentiment Analyzer Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div
            className="glass rounded-3xl p-8 md:p-10 animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-purple-300">
                Live Sentiment Analyzer
              </h2>
            </div>
            <ReviewInput />
          </div>
        </div>
      </section>

      {/* Model Performance Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-3 mb-8 animate-slideInLeft">
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Model Performance
            </h2>
          </div>

          {!loading && metrics && progress && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Test Accuracy Card */}
              <div
                className="glass glass-hover rounded-2xl p-6 animate-slideInLeft"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">Test Accuracy</p>
                <p className="text-4xl font-bold gradient-text mb-1">
                  {(metrics.accuracy * 100).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-500">
                  Final evaluation on test set
                </p>
              </div>

              {/* Model Type Card */}
              <div
                className="glass glass-hover rounded-2xl p-6 animate-slideInLeft"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">Model Type</p>
                <p className="text-4xl font-bold mb-1">LSTM 🧠</p>
                <p className="text-xs text-gray-500">Long Short-Term Memory</p>
              </div>

              {/* Epochs Card */}
              <div
                className="glass glass-hover rounded-2xl p-6 animate-slideInLeft"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <Database className="w-6 h-6 text-pink-400" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">Training Epochs</p>
                <p className="text-4xl font-bold gradient-text mb-1">
                  {metrics.epoch}
                </p>
                <p className="text-xs text-gray-500">Iterations completed</p>
              </div>
            </div>
          )}

          {/* Training Chart */}
          {!loading && progress && (
            <div
              className="glass rounded-2xl p-8 animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  Training, Validation, and Test Accuracy 📊
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-gray-400">Training</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-gray-400">Validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-400">Test</span>
                  </div>
                </div>
              </div>

              {/* Recharts Line Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progress.chartData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="epoch"
                      stroke="#64748b"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      label={{
                        value: "Epochs",
                        position: "insideBottom",
                        offset: -5,
                        fill: "#64748b",
                        fontSize: 13,
                      }}
                    />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                      domain={[0, 1.2]}
                      label={{
                        value: "Accuracy",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#64748b",
                        fontSize: 13,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "12px",
                        padding: "8px 12px",
                      }}
                      labelStyle={{ color: "#e2e8f0", fontSize: "13px" }}
                      itemStyle={{ fontSize: "12px" }}
                      formatter={(value) => `${(value * 100).toFixed(1)}%`}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "13px" }}
                      iconType="circle"
                    />
                    <Line
                      type="monotone"
                      dataKey="training"
                      stroke="#3b82f6"
                      name="Training Accuracy"
                      strokeWidth={2.5}
                      dot={{ fill: "#3b82f6", r: 5, strokeWidth: 0 }}
                      activeDot={{ r: 7 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="validation"
                      stroke="#f97316"
                      name="Validation Accuracy"
                      strokeWidth={2.5}
                      dot={{ fill: "#f97316", r: 5, strokeWidth: 0 }}
                      activeDot={{ r: 7 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="test"
                      stroke="#ef4444"
                      name="Test"
                      strokeWidth={2.5}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Dataset Samples Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-3 mb-8 animate-slideInLeft">
            <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">Dataset Samples</h2>
          </div>

          <div className="flex items-center space-x-2 mb-6 text-gray-400 animate-fadeIn">
            <Database className="w-4 h-4" />
            <p className="text-sm">Source: IMDB 50K Movie Reviews Dataset</p>
          </div>

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, idx) => (
                <div
                  key={review.id}
                  className="glass glass-hover rounded-2xl p-6 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="w-8 h-8 text-purple-400/50" />
                    <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                      ID: #{review.id}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 italic line-clamp-3">
                    "{review.text}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
                        review.sentiment === "Positive"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      <span className="text-sm font-semibold">
                        {review.sentiment}
                      </span>
                    </div>
                    <span className="text-sm text-indigo-400 font-mono">
                      Conf: {(review.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
