from flask import Blueprint, jsonify, request, send_from_directory
import os
from datetime import datetime
import uuid

image_blueprint = Blueprint('images', __name__)
PATH = 'static/images'

@image_blueprint.route('/upload', methods=['POST'])
def upload():
    if 'image' in request.files:
        image = request.files['image']

        current_datetime = datetime.now().strftime('%Y%m%d%H%M%S')
        random_string = str(uuid.uuid4().hex)[:8] 
        filename, extension = os.path.splitext(image.filename)
        new_filename = f"{current_datetime}_{random_string}{extension}"

        save_path = os.path.join(PATH , new_filename)
        image.save(save_path)

        return jsonify({'message': 'Image uploaded successfully!'})
    return jsonify({'error': 'No image provided.'}), 400

@image_blueprint.route('/<string:filename>', methods=['GET'])
def get(filename):
    return send_from_directory(PATH, filename), 200

@image_blueprint.route('/', methods=['GET'])
def get_all():
    images = [filename for filename in os.listdir(PATH)][::-1]
    return jsonify({'images': images}), 200

@image_blueprint.route('/<string:filename>', methods=['DELETE'])
def delete(filename):
    file_path = os.path.join(PATH, filename)

    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'message': 'Image deleted successfully!'}), 200
    else:
        return jsonify({'error': 'Image not found.'}), 404