import oracledb
import pandas as pd

username = 'blakemontiegel'
password = 'lMQepNByzGppFPtHUasKwhty'
dsn = 'oracle.cise.ufl.edu/orcl'
connection = oracledb.connect(user=username, password=password, dsn=dsn)
cursor = connection.cursor()

def execute_query(sql):
    cursor.execute(sql)
    columns = [col[0] for col in cursor.description]
    data = pd.DataFrame(cursor.fetchall(), columns=columns)
    return data

sql_tuples = """
SELECT SUM(total_count) AS total_tuples
FROM (
    SELECT COUNT(*) AS total_count FROM zhouxiangyu.CRASHES
    UNION ALL
    SELECT COUNT(*) AS total_count FROM zhouxiangyu.INVOLVEDPARTIES
)
"""

data1 = execute_query(sql_tuples)
total_tuples = data1['TOTAL_TUPLES'].iloc[0]

cursor.close()
connection.close()
