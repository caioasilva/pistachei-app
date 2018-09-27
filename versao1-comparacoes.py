import numpy as np


def criaMatriz(num):
    """

    :rtype: matriz quadrada com todos valores 1
    """
    A = np.ones(dtype=np.float16, shape=(num, num))
    return A


def transformaNota(nota):
    if nota == 1:
        nota = 5
    elif nota == 2:
            nota = 3
    elif nota == 3:
        nota = 1
    elif nota == 4:
        nota = (1 / 3)
    elif nota == 5:
        nota = (1 / 5)
    return nota


# criação vetor de notas
notas = np.ones(shape=10)

# leitura de notas
print("Mais importante \t\t\t Neutro \t\t\t Mais importante")
print("1\t\t\t\t2\t\t\t\t3\t\t\t\t4\t\t\t\t5 ")
notas[0] = int(input("Camera\t\t\tx\t\t\tDesempenho\n"))
notas[1] = int(input("Camera\t\t\tx\t\t\tTela\n"))
notas[2] = int(input("Camera\t\t\tx\t\t\tBateria\n"))
notas[3] = int(input("Camera\t\t\tx\t\t\tArmazenamento\n"))
notas[4] = int(input("Desempenho\t\t\tx\t\t\tTela\n"))
notas[5] = int(input("Desempenho\t\t\tx\t\t\tBateria\n"))
notas[6] = int(input("Desempenho\t\t\tx\t\t\tArmazenamento\n"))
notas[7] = int(input("Tela\t\t\tx\t\t\tBateria\n"))
notas[8] = int(input("Tela\t\t\tx\t\t\tArmazenamento\n"))
notas[9] = int(input("Bateria\t\t\tx\t\t\tArmazenamento\n"))


for x in range(10):
    notas[x] = transformaNota(notas[x])


# cria matriz 5x5
matriz = criaMatriz(5)


# calculo da matriz
i = 0
x = 0
j = 0

for z in range(16):
    if i != j:
        matriz[i][j] = notas[x]
        x += 1
    if j < 4:
        j += 1
    else:
        i += 1
        j = i

i = 0
x = 0
j = 0

for z in range(16):
    if i != j:
        matriz[j][i] = (1 / notas[x])
        x += 1
    if j < 4:
        j += 1
    else:
        i += 1
        j = i


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

print("\n\nNota camera" + str(notaCamera))
print("Nota Desempenho" + str(notaDesempenho))
print("Nota Tela" + str(notaTela))
print("Nota Bateria" + str(notaBateria))
print("Nota Armazenamento" + str(notaArmazenamento))
