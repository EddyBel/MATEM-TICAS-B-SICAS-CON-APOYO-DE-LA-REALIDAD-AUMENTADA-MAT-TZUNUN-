import os

db_host = os.environ.get('MYSQL_HOST', 'localhost')
db_users = os.environ.get('MYSQL_USER', 'root')
db_password = os.environ.get('MYSQL_PASSWORD', 'liafumb')
db_name = os.environ.get('MYSQL_DB', 'matzz')
db_port = os.environ.get('MYSQL_PORT', '3306')

env = os.environ.get('ENV', 'development')
debug_mode = True if env == 'development' else False