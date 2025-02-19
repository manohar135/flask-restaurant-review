from flask import Flask, render_template, request, jsonify
from joblib import load

app = Flask(__name__)

# Load model once at startup
model = load('ML_models/Review.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=["POST"])
def predict():
    review = request.form.get('comment')  # Get the review text
    if not review:
        return jsonify({'error': 'No review provided'}), 400  # Handle empty input

    prediction = model.predict([review])[0]  # Get prediction result
    return jsonify({'prediction': int(prediction)})  # Return JSON response

if __name__ == '__main__':
    app.run(debug=True)
