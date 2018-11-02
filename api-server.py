from flask import Flask, request
from flask_script import Server, Manager
from Calculo_v1 import Calculo
from flaskext.mysql import MySQL
import simplejson

app = Flask(__name__)
app.debug = True
manager = Manager(app)
manager.add_command("runserver", Server())

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'smartdata'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route('/calcula', methods=['POST'])
def calcula():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        precoMax = request.form.get('precoMax')
        entrada = [request.form.get('v1'), request.form.get('v2'), request.form.get('v3'), request.form.get('v4'),
                   request.form.get('v5'), request.form.get('v6'), request.form.get('v7'), request.form.get('v8'),
                   request.form.get('v9'), request.form.get('v10')]
        results = Calculo(cursor, precoMax, entrada).resultado()
        return simplejson.dumps({'resultado': results})

    except Exception as e:
        return simplejson.dumps({'erro': str(e)})
    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    manager.run()
