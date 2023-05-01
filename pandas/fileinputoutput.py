import pandas as pd
import numpy as np
import pymysql

cd_df = pd.read_csv('csv/ComputerSales.csv')
#print(cd_df)

cd_df2 = pd.read_excel('csv/Financial Sample.xlsx', 0)
#print(cd_df2)

# Convert csv to excel
cd_df.to_excel('csv/ComputerSalesBUI.xlsx')

def insertData(cursor):

    sample_data = [
        {'name': 'John Doe', 'age': 18, 'grade': 85.5},
        {'name': 'Jane Smith', 'age': 17, 'grade': 92.3},
        {'name': 'Michael Johnson', 'age': 19, 'grade': 78.9}
    ]

    for data in sample_data:
        cursor.execute(
            """
            INSERT INTO student 
            (
            name, 
            age, 
            grade
            ) 
            VALUES (
                %(name)s, 
                %(age)s, 
                %(grade)s
                )
            """, data)
    print("Data inserted successfully...")

def get_db_connection():
    return pymysql.connect(host='0.0.0.0',
                           user='root',
                           password='password',
                           database='testing',
                           port=3306,
                           cursorclass=pymysql.cursors.DictCursor 
                           )
try: 
    connection = get_db_connection()
    with connection:
        with connection.cursor() as cursor:
            cursor.execute("SHOW DATABASES;")
            insertData(cursor)
            connection.commit()
    #stud_df = pd.read_sql('SELECT * FROM student', con=cursor)
except Exception as e:
    print("\nError connecting to database")
    print(e)
