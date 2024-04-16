import oracledb
import pandas as pd
import matplotlib.pyplot as plt
import sys

# Database connection details
username = 'blakemontiegel'
password = 'lMQepNByzGppFPtHUasKwhty'
dsn = 'oracle.cise.ufl.edu/orcl'
connection = oracledb.connect(user=username, password=password, dsn=dsn)
cursor = connection.cursor()

startDate = sys.argv[1]
endDate = sys.argv[2]
initialTime = sys.argv[3]
finalTime = sys.argv[4]


def execute_query(sql, params=None):
    cursor.execute(sql, params or {})
    columns = [col[0] for col in cursor.description]
    data = pd.DataFrame(cursor.fetchall(), columns=columns)
    return data

def plot_data(data):
    if data.empty:
        print("No data available to plot.")
        return
    
    plt.figure(figsize=(10, 6))
    for party_size in data['PARTYSIZE'].unique():
        subset = data[data['PARTYSIZE'] == party_size]
        plt.plot(subset['YEAR'], subset['AVGINJURED'], marker='o', label=f'Party Size {party_size}')
    
    plt.xlabel('Year')
    plt.ylabel('Average Number of People Injured')
    plt.legend(title='Party Size')
    plt.grid(True)
    plt.tight_layout()
    plt.savefig("QueryGraphImages/Query3Result.png")
    plt.close()

def main():
    start_time = initialTime
    end_time = finalTime

    sql_query = """
    WITH PartySizes AS (
        SELECT CASEID, MAX(PARTYNUMBER) AS PARTYSIZE
        FROM zhouxiangyu.INVOLVEDPARTIES
        GROUP BY CASEID
        HAVING MAX(PARTYNUMBER) BETWEEN 1 AND 5
    ),
    Injuries AS (
        SELECT c.CASEID, c.NUMBERINJURED, EXTRACT(YEAR FROM c.CRASHDATE) AS YEAR
        FROM zhouxiangyu.CRASHES c
        WHERE TO_CHAR(c.CRASHTIME, 'HH24:MI') BETWEEN :start_time AND :end_time
        AND EXTRACT(YEAR FROM c.CRASHDATE) BETWEEN 2013 AND 2022
    )
    SELECT ps.PARTYSIZE, i.YEAR, AVG(i.NUMBERINJURED) AS AVGINJURED
    FROM PartySizes ps
    JOIN Injuries i ON ps.CASEID = i.CASEID
    GROUP BY ps.PARTYSIZE, i.YEAR
    ORDER BY ps.PARTYSIZE, i.YEAR
    """

    params = {'start_time': start_time.strip(), 'end_time': end_time.strip().split(' ')[0]}
    data = execute_query(sql_query, params)
    plot_data(data)

    cursor.close()
    connection.close()

if __name__ == '__main__':
    main()
