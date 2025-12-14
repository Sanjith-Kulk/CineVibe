import { X, ThumbsUp, ThumbsDown, TrendingUp, Calendar } from "lucide-react";
import type { Review } from "../types/sentiment";

interface DetailPanelProps {
  review: Review | null;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  review,
  onClose,
}) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Review Analysis</h2>
              <div className="flex items-center space-x-4">
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                    review.sentiment === "Positive"
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {review.sentiment === "Positive" ? (
                    <ThumbsUp className="w-5 h-5" />
                  ) : (
                    <ThumbsDown className="w-5 h-5" />
                  )}
                  <span className="font-bold">{review.sentiment}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Review Text */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="mr-2">📝</span>
              Review Text
            </h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              {review.text}
            </p>
          </div>

          {/* Confidence Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Prediction Confidence
            </h3>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">Confidence Score</span>
                <span className="text-3xl font-bold text-indigo-600">
                  {(review.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    review.sentiment === "Positive"
                      ? "bg-gradient-to-r from-green-400 to-green-600"
                      : "bg-gradient-to-r from-red-400 to-red-600"
                  }`}
                  style={{ width: `${review.confidence * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-3">
                The model is{" "}
                <strong>{(review.confidence * 100).toFixed(1)}%</strong>{" "}
                confident that this review expresses a{" "}
                <strong>{review.sentiment.toLowerCase()}</strong> sentiment.
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              Metadata
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Review ID</p>
                <p className="font-semibold text-gray-900">#{review.id}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Analysis Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(review.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
