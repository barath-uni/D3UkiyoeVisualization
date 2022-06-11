from flask import render_template, request, jsonify, send_from_directory
from . import main

# Keeping the data.py as it is, so we can add the dataloader functions directly and use here

@main.route("/",  methods = ['GET'])
def home():
    return render_template('dashboard.html')
