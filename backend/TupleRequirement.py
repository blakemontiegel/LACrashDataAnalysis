from flask import Flask, jsonify
import oracledb
import pandas as pd

app = Flask(__name__)

@app.route('/api/tupleCount')
def tuple_count():
    try:
        result = get_total_tuples()
        if result is None:
            return jsonify({'error': 'No data retrieved'})
        return result
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_total_tuples():
    try:
        sql_tuples = """
        SELECT SUM(total_count) AS total_tuples
        FROM (
            SELECT COUNT(*) AS total_count FROM zhouxiangyu.CRASHES
            UNION ALL
            SELECT COUNT(*) AS total_count FROM zhouxiangyu.INVOLVEDPARTIES
        )
        """

        with oracledb.connect(user='blakemontiegel', password='lMQepNByzGppFPtHUasKwhty', dsn='oracle.cise.ufl.edu/orcl') as connection:
            cursor = connection.cursor()
            cursor.execute(sql_tuples)
            columns = [col[0] for col in cursor.description]
            data = pd.DataFrame(cursor.fetchall(), columns=columns)
            if data.empty:
                return None
            total_tuples = data['TOTAL_TUPLES'].iloc[0]
            print(f"Total tuples: {total_tuples}")  # Print total tuples value
            return jsonify({'total_tuples': total_tuples})
    except oracledb.DatabaseError as e:
        # Print database error
        print(f"Database error: {e}")
        return None
    except Exception as e:
        # Print any other errors
        print(f"Error: {e}")
        return None
