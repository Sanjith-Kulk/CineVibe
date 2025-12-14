import type {
  Review,
  ModelMetrics,
  TrainingProgress,
  ApiResponse,
} from "../types/sentiment";

// Mock data generator based on IMDB notebook structure
const generateMockReviews = (): Review[] => {
  const sampleReviews = [
    "This movie was absolutely fantastic! The acting was superb and the plot kept me engaged throughout.",
    "Terrible waste of time. Poor acting and a confusing storyline that went nowhere.",
    "One of the best films I've seen this year. Highly recommended for everyone!",
    "Disappointing and boring. I expected much more from this director.",
    "Brilliant cinematography and outstanding performances. A masterpiece!",
    "Not worth watching. The script was poorly written and the pacing was awful.",
    "Amazing film with great character development and emotional depth.",
    "Dull and predictable. I couldn't wait for it to end.",
    "Exceptional storytelling with beautiful visuals. Loved every minute!",
    "Complete disaster. Bad directing, bad acting, bad everything.",
  ];

  return sampleReviews.map((text, index) => ({
    id: index + 1,
    text,
    sentiment: index % 2 === 0 ? "Positive" : "Negative",
    confidence: 0.85 + Math.random() * 0.14,
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
  }));
};

// Simulated API calls
export const sentimentApi = {
  // Fetch all reviews
  async getReviews(): Promise<ApiResponse<Review[]>> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      data: generateMockReviews(),
      status: "success",
    };
  },

  // Fetch a single review by ID
  async getReviewById(id: number): Promise<ApiResponse<Review>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const reviews = generateMockReviews();
    const review = reviews.find((r) => r.id === id);

    if (!review) {
      return {
        data: reviews[0],
        status: "error",
        message: "Review not found",
      };
    }

    return {
      data: review,
      status: "success",
    };
  },

  // Fetch model metrics
  async getModelMetrics(): Promise<ApiResponse<ModelMetrics>> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      data: {
        accuracy: 0.88,
        loss: 0.32,
        epoch: 30,
      },
      status: "success",
    };
  },

  // Fetch training progress
  async getTrainingProgress(): Promise<ApiResponse<TrainingProgress>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const epochs = 30;
    const trainAccuracy = [
      0.8, 0.89, 0.93, 0.97, 0.98, 0.99, 0.99, 0.99, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0,
    ];
    const valAccuracy = [
      0.76, 0.87, 0.88, 0.87, 0.88, 0.87, 0.87, 0.86, 0.87, 0.87, 0.87, 0.86,
      0.87, 0.87, 0.86, 0.87, 0.87, 0.87, 0.87, 0.87, 0.88, 0.87, 0.86, 0.86,
      0.86, 0.87, 0.87, 0.87, 0.86, 0.86,
    ];

    // Generate chartData for the line chart
    const chartData = trainAccuracy.map((acc, idx) => ({
      epoch: idx + 1,
      training: acc,
      validation: valAccuracy[idx],
      test: 0.88,
    }));

    return {
      data: {
        currentEpoch: epochs,
        totalEpochs: epochs,
        trainAccuracy,
        testAccuracy: 0.88,
        isTraining: false,
        chartData,
      },
      status: "success",
    };
  },

  // Analyze new review (mock prediction)
  async analyzeReview(text: string): Promise<ApiResponse<Review>> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple mock sentiment detection based on keywords
    const positiveWords = [
      "good",
      "great",
      "excellent",
      "amazing",
      "fantastic",
      "love",
      "best",
      "wonderful",
    ];
    const negativeWords = [
      "bad",
      "terrible",
      "awful",
      "worst",
      "hate",
      "disappointing",
      "poor",
    ];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter((word) =>
      lowerText.includes(word),
    ).length;
    const negativeCount = negativeWords.filter((word) =>
      lowerText.includes(word),
    ).length;

    const sentiment = positiveCount > negativeCount ? "Positive" : "Negative";
    const confidence = 0.75 + Math.random() * 0.2;

    return {
      data: {
        id: Date.now(),
        text,
        sentiment,
        confidence,
        timestamp: new Date().toISOString(),
      },
      status: "success",
    };
  },
};
