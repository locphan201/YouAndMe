from flask import Blueprint, jsonify, request
from database.database import WishListManager

wishlist_blueprint = Blueprint('wishlist', __name__)
wishlist = WishListManager()

@wishlist_blueprint.route('/', methods=['GET'])
def get_all_wishlist_route():
    return jsonify({'wishlist': wishlist.get_all()}), 200

@wishlist_blueprint.route('/<string:wishlist_id>', methods=['GET'])
def get_wishlist_route(wishlist_id):
    return jsonify({'wishlist': wishlist.get(wishlist_id)}), 200

@wishlist_blueprint.route('/<string:wishlist_id>', methods=['DELETE'])
def delete_wishlist_route(wishlist_id):
    try: 
        wishlist.delete(wishlist_id)
        return jsonify({'message': 'Deleted Successfully'}), 200
    except:
        return jsonify({'message': 'Failed to Delete'}), 400

@wishlist_blueprint.route('/create', methods=['POST'])
def create_wishlist_route():
    try:
        title = request.json.get('title')
        w_type = request.json.get('type')

        wishlist.create({
            'title': title,
            'type': w_type
        })
        return jsonify({'message': 'Created Successfully'}), 200
    except:
        return jsonify({'message': 'Failed to Create'}), 400