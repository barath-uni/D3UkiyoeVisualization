from . import main
from app.main.utils import *
from flask import render_template, request, jsonify, send_from_directory


@main.route("/",  methods=['GET'])
def home():
    return render_template('dashboard.html')


@main.route('/timeline', methods=['GET'])
def get_timeline():
    resp = read_date_from_json(filename=TIMELINE)
    return jsonify(data=resp)

@main.route('/scatter/<year>', methods=['GET'])
def get_scatter(year):
    resp = get_data_by_id(year, file_name=SCATTER)
    return jsonify(data=resp)


@main.route('/images/<image_id>', methods=['GET'])
def get_image(image_id):
    resp = get_data_by_id(image_id, file_name=IMAGES)
    resp['id'] = image_id
    return jsonify(data=resp)


@main.route('/images/<image_id>/objects', methods=['GET'])
def get_image_objects(image_id):
    resp = get_data_by_id(image_id, file_name=IMAGES_OBJECTS)
    return jsonify(data=resp)


@main.route('/images/<image_id>/colors', methods=['GET'])
def get_image_colors(image_id):
    resp = get_data_by_id(image_id, file_name=IMAGES_COLOR)
    return jsonify(data=resp)

@main.route('/objects/<object_id>', methods=['GET'])
def get_object(object_id):
    resp = get_data_by_id(object_id, file_name=OBJECTS)
    return jsonify(data=resp)


@main.route('/objects/<object_id>/matches', methods=['GET'])
def get_object_matches(object_id):
    resp = get_data_by_id(object_id, file_name=OBJECTS_MATCHES)[:10]
    return jsonify(data=resp)