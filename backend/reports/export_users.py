import pandas as pd
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_users():
    try:
        connection = psycopg2.connect(
            host=os.getenv('DB_HOST'),
            database=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASS')
        )
        
        query = """
        SELECT u.id_users, u.name_users, u.registration_users, u.email_users, 
               p.name_profile, s.number_store
        FROM "oferte-ganhe".users u
        JOIN "oferte-ganhe".profile p ON u.id_profile = p.id_profile
        JOIN "oferte-ganhe".store s ON u.id_store = s.id_store
        """

        df = pd.read_sql_query(query, connection)
        
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
        reports_folder = os.path.join(project_root, 'relatorios')
        os.makedirs(reports_folder, exist_ok=True)

        csv_path = os.path.join(reports_folder, 'usuarios.csv')
        
        df.to_csv(csv_path, index=False)
        print(f"Relatório exportado com sucesso: {csv_path}")

        return csv_path
    except Exception as e:
        print(f"Erro ao exportar relatório: {e}")
        raise e
    finally:
        if connection:
            connection.close()

if __name__ == '__main__':
    export_users()
