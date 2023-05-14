from configparser import ConfigParser

config = ConfigParser()

config["SERVER"] = {
    "keywords":["尋家","待領養","暫托","pm"],
    "stopwords":["尋家","待領養","暫托","pm"],
    'max_delta_year':1,
    'update_interval' : 1,
    'page_default':3,

}

with open('config.ini','w') as f:
    config.write(f)
