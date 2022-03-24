# Import flask and datetime module for showing date and time
from flask import Flask
import os
import datetime
  
x = datetime.datetime.now()
  
# Initializing flask app
app = Flask(__name__)
  
  
# Route for seeing a data
@app.route('/data')
def get_time():
  
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }

@app.route("/stories/<story>")
def survey(story = ""):
    story_text = open(f"stories/{story}")
    return story_text.read()
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)
