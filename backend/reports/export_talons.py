import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_talons():
    try:
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
        engine = create_engine(connection_string)

        query = """
        SELECT t.id_talon,
        t.date_send,
        us.name_users AS user_send,  
        t.date_received,
        ur.name_users AS user_received, 
        t.quantity_talon, 
        t.status_talon,
        s.number_store
        FROM "oferte-ganhe".Talon t
        JOIN "oferte-ganhe".Store s ON t.id_store = s.id_store
        JOIN "oferte-ganhe".Users us ON t.user_send = us.id_users
        LEFT JOIN "oferte-ganhe".Users ur ON t.user_received = ur.id_users;
        """

        df = pd.read_sql_query(query, engine)

        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
        reports_folder = os.path.join(project_root, 'relatorios')
        os.makedirs(reports_folder, exist_ok=True)

        csv_path = os.path.join(reports_folder, 'taloes.csv')
        df.to_csv(csv_path, index=False)

        print(f"Relatório exportado com sucesso: {csv_path}")
        print("STATUS: SUCCESS")
        sys.exit(0)
    except Exception as e:
        print(f"Erro ao exportar relatório: {e}")
        print("STATUS: ERROR")
        sys.exit(1)

if __name__ == '__main__':
    export_talons()
