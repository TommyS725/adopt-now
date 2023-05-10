from dotenv import load_dotenv, set_key
import os
import psycopg2
import datetime

update_interval =1 #per day

def main():
    
    # load env values
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    env_file = os.path.join(BASEDIR, '../.env')
    load_dotenv(env_file)
    
    now = datetime.datetime.now()
    last_modified = os.getenv("last_modified")
    
   
    
    if last_modified:
        last_modified = datetime.datetime.strptime(last_modified, '%Y-%m-%d %H:%M:%S')
        delta = datetime.timedelta(days=update_interval)
        if now - last_modified < delta:
            print("no need to update db")
            return
    
    # update the modified date
    os.environ["last_modified"] = now.strftime("%Y-%m-%d %H:%M:%S")
    # Write changes to .env file.
    set_key(env_file, "last_modified", os.environ["last_modified"])
    
    # connect to db
    conn = psycopg2.connect(host=os.getenv("DB_HOST"),dbname=os.getenv("DB_NAME"),user=os.getenv("DB_USER"),port=os.getenv("DB_PORT"))

    cur = conn.cursor()

    cur.execute("""select * from post; """)

    print(cur.fetchall())

    conn.commit()
    cur.close()
    conn.close()
    
if __name__ == "__main__":
    main()