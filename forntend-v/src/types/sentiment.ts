export interface Review {
  id: number;
  text: string;
  sentiment: "Positive" | "Negative";
  confidence: number;
  timestamp: string;
}

export interface ModelMetrics {
  accuracy: number;
  loss: number;
  epoch: number;
}

export interface TrainingProgress {
  currentEpoch: number;
  totalEpochs: number;
  trainAccuracy: number[];
  testAccuracy: number;
  isTraining: boolean;
  chartData: {
    epoch: number;
    training: number;
    validation: number;
    test: number;
  }[]; // Add this line
}

export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}
