import cx_Oracle
import pandas as pd
import matplotlib.pyplot as plt

# Database connection details
username = 'greeneryan'
password = 'v51VjDsYBoITgSY0FBrv18sg'
dsn = 'oracle.cise.ufl.edu/orcl'
connection = cx_Oracle.connect(username, password, dsn)
cursor = connection.cursor()

# Weather condition descriptions
weather_conditions = {
    'A': 'Clear',
    'B': 'Cloudy',
    'C': 'Raining',
    'D': 'Snowing',
    'E': 'Fog',
    'F': 'Other',
    'G': 'Wind'
}

def execute_query(sql, params):
    cursor.execute(sql, params)
    columns = [col[0] for col in cursor.description]
    data = pd.DataFrame(cursor.fetchall(), columns=columns)
    return data

def plot_line_chart(data, x, y, hue, title, weather_code):
    data_pivot = data.pivot_table(index=x, columns=hue, values=y, aggfunc='sum').fillna(0)
    data_pivot.plot(kind='line')
    
    # Use weather description in the title
    weather_description = weather_conditions.get(weather_code, "Not Specified")
    plt.title(f"{title} (Weather Condition: {weather_description})")
    plt.xlabel('Year')
    plt.ylabel('Number of Accidents')
    plt.legend(title='Vehicle Type', loc='upper left', bbox_to_anchor=(1.0, 1.0), fontsize='small')
    plt.grid(True)
    plt.tight_layout()
    plt.show()

# User input handling
print("Weather Condition Options:")
for code, desc in weather_conditions.items():
    print(f" {code} - {desc}")
weather_code = input("Enter a weather condition (A-G): ")
vehicle_types = input("Enter vehicle types separated by commas (e.g., Bicycle, Motorcycle/Scooter): ").split(',')
start_year = input("Enter start year (or leave blank for no limit): ")
end_year = input("Enter end year (or leave blank for no limit): ")

# Prepare SQL query and parameters
params = {}
where_conditions = ["ip.VEHICLETYPE IN ({})".format(", ".join([f":vtype{i}" for i in range(len(vehicle_types))]))]
params.update({f"vtype{i}": vtype.strip() for i, vtype in enumerate(vehicle_types)})
where_conditions.append("c.WEATHERCONDITION1 = :weather")
params['weather'] = weather_code

if start_year:
    where_conditions.append("EXTRACT(YEAR FROM c.CRASHDATE) >= :start_year")
    params['start_year'] = start_year
if end_year:
    where_conditions.append("EXTRACT(YEAR FROM c.CRASHDATE) <= :end_year")
    params['end_year'] = end_year

sql_query_1 = f"""
SELECT EXTRACT(YEAR FROM c.CRASHDATE) AS year, ip.VEHICLETYPE, COUNT(*) AS NUM_ACCIDENTS
FROM zhouxiangyu.CRASHES c
JOIN zhouxiangyu.INVOLVEDPARTIES ip ON c.CASEID = ip.CASEID
WHERE {' AND '.join(where_conditions)}
GROUP BY EXTRACT(YEAR FROM c.CRASHDATE), ip.VEHICLETYPE
"""

# Execute query and plot
data1 = execute_query(sql_query_1, params)
plot_line_chart(data1, 'YEAR', 'NUM_ACCIDENTS', 'VEHICLETYPE', 'Annual Accidents by Vehicle Type and Weather Condition', weather_code)

cursor.close()
connection.close()