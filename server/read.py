from configparser import ConfigParser

config = ConfigParser()
config.read('config.ini')
config_data = config['SERVER']
keyswords =config_data['keywords'].split(',')
delta = config_data['max_delta_year']
delta = int(delta)

print(delta,type(delta))