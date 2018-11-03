from flask import Flask, request
from flask_script import Server, Manager
import Calculo_v1
import Calculo_v2
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


@app.route('/v1', methods=['POST'])
def calcula_v1():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        precoMax = request.form.get('precoMax')
        entrada = [request.form.get('v1'), request.form.get('v2'), request.form.get('v3'), request.form.get('v4'),
                   request.form.get('v5'), request.form.get('v6'), request.form.get('v7'), request.form.get('v8'),
                   request.form.get('v9'), request.form.get('v10')]
        results = Calculo_v1.Calculo(cursor, precoMax, entrada).resultado()
        return simplejson.dumps({'resultado': results})

    except Exception as e:
        return simplejson.dumps({'erro': str(e)})
    finally:
        cursor.close()
        conn.close()


@app.route('/v2', methods=['POST'])
def calcula_v2():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        precoMax = request.form.get('precoMax')
        entrada = [int(request.form.get('camera')), int(request.form.get('desempenho')), int(request.form.get('tela')),
                   int(request.form.get('bateria')), int(request.form.get('armazenamento'))]
        results = Calculo_v2.Calculo(cursor, precoMax, entrada).resultado()
        return simplejson.dumps({'resultado': results})

    except Exception as e:
        return simplejson.dumps({'erro': str(e)}), 403
    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    manager.run()
