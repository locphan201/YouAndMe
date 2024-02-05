from flask import Blueprint, render_template

page_blueprint = Blueprint('pages', __name__)

@page_blueprint.route('/homepage')
def home():
    return render_template('home.html')

@page_blueprint.route('/events')
def events():
    return render_template('events.html')

@page_blueprint.route('/add')
def add():
    return render_template('add.html')

@page_blueprint.route('/wishlist')
def wishlist():
    return render_template('wishlist.html')

@page_blueprint.route('/settings')
def settings():
    return render_template('settings.html')