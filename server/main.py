from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, set_key,find_dotenv
import os
import psycopg2
import datetime
from facebook_scraper import get_posts


# access .env
env_file = find_dotenv()
load_dotenv(env_file)

now = datetime.datetime.now()   

cookies = os.listdir("./cookies")

print(cookies)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins =[os.getenv("ORIGIN")],
    allow_methods =["*"],
    allow_headers = ['*']
)

def updatable()->bool:
    update_interval = 1 #per day
    now = datetime.datetime.now()
    last = os.getenv("LAST_UPDATE")
    if last:
        delta = datetime.timedelta(days=update_interval)
        return now - datetime.datetime.strptime(last, '%Y-%m-%d %H:%M:%S') > delta
    return True


@app.get("/")
def home():
    return "connected"

@app.get("/updatable")
def lastUpdate():
    return {"Last update time":os.getenv("LAST_UPDATE"), "Updatable":updatable()}

@app.get("/posts")
def getAllPost():
    conn = psycopg2.connect(host=os.getenv("DB_HOST"),dbname=os.getenv("DB_NAME"),user=os.getenv("DB_USER"),port=os.getenv("DB_PORT"))
    cur = conn.cursor()
    cur.execute("""select * from post; """)
    data = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return data

@app.get("/providers")
def getAllProvider():
    conn = psycopg2.connect(host=os.getenv("DB_HOST"),dbname=os.getenv("DB_NAME"),user=os.getenv("DB_USER"),port=os.getenv("DB_PORT"))
    cur = conn.cursor()
    cur.execute("""select * from provider; """)
    data = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return data

@app.post("/update")
def update():
    
    # check whther the last update is less than a day
    if not updatable():
        return {"message":"Not updatable.", 'Last update':os.environ["LAST_UPDATE"]}
    
    # at least one cookies to scarp
    if not cookies:
        return {"message":"not enough cookies"}
    
    # update the modified date
    os.environ["LAST_UPDATE"] = now.strftime("%Y-%m-%d %H:%M:%S")
    # Write changes to .env file.
    set_key(env_file, "LAST_UPDATE", os.environ["LAST_UPDATE"])
    
    page_default = 5 #>=3
    insertSatement = """
    --sql
    INSERT INTO post (post_id,provider_id,text,images,date) VALUES
    (%s,%s,%s,%s,%s) ON CONFLICT(post_id) DO UPDATE
    SET text = EXCLUDED.text, images = EXCLUDED.images, date = EXCLUDED.date
    ;
    """

    # for words that shd be inclued and words that shd prevent the insert
    keywords = ["尋家","待領養"]
    stopWords = ["暫停","暫不"]
    
    conn = psycopg2.connect(host=os.getenv("DB_HOST"),dbname=os.getenv("DB_NAME"),user=os.getenv("DB_USER"),port=os.getenv("DB_PORT"))
    cur = conn.cursor()
    
    try:
        # find all provider
        cur.execute("""--sql 
        select provider_id, name from provider;""")
        providers = cur.fetchall()
        
        index = 0 #which cookies to use 
        for id,name in providers:
            print(f"Start scarping {name} using {cookies[index]}")
            for post in get_posts(id, pages=page_default, cookies = "./cookies/"+cookies[index]):
                if all(word not in post["text"] for word in keywords) or any(word in post["text"] for word in stopWords):
                    continue
                cur.execute(insertSatement,(post["post_id"],id,post["text"],post["images"],post["time"]))
            print(f"Finish scarping {name}")
            index = (index+1) %len(cookies)
    except BaseException as error:
        print('An exception occurred: {}'.format(error))
    conn.commit()
    cur.close()
    conn.close()
    return {"Last updated at":os.getenv("LAST_UPDATE")}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=os.getenv("PORT",8000))

