import numpy as np
import pymysql
from datetime import datetime

conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='smartdata', charset='utf8mb4')

cur = conn.cursor()


def criaMatriz(num):
    """

    :rtype: matriz quadrada com todos valores 1
    """
    A = np.ones(dtype=np.float16, shape=(num, num))
    return A


def transformaNota(nota):
    """

    :param nota: nota bruta da entrada
    :return: nota para fazer a conta das preferências
    """
    if nota == 1:
        nota = 9
    elif nota == 2:
        nota = 5
    elif nota == 3:
        nota = 1
    elif nota == 4:
        nota = (1 / 5)
    elif nota == 5:
        nota = (1 / 9)
    return nota


# criação vetor de notas
notas = np.ones(shape=10)

precoMax = int(input("Qual o preço máximo? "))

# leitura de notas
print("Mais importante\t\tNeutro\t\t Mais importante")
print("1\t\t\t2\t\t\t3\t\t\t4\t\t\t5 ")
notas[0] = int(input("Camera\t\t\t\tx\t\t\t\tDesempenho\n"))
notas[1] = int(input("Camera\t\t\t\tx\t\t\t\tTela\n"))
notas[2] = int(input("Camera\t\t\t\tx\t\t\t\tBateria\n"))
notas[3] = int(input("Camera\t\t\t\tx\t\t\t\tArmazenamento\n"))
notas[4] = int(input("Desempenho\t\t\t\tx\t\t\t\tTela\n"))
notas[5] = int(input("Desempenho\t\t\t\tx\t\t\t\tBateria\n"))
notas[6] = int(input("Desempenho\t\t\t\tx\t\t\t\tArmazenamento\n"))
notas[7] = int(input("Tela\t\t\t\tx\t\t\t\tBateria\n"))
notas[8] = int(input("Tela\t\t\t\tx\t\t\t\tArmazenamento\n"))
notas[9] = int(input("Bateria\t\t\t\tx\t\t\t\tArmazenamento\n"))


for x in range(10):
    notas[x] = transformaNota(notas[x])


# cria matriz 5x5
matriz = criaMatriz(5)


# calculo da matriz
matriz[0][1] = notas[0]
matriz[0][2] = notas[1]
matriz[0][3] = notas[2]
matriz[0][4] = notas[3]
matriz[1][2] = notas[4]
matriz[1][3] = notas[5]
matriz[1][4] = notas[6]
matriz[2][3] = notas[7]
matriz[2][4] = notas[8]
matriz[3][4] = notas[9]


i = 0
x = 0
j = 0

for z in range(16):
    if i != j:
        matriz[j][i] = (1 / matriz[i][j])
        x += 1
    if j < 4:
        j += 1
    else:
        i += 1
        j = i

#print(matriz)


# soma das colunas para normalização
somaColunas = np.sum(matriz, axis=0)


# nova matriz normalizada
i = 0
j = 0
for z in range(25):
    matriz[i][j] /= somaColunas[j]
    if j < 4:
        j += 1
    else:
        i += 1
        j = 0

# nota final dos critérios
notaFinal = np.sum(matriz, axis=1)/5

notaCamera = notaFinal[0]
notaDesempenho = notaFinal[1]
notaTela = notaFinal[2]
notaBateria = notaFinal[3]
notaArmazenamento = notaFinal[4]

#print("\n\nNota camera " + str(notaCamera))
#print("Nota Desempenho " + str(notaDesempenho))
#print("Nota Tela " + str(notaTela))
#print("Nota Bateria " + str(notaBateria))
#print("Nota Armazenamento " + str(notaArmazenamento))

now = datetime.now()

query = \
    "SELECT *,(" \
    "`notaCamera` /5* "+str(notaCamera)+" + " \
    "`notaTela` /5 * "+str(notaTela)+" + "\
    "`notaDesempenho` /5 * "+str(notaDesempenho)+" +"\
    "1/(2^(log2(constantes.`TOParmazenamento`) - log2(`armazenamentoMax`))) * "+str(notaArmazenamento)+" + "\
    "`bateria` / constantes.`TOPbateria` * "+str(notaBateria)+" + " \
    "  ("+str(precoMax)+" - `precoMin`)/"+str(precoMax)+ \
    " + 1/(2^(log2(constantes.`TOPRAM`) - log2(`ramMax`))) * "+str(notaDesempenho)+"  + " \
    "1/(2^("+str(now.year)+"-`ano`)) )"\
    "  as `SCORE`"\
    "FROM `rawdata`, "\
    "(SELECT MAX(`ramMax`) as `TOPRAM`, MAX(`armazenamentoMax`) as `TOParmazenamento`, MAX(`bateria`) as `TOPbateria`, (" + str(precoMax) + " " \
                                    " - 0.6*("+str(precoMax)+" - MIN(`precoMin`))) as `MinPreco`  FROM `rawdata` WHERE `precoMin` > 0) as constantes "\
    "WHERE `ano` > 2016 AND `precoMin` BETWEEN `MinPreco` AND " + str(precoMax) + " " \
    "ORDER BY `SCORE` DESC LIMIT 10"

#print(query)

cur.execute(query)
result = cur.fetchall()
for row in result:
  print (row)

conn.close()
