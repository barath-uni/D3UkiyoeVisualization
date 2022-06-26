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
