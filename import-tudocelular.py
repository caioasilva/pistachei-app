import requests
import json
import unicodedata
from pprint import pprint
from bs4 import BeautifulSoup
colunas = []
bd = {}

import pymysql


conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='smartdata', charset='utf8mb4')

cur = conn.cursor()
'''
cur.execute("SHOW columns FROM dados;")
for coluna in cur.fetchall():
    colunas.append(coluna[0])

cur.execute("SELECT `gsmarenaId` FROM dados ORDER BY `gsmarenaId` DESC;")
id = cur.fetchone()[0]
print("Ultimo id: ",id)
#for i in range(id+1,9200):
'''

for id in range(4844,3000,-1):
    #try:
        dados = requests.get("https://www.tudocelular.com/new_files/redirs/model.php?id=" + str(id))
        if dados.status_code == 200 and dados.url != "https://www.tudocelular.com" :
            soup = BeautifulSoup(dados.content, "html.parser")

            dados_telefone = {}
            div1 = soup.find("div",{"id":"controles_titles"})
            div2 = soup.find("div",{"id":"phone_columns"})
            caract,atrib = div1.find_all("li"),div2.find_all("li")

            for i in range(0,len(caract)):
               #print (caract[i].text,)
                if atrib[i].text == "":
                    ok = atrib[i].find("i",{"class":"ok"})
                    if ok is not None:
                        att = True
                    else:
                        att = False
                else:
                    att = unicodedata.normalize("NFKD", atrib[i].text).replace("\n", "").replace("\r", "|").replace("'", "''")

                carac = unicodedata.normalize("NFKD", caract[i].text).replace("\n", "").replace("\r", "|").replace("'", "''")
                dados_telefone[carac]= att
            img = (soup.find("aside", {"class": 'narrow_column'}).find("img")["src"])
            dados_telefone["Imagem"]=img

            divTitulo = soup.find("div",{"id":"fwide_column"}).find("h2")
            marca = divTitulo.find("strong").text
            #marca = "abc"
            modelo = (divTitulo.text)[len(marca)+1:]
            dados_telefone["Marca"]=marca
            dados_telefone["Modelo"]=modelo
            #pprint(dados_telefone)

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
                if dRam[1].upper()=="MB":
                    ramMax /= 1024
            else:
                ramMax = None
            if "Memória Max" in dados_telefone:
                dMem = dados_telefone["Memória Max"].split(" ")
                ArmazenamentoMax = float(dMem[0])
                if dMem[1].upper()=="MB":
                    ArmazenamentoMax /= 1024
            else:
                ArmazenamentoMax = None
            if "Faixa de Preço" in dados_telefone:
                preco = dados_telefone["Faixa de Preço"].split(" ")
                precoMax = preco[len(preco) - 1].replace(".","")
                precoMin = preco[1].replace(".","")
            else:
                precoMax = None
                precoMin = None
            if "Disponibilidade" in dados_telefone:
                dAno = dados_telefone["Disponibilidade"].split("/")
                ano = dAno[0]
                trimestre = dAno[1]
            else:
                ano = None
            if "Impressão digital" in dados_telefone:
                impressaodig = dados_telefone["Impressão digital"]
            else:
                impressaodig = False

            query = "INSERT INTO rawdata (tudocelularId,marca,modelo,notaCamera,notaTela,notaDesempenho,bateria,armazenamentoMax,ramMax,sensorDigital,precoMin,precoMax,ano,trimestre,imagem)" \
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            cur.execute(query,(id,marca,modelo,notaCamera,notaTela,notaDesempenho,bateria,ArmazenamentoMax,ramMax,impressaodig,precoMin,precoMax,ano,trimestre,img))
            conn.commit()
            print(id," ",marca," ",modelo)
            #print(trimestre)
        else:
            print(id," não existe")
    #except:
        #print("ERRO: ", i, " Modelo: ", modelo)
conn.close()