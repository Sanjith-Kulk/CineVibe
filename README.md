CineVine is a deep learning–based sentiment analysis system that classifies movie reviews as positive or negative.
The model is trained on the IMDb Movie Reviews dataset and is designed to capture contextual meaning in natural language rather than relying on simple keyword matching.

Features
Binary sentiment classification (Positive / Negative)
Trained on a large-scale real-world dataset (IMDb)
Handles variable-length text sequences
End-to-end NLP pipeline: preprocessing → modeling → evaluation

Model Overview
The model uses a sequence-based neural network to learn semantic and contextual relationships between words in a review.

Key components:
Text preprocessing & tokenization
Word embeddings for dense text representation
Recurrent neural architecture for sequence learning
Sigmoid-based output layer for binary classification

Dataset

IMDb Movie Reviews Dataset
50,000 labeled reviews
25,000 training samples
25,000 testing samples
Balanced classes (positive & negative)

Tech Stack
Python
TensorFlow / Keras
NumPy
Pandas

Scikit-learn

NLTK
