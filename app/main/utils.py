import csv
import functools
import os

INIT_FILENAME = "app/data/data.csv"
OBJECT_DETECTION = "app/data/object_det_new.csv"


@functools.lru_cache()
def read_all_data(filename):
    print(os.getcwd())
    data = list()
    with open(filename, encoding='cp850') as file:
        csv_file = csv.DictReader(file, skipinitialspace=True)
        for row in csv_file:
            data.append(row)
    return data


def get_data_by_id(id, file_name=INIT_FILENAME):
    """
    Pass an id and get the dictionary with all the info
    Keys from dict
    idx, img, artist, date, era, source, similar, label
    """
    data = read_all_data(file_name)
    val = [row for row in data if row.get("idx") == id][0]
    print(f"Returning the row - {val}")
    return val


def get_all_data_keyval(key, val, file_name=INIT_FILENAME):
    """
    Gets all the matching rows from the given key

    :param file_name:
    :param matching_key: String with the key name.
     Available keys - idx, img, artist, date, era, source, similar, label
    :return: List of rows matching the given key.
    """
    data = read_all_data(file_name)
    print(data[0])
    print(f"Key, val = {key}, {val}")
    val = [row for row in data if row.get(key) == val]
    print(f"Returning for key = {val}")
    return val
#
# def get_all_

#
# if __name__ == '__main__':
#     print(get_data_by_id(id="87147"))
#     print(get_all_data_keyval(key="artist", val="Utagawa Kuniyoshi"))
#
