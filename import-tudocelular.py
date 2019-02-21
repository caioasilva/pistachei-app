import requests
import json
import unicodedata
from pprint import pprint
from bs4 import BeautifulSoup
from multiprocessing.dummy import Pool as ThreadPool
import multiprocessing
import pymysql

conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='smartdata',
                                   charset='utf8mb4')
semaphore = multiprocessing.Semaphore(1)

cur = conn.cursor()

def busca_tudoCelular(id):
    dados = requests.get("https://www.tudocelular.com/new_files/redirs/model.php?id=" + str(id))
    if dados.status_code == 200 and dados.url != "https://www.tudocelular.com":

        soup = BeautifulSoup(dados.content, "html.parser")

        dados_telefone = {}
        div1 = soup.find("div", {"id": "controles_titles"})
        div2 = soup.find("div", {"id": "phone_columns"})
        caract, atrib = div1.find_all("li"), div2.find_all("li")

        for i in range(0, len(caract)):
            # print (caract[i].text,)
            if atrib[i].text == "":
                ok = atrib[i].find("i", {"class": "ok"})
                if ok is not None:
                    att = True
                else:
                    att = False
            else:
                att = unicodedata.normalize("NFKD", atrib[i].text).replace("\n", "").replace("\r", "|").replace("'",
                                                                                                                "''")

            carac = unicodedata.normalize("NFKD", caract[i].text).replace("\n", "").replace("\r", "|").replace("'",
                                                                                                               "''")
            dados_telefone[carac] = att
        img = (soup.find("aside", {"class": 'narrow_column'}).find("img")["src"])
        dados_telefone["Imagem"] = img

        divTitulo = soup.find("div", {"id": "fwide_column"}).find("h2")
        marca = divTitulo.find("strong").text
        # marca = "abc"
        modelo = (divTitulo.text)[len(marca) + 1:]
        dados_telefone["Marca"] = marca
        dados_telefone["Modelo"] = modelo
        # pprint(dados_telefone)

        notaCamera = (dados_telefone["- Câmera"].split(" ")[0])
        notaTela = (dados_telefone["- Tela"].split(" ")[0])
        notaDesempenho = (dados_telefone["- Desempenho"].split(" ")[0])
        if "Ampere" in dados_telefone:
            bateria = int(dados_telefone["Ampere"].split(" ")[0])
        else:
            bateria = None
        if "RAM" in dados_telefone:
            dRam = dados_telefone["RAM"].split(" ")
            ramMax = float(dRam[0])
            if dRam[1].upper() == "MB":
                ramMax /= 1024
        else:
            ramMax = None
        if "Memória Max" in dados_telefone:
            dMem = dados_telefone["Memória Max"].split(" ")
            try:
                ArmazenamentoMax = float(dMem[0])
                if dMem[1].upper() == "MB":
                    ArmazenamentoMax /= 1024
            except:
                ArmazenamentoMax = 0
        else:
            ArmazenamentoMax = None
        if "Faixa de Preço" in dados_telefone:
            preco = dados_telefone["Faixa de Preço"].split(" ")
            precoMax = preco[len(preco) - 1].replace(".", "")
            precoMin = preco[1].replace(".", "")
        else:
            precoMax = None
            precoMin = None
        if "Disponibilidade" in dados_telefone:
            dAno = dados_telefone["Disponibilidade"].split("/")
            ano = dAno[0]
            trimestre = dAno[1]
        else:
            ano = None
            trimestre = None
        if "Impressão digital" in dados_telefone:
            impressaodig = dados_telefone["Impressão digital"]
        else:
            impressaodig = False

        resultado = {
            "id": id, "marca": marca, "modelo": modelo, "notaCamera": notaCamera, "notaTela": notaTela,
            "notaDesempenho": notaDesempenho, "bateria": bateria, "armazenamentoMax": ArmazenamentoMax,
            "ramMax": ramMax, "impressaodig": impressaodig, "precoMin": precoMin, "precoMax": precoMax,
            "ano": ano, "trimestre": trimestre, "img": img
             }
        return resultado
    else:
        return None

def insert(id):
    consulta = busca_tudoCelular(id)
    if consulta is not None:
        query = "INSERT INTO rawdata (tudocelularId,marca,modelo,notaCamera,notaTela,notaDesempenho,bateria,armazenamentoMax,ramMax,sensorDigital,precoMin,precoMax,ano,trimestre,imagem)" \
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        with semaphore:
            cur.execute(query, (id,
            consulta["marca"], consulta["modelo"], consulta["notaCamera"], consulta["notaTela"],
            consulta["notaDesempenho"], consulta["bateria"], consulta["armazenamentoMax"], consulta["ramMax"],
            consulta["impressaodig"], consulta["precoMin"], consulta["precoMax"], consulta["ano"],
            consulta["trimestre"], consulta["img"]))
            conn.commit()
        print("Insert", id, consulta["marca"], consulta["modelo"])
    else:
        if id<max:
            try:
                query = "INSERT INTO invalid (tudocelularId) VALUES (%s)"
                with semaphore:
                    cur.execute(query, (id))
                    conn.commit()
            except:
                query = "UPDATE invalid SET atualizado = NOW() WHERE tudocelularId = %s"
                with semaphore:
                    cur.execute(query, (id))
                    conn.commit()
        print("Não existe", id)

def update(id):
    consulta = busca_tudoCelular(id)
    if consulta is not None:
        query = "UPDATE rawdata SET marca = %s,modelo = %s,notaCamera = %s,notaTela = %s,notaDesempenho = %s,bateria = %s,armazenamentoMax = %s,ramMax = %s,sensorDigital = %s,precoMin = %s,precoMax = %s,ano = %s,trimestre = %s,imagem = %s, atualizado = NOW()" \
                "WHERE tudocelularId = %s"
        with semaphore:
            cur.execute(query, (
            consulta["marca"], consulta["modelo"], consulta["notaCamera"], consulta["notaTela"],
            consulta["notaDesempenho"], consulta["bateria"], consulta["armazenamentoMax"], consulta["ramMax"],
            consulta["impressaodig"], consulta["precoMin"], consulta["precoMax"], consulta["ano"],
            consulta["trimestre"], consulta["img"], id))
            conn.commit()
        print("Update", id, consulta["marca"], consulta["modelo"])
    else:
        query = "UPDATE rawdata SET ativo = 0 WHERE tudocelularId = %s"
        with semaphore:
            cur.execute(query, (id))
            conn.commit()
        print("Delete", id)


print("Iniciando atualização de celulares já existentes no banco")
lista = []
cur.execute("SELECT `tudocelularId` FROM `rawdata` WHERE `atualizado` < (NOW() - INTERVAL 1 HOUR)  ORDER BY `tudocelularId` DESC")
rows = cur.fetchall()
for row in rows:
    lista.append(row[0])
pool = ThreadPool(8)
pool.map(update, lista)
pool.close()
pool.join()


cur.execute("SELECT MAX(tudocelularId) FROM `rawdata`")
max = int(cur.fetchone()[0])
cur.execute("SELECT MIN(tudocelularId) FROM `rawdata` WHERE `ano` >= 2017")
min = int(cur.fetchone()[0])
seq = "seq_"+str(min)+"_to_"+str(max+100)
print("\nIniciando a busca por novos modelos e por ids faltantes que possam ter sido reativados")
cur.execute("SELECT  tudocelularId FROM (SELECT seq as tudocelularId FROM "+seq+") s WHERE   tudocelularId NOT IN" \
            "(SELECT tudocelularId FROM rawdata UNION SELECT tudocelularId FROM invalid WHERE `atualizado` > (NOW() - INTERVAL 14 DAY) ORDER BY `tudocelularId`)")
lista2 = []
rows = cur.fetchall()
for row in rows:
    lista2.append(row[0])

pool = ThreadPool(8)
pool.map(insert, lista2)

pool.close()
pool.join()

conn.close()
