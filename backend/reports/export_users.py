import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

# Carregar variáveis de ambiente
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_users():
    try:
        # Configura a conexão usando SQLAlchemy
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
        engine = create_engine(connection_string)

        # Query para exportação
        query = """
        SELECT u.id_users, u.name_users, u.registration_users, u.email_users, 
               p.name_profile, s.number_store
        FROM "oferte-ganhe".users u
        JOIN "oferte-ganhe".profile p ON u.id_profile = p.id_profile
        JOIN "oferte-ganhe".store s ON u.id_store = s.id_store
        """

        # Executa a query e gera o DataFrame
        df = pd.read_sql_query(query, engine)

        # Define o caminho para salvar o CSV
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
        reports_folder = os.path.join(project_root, 'relatorios')
        os.makedirs(reports_folder, exist_ok=True)

        csv_path = os.path.join(reports_folder, 'usuarios.csv')
        df.to_csv(csv_path, index=False)

        print(f"Relatório exportado com sucesso: {csv_path}")
        print("STATUS: SUCCESS")  # Mensagem final de sucesso
        sys.exit(0)  # Encerramento bem-sucedido
    except Exception as e:
        print(f"Erro ao exportar relatório: {e}")
        print("STATUS: ERROR")  # Mensagem final de erro
        sys.exit(1)  # Encerramento com erro

if __name__ == '__main__':
    export_users()
