import cx_Oracle
import pandas as pd
import matplotlib.pyplot as plt

# Database connection details
username = 'greeneryan'
password = 'v51VjDsYBoITgSY0FBrv18sg'
dsn = 'oracle.cise.ufl.edu/orcl'
connection = cx_Oracle.connect(username, password, dsn)
cursor = connection.cursor()

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
    plt.title(f"Annual Frequency of Collision Types by Severity ({severity_description})")
    plt.xlabel('Year')
    plt.ylabel('Frequency')
    plt.legend(title='Collision Type', loc='upper left', bbox_to_anchor=(1.0, 1.0), fontsize='small')
    plt.grid(True)
    plt.tight_layout()
    plt.show()

def main():
    print("Enter the severity level for collision types:")
    for code, desc in severity_levels.items():
        print(f"{code} - {desc}")
    severity = input("Select a severity level (1-4): ")

    print("Collision Types (leave blank for all types):")
    for code, desc in collision_types.items():
        print(f"{code} - {desc}")
    collision_types_input = input("Enter collision types separated by commas or leave blank for all: ").strip()
    selected_types = collision_types_input.split(',') if collision_types_input else list(collision_types.keys())

    start_year = input("Enter start year (or leave blank for no limit): ")
    end_year = input("Enter end year (or leave blank for no limit): ")

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

if __name__ == '__main__':
    main()
