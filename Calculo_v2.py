import numpy as np
from datetime import datetime


class Calculo:
    def __init__(self, cur, precoMax, notas):
        self.cur = cur
        self.notas = np.array(notas)
        self.precoMax = precoMax

    def criaMatriz(self,num):
        """

        :rtype: matriz quadrada com todos valores 1
        """
        A = np.ones(dtype=np.float16, shape=(num, num))
        return A


    def transformaNota(self,nota):
        """

        :param nota: nota bruta da entrada
        :return: nota para fazer a conta das preferências
        """
        if nota == 2:
            return 3
        elif nota == 3:
            return 5
        elif nota == 4:
            return 7
        elif nota == 5:
            return 9
        return nota


    def calculaMatrix(self):
            
        for x in range(5):
            self.notas[x] = self.transformaNota(self.notas[x])
    
    
        # cria matriz 5x5
        matriz = self.criaMatriz(5)

        # calculo da matriz
        matriz[0][1] = self.notas[0] / self.notas[1]
        matriz[0][2] = self.notas[0] / self.notas[2]
        matriz[0][3] = self.notas[0] / self.notas[3]
        matriz[0][4] = self.notas[0] / self.notas[4]
        matriz[1][2] = self.notas[1] / self.notas[2]
        matriz[1][3] = self.notas[1] / self.notas[3]
        matriz[1][4] = self.notas[1] / self.notas[4]
        matriz[2][3] = self.notas[2] / self.notas[3]
        matriz[2][4] = self.notas[2] / self.notas[4]
        matriz[3][4] = self.notas[3] / self.notas[4]
    
    
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

        self.notaCamera = notaFinal[0]
        self.notaDesempenho = notaFinal[1]
        self.notaTela = notaFinal[2]
        self.notaBateria = notaFinal[3]
        self.notaArmazenamento = notaFinal[4]
    
        #print("\n\nNota camera " + str(notaCamera))
        #print("Nota Desempenho " + str(notaDesempenho))
        #print("Nota Tela " + str(notaTela))
        #print("Nota Bateria " + str(notaBateria))
        #print("Nota Armazenamento " + str(notaArmazenamento))

    def consultaSQL(self):
        now = datetime.now()

        query = \
            "SELECT *,(" \
            "`notaCamera` /5* "+str(self.notaCamera)+" + " \
            "`notaTela` /5 * "+str(self.notaTela)+" + "\
            "`notaDesempenho` /5 * "+str(self.notaDesempenho)+" +"\
            "1/(2^(log2(constantes.`TOParmazenamento`) - log2(`armazenamentoMax`))) * "+str(self.notaArmazenamento)+" + "\
            "`bateria` / constantes.`TOPbateria` * "+str(self.notaBateria)+" + " \
            "  ("+str(self.precoMax)+" - `precoMin`)/"+str(self.precoMax)+ \
            " + 1/(2^(log2(constantes.`TOPRAM`) - log2(`ramMax`))) * "+str(self.notaDesempenho)+"  + " \
            "1/(2^("+str(now.year)+"-`ano`)) )"\
            "  as `SCORE`"\
            "FROM `rawdata`, "\
            "(SELECT MAX(`ramMax`) as `TOPRAM`, MAX(`armazenamentoMax`) as `TOParmazenamento`, MAX(`bateria`) as `TOPbateria`, (" + str(self.precoMax) + " " \
                                            " - 0.6*("+str(self.precoMax)+" - MIN(`precoMin`))) as `MinPreco`  FROM `rawdata` WHERE `precoMin` > 0) as constantes "\
            "WHERE `ano` > 2016 AND `precoMin` BETWEEN `MinPreco` AND " + str(self.precoMax) + " " \
            "ORDER BY `SCORE` DESC LIMIT 10"

        #print(query)

        self.cur.execute(query)
        row_headers = [x[0] for x in self.cur.description]  # this will extract row headers
        rv = self.cur.fetchall()
        data = []
        for result in rv:
            data.append(dict(zip(row_headers, result)))
        return data

    def resultado(self):
        self.calculaMatrix()
        return self.consultaSQL()
