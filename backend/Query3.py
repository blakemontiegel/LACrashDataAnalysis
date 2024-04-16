import cx_Oracle
import pandas as pd
import matplotlib.pyplot as plt

# Database connection details
username = 'greeneryan'
password = 'v51VjDsYBoITgSY0FBrv18sg'
dsn = 'oracle.cise.ufl.edu/orcl'
connection = cx_Oracle.connect(username, password, dsn)
cursor = connection.cursor()

def execute_query(sql, params=None):
    cursor.execute(sql, params or {})
    columns = [col[0] for col in cursor.description]
    data = pd.DataFrame(cursor.fetchall(), columns=columns)
    return data

def get_time_range():
    time_ranges = [
        '00:00~02:59', '03:00~05:59', '06:00~08:59', 
        '09:00~11:59', '12:00~14:59', '15:00~17:59', 
        '18:00~20:59', '21:00~23:59', '25:00 - Unknown'
    ]
    print("Available time ranges:")
    for tr in time_ranges:
        print(tr)
    selected_range = input("Enter a time range from the list above: ")
    return selected_range

def plot_data(data, selected_range):
    if data.empty:
        print("No data available to plot.")
        return
    
    plt.figure(figsize=(10, 6))
    for party_size in data['PARTYSIZE'].unique():
        subset = data[data['PARTYSIZE'] == party_size]
        plt.plot(subset['YEAR'], subset['AVGINJURED'], marker='o', label=f'Party Size {party_size}')
    
    plt.title(f'Average Number of Injured by Party Size Over Time (Selected time: {selected_range})')
    plt.xlabel('Year')
    plt.ylabel('Average Number of People Injured')
    plt.legend(title='Party Size')
    plt.grid(True)
    plt.tight_layout()
    plt.show()

def main():
    selected_range = get_time_range()
    start_time, end_time = selected_range.split('~')

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
    plot_data(data, selected_range)

    cursor.close()
    connection.close()

if __name__ == '__main__':
    main()
