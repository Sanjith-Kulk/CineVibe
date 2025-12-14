import React, { useState } from "react";

const SentimentAnalyzer = () => {
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5001"; // Change to your backend URL

  const analyzeSentiment = async () => {
    if (!review.trim()) {
      setError("Please enter a review");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to analyze sentiment. Make sure the backend is running.",
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      analyzeSentiment();
    }
  };

  const getSentimentColor = (sentiment) => {
    return sentiment === "Positive" ? "text-green-600" : "text-red-600";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        IMDB Sentiment Analyzer
      </h1>

      <div className="mb-6">
        <label
          htmlFor="review"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter Movie Review
        </label>
        <textarea
          id="review"
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Type or paste a movie review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <p className="text-xs text-gray-500 mt-1">
          Press Ctrl+Enter to analyze
        </p>
      </div>

      <button
        onClick={analyzeSentiment}
        disabled={loading || !review.trim()}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
          loading || !review.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analyzing...
          </span>
        ) : (
          "Analyze Sentiment"
        )}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Results</h2>
            <span
              className={`text-2xl font-bold ${getSentimentColor(result.sentiment)}`}
            >
              {result.sentiment}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Confidence</span>
              <span className="font-semibold">{result.confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getConfidenceColor(
                  result.confidence,
                )}`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Raw Score:</strong> {result.score.toFixed(4)}
            </p>
          </div>

          {result.review && (
            <div className="mt-4 p-3 bg-white rounded border border-gray-200">
              <p className="text-sm text-gray-700 italic">"{result.review}"</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Powered by LSTM Neural Network trained on IMDB Dataset</p>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
