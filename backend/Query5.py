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
pcfViolation = sys.argv[3]


def execute_query(sql, params=None):
    cursor.execute(sql, params or {})
    columns = [col[0] for col in cursor.description]
    data = pd.DataFrame(cursor.fetchall(), columns=columns)
    return data

def get_user_input():
    violations = {
        "-": "Not Stated",
        "00": "Unknown",
        "01": "Driving or Bicycling Under the Influence of Alcohol or Drug",
        "02": "Impeding Traffic",
        "03": "Unsafe Speed",
        "04": "Following Too Closely",
        "05": "Wrong Side of Road",
        "06": "Improper Passing",
        "07": "Unsafe Lane Change",
        "08": "Improper Turning",
        "09": "Automobile Right of Way",
        "10": "Pedestrian Right of Way",
        "11": "Pedestrian Violation",
        "12": "Traffic Signals and Signs",
        "13": "Hazardous Parking",
        "14": "Lights",
        "15": "Brakes",
        "16": "Other Equipment",
        "17": "Other Hazardous Violation",
        "18": "Other Than Driver (or Pedestrian)",
        "19": "N/A",
        "20": "N/A",
        "21": "Unsafe Starting or Backing",
        "22": "Other Improper Driving",
        "23": "Pedestrian or Other Under the Influence of Alcohol or Drug",
        "24": "Fell Asleep"
    }
    selected_violations = pcfViolation.split(', ')
    start_year = startDate[:4]
    end_year = endDate[:4]

    return selected_violations, start_year, end_year

def plot_data(data, violations):
    if data.empty:
        print("No data available to plot.")
        return
    
    plt.figure(figsize=(10, 5))
    for violation in data['VIOLATIONCATEGORY'].unique():
        subset = data[data['VIOLATIONCATEGORY'] == violation]
        plt.plot(subset['YEAR'], subset['NUM_VIOLATIONS'], label=violations[violation])

    plt.xlabel('Year')
    plt.ylabel('Frequency of Violations')
    plt.legend(title="Violation Codes")
    plt.grid(True)
    plt.savefig("QueryGraphImages/Query5Result.png")
    plt.close()

def main():
    selected_violations, start_year, end_year = get_user_input()
    violations = {
        "-": "Not Stated",
        "00": "Unknown",
        "01": "Driving or Bicycling Under the Influence of Alcohol or Drug",
        "02": "Impeding Traffic",
        "03": "Unsafe Speed",
        "04": "Following Too Closely",
        "05": "Wrong Side of Road",
        "06": "Improper Passing",
        "07": "Unsafe Lane Change",
        "08": "Improper Turning",
        "09": "Automobile Right of Way",
        "10": "Pedestrian Right of Way",
        "11": "Pedestrian Violation",
        "12": "Traffic Signals and Signs",
        "13": "Hazardous Parking",
        "14": "Lights",
        "15": "Brakes",
        "16": "Other Equipment",
        "17": "Other Hazardous Violation",
        "18": "Other Than Driver (or Pedestrian)",
        "19": "N/A",
        "20": "N/A",
        "21": "Unsafe Starting or Backing",
        "22": "Other Improper Driving",
        "23": "Pedestrian or Other Under the Influence of Alcohol or Drug",
        "24": "Fell Asleep"
    }
    sql_query = f"""
    SELECT EXTRACT(YEAR FROM CRASHDATE) AS YEAR, VIOLATIONCATEGORY, COUNT(*) AS NUM_VIOLATIONS
    FROM zhouxiangyu.CRASHES
    WHERE VIOLATIONCATEGORY IN ({','.join(':violation' + str(i) for i in range(len(selected_violations)))})
    """
    if start_year:
        sql_query += " AND EXTRACT(YEAR FROM CRASHDATE) >= :start_year"
    if end_year:
        sql_query += " AND EXTRACT(YEAR FROM CRASHDATE) <= :end_year"
    sql_query += " GROUP BY EXTRACT(YEAR FROM CRASHDATE), VIOLATIONCATEGORY ORDER BY YEAR"

    params = {f'violation{i}': violation for i, violation in enumerate(selected_violations)}
    if start_year:
        params['start_year'] = start_year
    if end_year:
        params['end_year'] = end_year

    data = execute_query(sql_query, params)
    plot_data(data, violations)

    cursor.close()
    connection.close()

if __name__ == '__main__':
    main()
