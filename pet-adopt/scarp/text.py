from dotenv import load_dotenv
import os
import psycopg2

# load env values
BASEDIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(BASEDIR, '../.env'))

conn = psycopg2.connect(host=os.getenv("DB_HOST"),dbname=os.getenv("DB_NAME"),user=os.getenv("DB_USER"),port=os.getenv("DB_PORT"))

cur = conn.cursor()

cur.execute("""select * from post; """)

print(cur.fetchall())

conn.commit()
cur.close()
conn.close()