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

def get_user_input():
    severity_levels = {
        '1': 'Fatal',
        '2': 'Injury (Severe)',
        '3': 'Injury (Other Visible)',
        '4': 'Injury (Complaint of Pain)'
    }
    print("Select a severity level for the plot:")
    for key, value in severity_levels.items():
        print(f"{key}: {value}")
    severity = input("Choose a severity level (1-4): ")

    print("\nSelect two cities from the following list:")
    cities = [
        "UNINCORPORATED", "ALHAMBRA", "AGOURA HILLS", "ARCADIA", "ARTESIA", "AVALON", 
        "AZUSA", "BALDWIN PARK", "BELL", "BELL GARDENS", "BELLFLOWER", "BEVERLY HILLS",
        "BRADBURY", "BURBANK", "CALABASAS", "CARSON", "CERRITOS", "CLAREMONT",
        "COMMERCE", "COMPTON", "COVINA", "CUDAHY", "CULVER CITY", "DIAMOND BAR",
        "DOWNEY", "DUARTE", "EL MONTE", "EL SEGUNDO", "GARDENA", "GLENDALE", "GLENDORA",
        "HAWAIIAN GARDENS", "HAWTHORNE", "HERMOSA BEACH", "HIDDEN HILLS", "HUNTINGTON PARK",
        "INDUSTRY", "INGLEWOOD", "IRWINDALE", "LA CANADA FLINTRIDGE", "LA HABRA HEIGHTS",
        "LA MIRADA", "LA PUENTE", "LA VERNE", "LAKEWOOD", "LANCASTER", "LAWNDALE",
        "LOMITA", "LONG BEACH", "LOS ANGELES", "LYNWOOD", "MALIBU", "MANHATTAN BEACH",
        "MAYWOOD", "MONROVIA", "MONTEBELLO", "MONTEREY PARK", "NORWALK", "PALMDALE",
        "PALOS VERDES ESTATES", "PARAMOUNT", "PASADENA", "PICO RIVERA", "POMONA",
        "RANCHO PALOS VERDES", "REDONDO BEACH", "ROLLING HILLS", "ROLLING HILLS ESTATES",
        "ROSEMEAD", "SAN DIMAS", "SAN FERNANDO", "SAN GABRIEL", "SAN MARINO",
        "SANTA CLARITA", "SANTA FE SPRINGS", "SANTA MONICA", "SIERRA MADRE", "SIGNAL HILL",
        "SOUTH EL MONTE", "SOUTH GATE", "SOUTH PASADENA", "TEMPLE CITY", "TORRANCE",
        "VERNON", "WALNUT", "WEST COVINA", "WEST HOLLYWOOD", "WESTLAKE VILLAGE", "WHITTIER"
    ]
    for i in range(0, len(cities), 3):
        print(", ".join(cities[i:i+3]))

    city1 = input("Enter the first city: ").upper()
    city2 = input("Enter the second city: ").upper()

    start_year = input("Enter start year (2013-2022, leave blank for no limit): ")
    end_year = input("Enter end year (2013-2022, leave blank for no limit): ")

    return severity, city1, city2, start_year, end_year

def plot_data(data, severity, city1, city2):
    if data.empty:
        print("No data available to plot.")
        return
    
    severity_description = {
        '1': 'Fatal',
        '2': 'Injury (Severe)',
        '3': 'Injury (Other Visible)',
        '4': 'Injury (Complaint of Pain)'
    }
    
    plt.figure(figsize=(10, 5))
    for city in [city1, city2]:
        city_data = data[data['CITY'] == city]
        plt.plot(city_data['YEAR'], city_data['NUM_ACCIDENTS'], label=f"{city.title()}")

    plt.title(f"Comparison of {severity_description[severity]} Collision Frequency Between {city1.title()} and {city2.title()}")
    plt.xlabel('Year')
    plt.ylabel('Frequency of Collisions')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()

def main():
    severity, city1, city2, start_year, end_year = get_user_input()
    sql_query = f"""
    SELECT EXTRACT(YEAR FROM CRASHDATE) AS YEAR, CITY, COUNT(*) AS NUM_ACCIDENTS
    FROM zhouxiangyu.CRASHES
    WHERE COLLISIONSEVERITY = :severity AND CITY IN (:city1, :city2)
    """
    params = {'severity': severity, 'city1': city1, 'city2': city2}

    if start_year:
        sql_query += " AND EXTRACT(YEAR FROM CRASHDATE) >= :start_year"
        params['start_year'] = start_year
    if end_year:
        sql_query += " AND EXTRACT(YEAR FROM CRASHDATE) <= :end_year"
        params['end_year'] = end_year

    sql_query += " GROUP BY EXTRACT(YEAR FROM CRASHDATE), CITY ORDER BY YEAR"

    data = execute_query(sql_query, params)
    plot_data(data, severity, city1, city2)

    cursor.close()
    connection.close()

if __name__ == '__main__':
    main()