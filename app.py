from flask import Flask, render_template, request, jsonify, send_from_directory
from textblob import TextBlob
import praw
from prawcore.exceptions import NotFound

app = Flask(__name__)

# Initialize Reddit instance
reddit = praw.Reddit(
    client_id='FWz1BbvLMhBBFECF0AbxEQ',
    client_secret='rMpJJHSadXfcPA2gvi2_-9Caf_wX2g',
    user_agent='Abhishek-Sentiment-Analyzer by /u/Important-Yak3279'
)

# Route to serve favicon
@app.route('/icon/<path:filename>')
def favicon(filename):
    return send_from_directory('icon', filename)

# Route to render index.html
@app.route('/')
def index():
    return render_template('index.html')

# Route to analyze Reddit username
@app.route('/analyze')
def analyze():
    username = request.args.get('username')
    try:
        user = reddit.redditor(username)
        positive = 0
        negative = 0
        neutral = 0
        for submission in user.submissions.new(limit=10):
            blob = TextBlob(submission.title)
            if blob.sentiment.polarity > 0:
                positive += 1
            elif blob.sentiment.polarity < 0:
                negative += 1
            else:
                neutral += 1
        
        total = positive + negative + neutral
        if total == 0:
            return jsonify({'positive': 0, 'negative': 0, 'neutral': 0})
        
        return jsonify({
            'positive': round(positive / total * 100, 2),
            'negative': round(negative / total * 100, 2),
            'neutral': round(neutral / total * 100, 2)
        })
    
    except NotFound:
        return jsonify({'error': 'User not found or no posts available'})

if __name__ == '__main__':
    app.run(debug=True)
