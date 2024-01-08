from flask import Flask, render_template
from flask_cors import CORS

from endpoints.image_routes import image_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(image_blueprint, url_prefix='/images')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=81)