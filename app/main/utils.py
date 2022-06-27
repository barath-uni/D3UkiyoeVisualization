import csv
import functools
import os
import json
from typing import AnyStr
COLOR_MATCHING = "app/data/color_matching.json"
OBJECT_DETECTION_PANES = "app/data/total_panes.json"
OBJECT_DETECTION_MATCHES = "app/data/matches.json"
OBJECT_DETECTION = "app/data/object_detection.json"
DATE_SLIDER = "app/data/date_slider.json"
IMAGE_METADATA = "app/data/color_matching.json"
SCATTER_PLOT = "app/data/scatter_plot.json"
META_DATA = "app/data/img-metadata.json"


@functools.lru_cache()
def read_date_from_json(filename=COLOR_MATCHING):
    with open(filename, 'r') as file:
        json_data = json.load(file)
    return json_data


def get_data_by_id(id, file_name=COLOR_MATCHING):
    """
    Pass an id and get the dictionary with all the info
    Keys from dict
    "id" : [..contents]
    """
    try:
        data = read_date_from_json(file_name)
        val = data[id]
        return val
    except KeyError as e:
        print(f"Key error - {e}")
        return {"Error": "Key error"}


def get_all_data_keyval(keys:AnyStr, file_name=COLOR_MATCHING):
    """
    Gets all the matching rows from the given key

    :keys = It should be '/' separated. Eg
    "0": {
        "color_1" : {
            'HEX': '#aaa'
        }
    }
    pass t 0/color_1/HEX to get '#aaa'
    :return: List of rows matching the given key.
    """
    try:
        data = read_date_from_json(file_name)
        keys = keys.split("/")
        for key in keys:
            data = data[key]
        print(data)
        return data
    except KeyError as e:
        print(f"Key error - {e}")
        return {"Error": "Key error"}


#
#
# if __name__ == '__main__':
#     print(get_data_by_id("0", OBJECT_DETECTION_PANES))
