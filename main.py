from flask import Flask, redirect, url_for
from flask_cors import CORS

from endpoints.page_routes import page_blueprint
from endpoints.events_routes import events_blueprint
from endpoints.wishlist_routes import wishlist_blueprint

app = Flask(__name__)
CORS(app)

# Page Routes
app.register_blueprint(page_blueprint, url_prefix='/')
app.register_blueprint(events_blueprint, url_prefix='/api/events')
app.register_blueprint(wishlist_blueprint, url_prefix='/api/wishlist')

@app.route('/')
def index():
    return redirect(url_for('pages.home'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)