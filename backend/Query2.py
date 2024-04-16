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
singleCollisionSeverity = sys.argv[3]
crashTypes = sys.argv[4]
print("hi")
# Collision type and severity descriptions
collision_types = {
    'A': 'Head-On',
    'B': 'Sideswipe',
    'C': 'Rear End',
    'D': 'Broadside',
    'E': 'Hit Object',
    'F': 'Overturned',
    'G': 'Vehicle/Pedestrian',
    'H': 'Other'
}

severity_levels = {
    '1': 'Fatal',
    '2': 'Injury (Severe)',
    '3': 'Injury (Other Visible)',
    '4': 'Injury (Complaint of Pain)'
}

def execute_query(sql, params=None):
    cursor.execute(sql, params or {})
    columns = [col[0] for col in cursor.description]
    data = pd.DataFrame(cursor.fetchall(), columns=columns)
    print("Data fetched from the database:", data.head())
    return data

def plot_query_2(data, severity_code):
    if data.empty:
        print("No data available to plot.")
        return
    # Update column names for the legend
    data['COLLISIONTYPE'] = data['COLLISIONTYPE'].map(collision_types).fillna(data['COLLISIONTYPE'])
    data_pivot = data.pivot_table(index='YEAR', columns='COLLISIONTYPE', values='FREQUENCY', aggfunc='sum').fillna(0)
    data_pivot.plot(kind='line')
    severity_description = severity_levels.get(severity_code, "Not Specified")
    plt.xlabel('Year')
    plt.ylabel('Frequency')
    plt.legend(title='Collision Type', loc='upper left', bbox_to_anchor=(1.0, 1.0), fontsize='small')
    plt.grid(True)
    plt.tight_layout()
    plt.savefig("QueryGraphImages/Query2Result.png")
    plt.close()

def main():
    severity = singleCollisionSeverity
    collision_types_input = crashTypes.strip()
    selected_types = collision_types_input.split(',') if collision_types_input else list(collision_types.keys())
    start_year = startDate[:4]
    end_year = endDate[:4]

    placeholders = ', '.join(f":type{i}" for i in range(len(selected_types)))
    sql_query_2 = f"""
    SELECT EXTRACT(YEAR FROM c.CRASHDATE) AS year, c.COLLISIONTYPE, c.COLLISIONSEVERITY, COUNT(*) AS FREQUENCY
    FROM zhouxiangyu.CRASHES c
    WHERE c.COLLISIONSEVERITY = :severity AND c.COLLISIONTYPE IN ({placeholders})
    """
    if start_year:
        sql_query_2 += " AND EXTRACT(YEAR FROM c.CRASHDATE) >= :start_year"
    if end_year:
        sql_query_2 += " AND EXTRACT(YEAR FROM c.CRASHDATE) <= :end_year"
    sql_query_2 += " GROUP BY EXTRACT(YEAR FROM c.CRASHDATE), c.COLLISIONTYPE, c.COLLISIONSEVERITY"

    params = {'severity': severity}
    if start_year:
        params['start_year'] = start_year
    if end_year:
        params['end_year'] = end_year
    params.update({f'type{i}': selected_types[i].strip() for i, selected_types[i] in enumerate(selected_types)})
    data = execute_query(sql_query_2, params)
    plot_query_2(data, severity)

    cursor.close()
    connection.close()

