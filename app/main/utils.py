import csv
import functools

FILENAME = "../data/data.csv"


@functools.lru_cache()
def read_all_data(filename):
    data = list()
    with open(filename, encoding='cp850') as file:
        csv_file = csv.DictReader(file, skipinitialspace=True)
        for row in csv_file:
            data.append(row)
    return data


def get_data_by_id(id):
    """
    Pass an id and get the dictionary with all the info
    Keys from dict
    idx, img, artist, date, era, source, similar, label
    """
    data = read_all_data(FILENAME)
    val = [row for row in data if row.get("idx") == id][0]
    print(f"Returning the row - {val}")
    return val


def get_all_data_keyval(key, val):
    """
    Gets all the matching rows from the given key

    :param matching_key: String with the key name.
     Available keys - idx, img, artist, date, era, source, similar, label
    :return: List of rows matching the given key.
    """
    data = read_all_data(FILENAME)
    val = [row for row in data if row.get(key) == val]
    print(f"Returning for key = {val}")
    return val

#
# if __name__ == '__main__':
#     print(get_data_by_id(id="87147"))
#     print(get_all_data_keyval(key="artist", val="Utagawa Kuniyoshi"))
#
