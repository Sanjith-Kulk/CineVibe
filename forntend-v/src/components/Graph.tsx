import React from "react";

export default function AccuracyChart({ loading, progress }) {
  if (loading || !progress) return null;

  const train = progress.trainAccuracy;
  const val = progress.valAccuracy;
  const test = progress.testAccuracy;

  // Utility to convert to SVG points
  const toPoints = (arr) =>
    arr
      .map((acc, i) => `${(i / (arr.length - 1)) * 100},${100 - acc * 100}`)
      .join(" ");

  return (
    <div
      className="glass rounded-2xl p-8 animate-fadeInUp"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">
          Training, Validation & Test Accuracy 📊
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-400">Training</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-400" />
            <span className="text-gray-400">Validation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-gray-400">Test</span>
          </div>
        </div>
      </div>

      {/* Interactive Graph */}
      <div className="relative h-80 w-full group">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          {/* Gridlines */}
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={(i * 100) / 4}
              x2="100"
              y2={(i * 100) / 4}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />
          ))}

          {/* Animated Training Line */}
          <polyline
            className="train-line"
            fill="none"
            stroke="rgb(59,130,246)"
            strokeWidth="2"
            points={toPoints(train)}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="200"
              to="0"
              dur="1.5s"
              fill="freeze"
            />
          </polyline>

          {/* Training Dots */}
          {train.map((acc, i) => (
            <circle
              key={i}
              cx={(i / (train.length - 1)) * 100}
              cy={100 - acc * 100}
              r="1.8"
              fill="rgb(59,130,246)"
              className="opacity-0 group-hover:opacity-100 transition"
            />
          ))}

          {/* Validation Line */}
          <polyline
            fill="none"
            stroke="rgb(249,115,22)"
            strokeWidth="2"
            points={toPoints(val)}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="200"
              to="0"
              dur="1.5s"
              fill="freeze"
            />
          </polyline>

          {val.map((acc, i) => (
            <circle
              key={i}
              cx={(i / (val.length - 1)) * 100}
              cy={100 - acc * 100}
              r="1.8"
              fill="rgb(249,115,22)"
              className="opacity-0 group-hover:opacity-100 transition"
            />
          ))}

          {/* Test Accuracy Flat Line */}
          <line
            x1="0"
            y1={100 - test * 100}
            x2="100"
            y2={100 - test * 100}
            stroke="rgb(239,68,68)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">Epochs</p>
    </div>
  );
}
