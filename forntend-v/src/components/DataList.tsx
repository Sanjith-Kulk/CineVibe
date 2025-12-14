import { ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import type { Review } from "../types/sentiment";

interface DataListProps {
  reviews: Review[];
  onSelectReview?: (review: Review) => void;
}

export const DataList: React.FC<DataListProps> = ({
  reviews,
  onSelectReview,
}) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          onClick={() => onSelectReview?.(review)}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
        >
          <div className="p-5">
            {/* Sentiment Badge */}
            <div className="flex items-center justify-between mb-3">
              <div
                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full ${
                  review.sentiment === "Positive"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {review.sentiment === "Positive" ? (
                  <ThumbsUp className="w-4 h-4" />
                ) : (
                  <ThumbsDown className="w-4 h-4" />
                )}
                <span className="font-semibold text-sm">
                  {review.sentiment}
                </span>
              </div>

              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(review.timestamp)}</span>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 line-clamp-3 group-hover:text-gray-900 transition-colors">
              {review.text}
            </p>

            {/* Confidence Score */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Confidence</span>
                <span className="font-semibold text-indigo-600">
                  {(review.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    review.sentiment === "Positive"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${review.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
