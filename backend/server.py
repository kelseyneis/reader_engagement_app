# Import flask and datetime module for showing date and time
import datetime
from flask import request
from flask import Flask
import logging

safe = ['http://localhost:3000', 'http://localhost:9000']
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


@app.route("/stories/<story>")
def survey(story=""):
    story_text = open(f"stories/{story}")
    return story_text.read()


@app.route('/log_credentials', methods=['POST'])
def login():
    global user
    user = request.get_json().replace(' ', '')
    global logging
    logging.basicConfig(filename=f"{user}_{datetime.datetime.now().strftime('%Y-%m-%d-%X')}.log",
                        level=logging.INFO, format=f"%(asctime)s %(levelname)s : %(message)s")
    app.logger.info('%s logged in successfully', user)
    open(f"{user}.txt", 'w')
    return user


@app.route('/log_questions', methods=['POST'])
def questions():
    answers = request.get_json()
    app.logger.info(answers)
    with open(f"{user}.txt", 'a') as f:
        f.write("\n")
        f.write(str(answers))
    return answers


@app.route('/log_highlights', methods=['POST'])
def highlight():
    highlight = request.get_json()
    app.logger.info(highlight)
    with open(f"{user}.txt", 'a') as f:
        f.write("\nHighlight: ")
        f.write(str(highlight))
    return str(highlight)


# Running app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9000)
