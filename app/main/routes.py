from flask import render_template, request, jsonify, send_from_directory
from . import main
from app.main.utils import *
# Keeping the data.py as it is, so we can add the dataloader functions directly and use here


@main.route("/",  methods=['GET'])
def home():
    return render_template('dashboard.html')


# Get the data based on key, val. Can change the request.args based on the need
@main.route("/datakeyval", methods=['GET'])
def get_view1_data():
    # Can expand with additional arg values
    key = request.args.get("key")
    val = request.args.get("val")

    all_rows = get_all_data_keyval(key, val)
    # Loading the image path from the dict
    return jsonify(data=all_rows)


@main.route('/image_from_key', methods=['GET'])
def get_image_from_key():
    id = request.args.get("idx")
    img_name = get_data_by_id(id)['img']
    return send_from_directory("data/images", img_name)


@main.route('/object_detection_panes', methods=['GET'])
def get_object_detection_panes():
    id = request.args.get("idx")
    resp = get_data_by_id(id, file_name=OBJECT_DETECTION_PANES)
    # For now returning it as a list
    return jsonify(data=resp)


@main.route('/object_detection_matches', methods=['GET'])
def get_object_detection_matches():
    id = request.args.get("idx")
    resp = get_data_by_id(id, file_name=OBJECT_DETECTION_MATCHES)
    return jsonify(data=resp)


@main.route('/meta_data', methods=['GET'])
def get_meta_data():
    id = request.args.get("idx")
    resp = get_data_by_id(id, file_name=META_DATA)
    # Hack to ensure that the meta data field also has the image id
    resp['id'] = id
    return jsonify(data=resp)


@main.route('/color_information', methods=['GET'])
def get_color_profile_data():
    id = request.args.get("idx")
    print(f"VAL VAL = {id}")
    resp = get_data_by_id(id, file_name=COLOR_MATCHING)
    return jsonify(data=resp)


@main.route('/scatter_plot', methods=['GET'])
def get_scatter_plot_data():
    id = request.args.get("idx")
    print(f"VAL VAL = {id}")
    resp = get_data_by_id(id,file_name=SCATTER_PLOT)
    return jsonify(data=resp)


@main.route('/timeline_data', methods=['GET'])
def get_timeline_data():
    id = request.args.get("idx")
    resp = get_data_by_id(id, file_name=DATE_SLIDER)
    return jsonify(data=resp)


