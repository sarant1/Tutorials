import pandas as pd
import numpy as np
import pymysql

cd_df = pd.read_csv('csv/ComputerSales.csv')
#print(cd_df)

cd_df2 = pd.read_excel('csv/Financial Sample.xlsx', 0)
print(cd_df2)

# Convert csv to excel
cd_df.to_excel('csv/ComputerSalesBUI.xlsx')

def create_table_and_insert_data(cursor):
    SQL_QUERY = """
    CREATE TABLE IF NOT EXISTS student (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        age INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        grade float NOT NULL,
    )
    """

    cursor.execute(SQL_QUERY)

    sample_data = [
        {'name': 'John Doe', 'age': 18, 'grade': 85.5},
        {'name': 'Jane Smith', 'age': 17, 'grade': 92.3},
        {'name': 'Michael Johnson', 'age': 19, 'grade': 78.9}
    ]

    for data in sample_data:
        cursor.execute(
            """
            INSERT INTO student 
            (name, age, grade) 
            VALUES (
                %(name)s, 
                %(age)s, 
                %(grade)s)
            """, 
            data)

def get_db_connection():
    return pymysql.connect(host='localhost',
                           user='root',
                           password='password',
                           port=3306 
                           )
try: 
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DROP TABLE IF EXISTS student")
    create_table_and_insert_data(cursor)
    stud_df = pd.read_sql('SELECT * FROM student', con=cursor)
except Exception as e:
    print("Error connecting to database\n")
    print(e)
finally:
    if connection:
        connection.close()

