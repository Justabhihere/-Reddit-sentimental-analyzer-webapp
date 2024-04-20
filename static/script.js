$(document).ready(function() {
    $('#redditForm').submit(function(event) {
        event.preventDefault();
        var username = $('#username').val();
        $.get('/analyze', {username: username}, function(data) {
            if ('error' in data) {
                $('#analysisResult').text('Error: ' + data['error']);
            } else {
                $('#analysisResult').html('');
                var positive = data['positive'];
                var negative = data['negative'];
                var neutral = data['neutral'];
                var sentence = '';

                // Find the maximum value among positive, negative, and neutral
                var maxSentiment = Math.max(positive, negative, neutral);

                // Determine the sentiment category
                if (maxSentiment === positive && positive > negative && positive > neutral) {
                    var positiveSentences = [
                        "Keep up the positivity!",
                        "Your positivity shines through!",
                        "Your positive attitude is inspiring!",
                        "You spread positivity wherever you go!",
                        "Your optimism is contagious!",
                        "You're making a positive impact!",
                        "Your positive energy is uplifting!",
                        "You're a beacon of positivity!",
                        "Your positivity lights up the room!",
                        "Your optimism brightens my day!"
                    ];
                    sentence = positiveSentences[Math.floor(Math.random() * positiveSentences.length)];
                } else if (maxSentiment === negative && negative > positive && negative > neutral) {
                    var negativeSentences = [
                        "Don't let negativity bring you down!",
                        "Stay strong, better days are ahead!",
                        "Every cloud has a silver lining!",
                        "Chin up! You've got this!",
                        "Tough times don't last, tough people do!",
                        "You're stronger than you think!",
                        "Keep pushing forward, you'll overcome!",
                        "This too shall pass!"
                    ];
                    sentence = negativeSentences[Math.floor(Math.random() * negativeSentences.length)];
                } else {
                    var neutralSentences = [
                        "Stay balanced and keep moving forward!",
                        "Sometimes neutrality is the best approach!",
                        "Life is full of ups and downs, stay steady!",
                        "You're in a state of equilibrium!",
                        "Find peace in neutrality!",
                        "Maintain your calm amidst the chaos!",
                        "Stay centered and stay focused!",
                        "Embrace the neutrality, it's a moment of rest!"
                    ];
                    sentence = neutralSentences[Math.floor(Math.random() * neutralSentences.length)];
                }

                $('#analysisResult').append('<p>Positive: ' + positive + '%</p>');
                $('#analysisResult').append('<p>Negative: ' + negative + '%</p>');
                $('#analysisResult').append('<p>Neutral: ' + neutral + '%</p>');
                $('#analysisResult').append('<p>' + sentence + '</p>');
            }
        }).fail(function() {
            $('#analysisResult').text('An error occurred while processing the request.');
        });
    });
});
