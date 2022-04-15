# Import flask and datetime module for showing date and time
import datetime
from flask import request
from flask import Flask
import logging

safe = ['http://0.0.0.0:9000', 'http://0.0.0.0:80']
# Initializing flask app

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    r = request.referrer[:-1]
    if r in safe:
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
        response.headers.add(
            'Access-Control-Allow-Headers', 'X-Requested-With')
        response.headers.add('Access-Control-Allow-Headers', 'Authorization')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET, POST, OPTIONS, PUT, DELETE')
    return response


@app.route("/backend/stories/<story>")
def survey(story=""):
    story_text = open(f"{story}")
    return story_text.read()


@app.route('/backend/log_credentials', methods=['POST'])
def login():
    global user
    user = request.get_json().replace(' ', '')
    global logging
    logging.basicConfig(filename=f"./logs/{user}_{datetime.datetime.now().strftime('%Y-%m-%d-%X')}.log",
                        level=logging.INFO, format=f"%(asctime)s %(levelname)s : %(message)s")
    app.logger.info(f'{user} logged in successfully')
    with open(f"./logs/{user}.txt", 'w') as f:
        f.write(
            f"{datetime.datetime.now().strftime('%Y-%m-%d-%X')} {user} logged in successfully\n")
    return user


@app.route('/backend/log_questions/<survey>', methods=['POST'])
def questions(survey):
    answers = request.get_json()
    app.logger.info(f"Survey{survey}: {answers}")
    with open(f"./logs/{user}.txt", 'a') as f:
        f.write(
            f"{datetime.datetime.now().strftime('%Y-%m-%d-%X')} Survey{survey}: {str(answers)}\n")
    return answers


@app.route('/backend/log_highlights', methods=['POST'])
def highlight():
    highlight = request.get_json()
    app.logger.info(f"Highlight: {highlight}")
    with open(f"./logs/{user}.txt", 'a') as f:
        f.write(
            f"{datetime.datetime.now().strftime('%Y-%m-%d-%X')} Highlight: {str(highlight)}\n")
    return str(highlight)


# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=9000)
