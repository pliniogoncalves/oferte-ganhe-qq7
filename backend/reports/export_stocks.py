import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_stocks():
    try:
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
        engine = create_engine(connection_string)

        query = """
        SELECT 
            s.id_stock,
            st.number_store AS store_number,
            s.current_stock,
            s.minimum_stock,
            s.recommended_stock,
            s.status_stock
        FROM "oferte-ganhe".Stock s
        LEFT JOIN "oferte-ganhe".Store st ON s.id_store = st.id_store;
        """

        df = pd.read_sql_query(query, engine)

        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
        reports_folder = os.path.join(project_root, 'relatorios')
        os.makedirs(reports_folder, exist_ok=True)

        csv_path = os.path.join(reports_folder, 'estoques.csv')
        df.to_csv(csv_path, index=False)

        print(f"Relatório exportado com sucesso: {csv_path}")
        print("STATUS: SUCCESS")
        sys.exit(0)
    except Exception as e:
        print(f"Erro ao exportar relatório: {e}")
        print("STATUS: ERROR")
        sys.exit(1)

if __name__ == '__main__':
    export_stocks()
