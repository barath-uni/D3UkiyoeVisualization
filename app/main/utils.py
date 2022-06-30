import os
import json
import functools
from typing import AnyStr

TIMELINE = "app/data/timeline.json"
SCATTER = "app/data/scatter.json"

IMAGES = "app/data/images.json"
IMAGES_OBJECTS = "app/data/images_objects.json"
IMAGES_COLOR = "app/data/images_colors.json"

OBJECTS = "app/data/objects.json"
OBJECTS_MATCHES = "app/data/objects_matches.json"

@functools.lru_cache()
def read_date_from_json(filename=SCATTER):
    with open(filename, 'r') as file:
        json_data = json.load(file)
    return json_data


def get_data_by_id(id, file_name=SCATTER):
    """
    Pass an id and get the dictionary with all the info
    Keys from dict
    "id" : [..contents]
    """
    try:
        data = read_date_from_json(file_name)
        return data.get(id, {})
    except KeyError as e:
        print(f"Key error - {e}")
        return {"Error": "Key error"}


def get_all_data_keyval(keys:AnyStr, file_name=SCATTER):
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




if __name__ == '__main__':
    print(get_data_by_id("0", SCATTER))
