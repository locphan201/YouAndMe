from flask import Blueprint, jsonify, request, redirect, url_for
from database.database import EventsManager

events_blueprint = Blueprint('events', __name__)
events = EventsManager()

@events_blueprint.route('/', methods=['GET'])
def get_all_events_route():
    return jsonify({'events': events.get_all()}), 200

@events_blueprint.route('/<string:event_id>', methods=['GET'])
def get_event_route(event_id):
    return jsonify({'event': events.get(event_id)}), 200

@events_blueprint.route('/<string:event_id>', methods=['DELETE'])
def delete_event_route(event_id):
    try: 
        events.delete(event_id)
        return jsonify({'message': 'Deleted Successfully'}), 200
    except:
        return jsonify({'message': 'Failed to Delete'}), 400

@events_blueprint.route('/create', methods=['POST'])
def create_event_route():
    try:
        title = request.json.get('title')
        date = request.json.get('date')
        events.create({
            'title': title,
            'date': date
        })
        return jsonify({'message': 'Created Successfully'}), 200
    except:
        return jsonify({'message': 'Failed to Create'}), 400