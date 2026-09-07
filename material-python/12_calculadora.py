"""Calculadora básica: entrada, función, condicionales y manejo de errores."""
import math


def calcular(a, b, operacion):
    if operacion == "+":
        return a + b
    elif operacion == "-":
        return a - b
    elif operacion == "*":
        return a * b
    elif operacion == "/":
        if b == 0:
            return "No se puede dividir entre cero"
        return a / b
    return "Operación no válida"


try:
    primero = float(input("Primer número (usa punto decimal): "))
    segundo = float(input("Segundo número: "))
    operacion = input("Operación (+, -, *, /): ").strip()
    if not math.isfinite(primero) or not math.isfinite(segundo):
        print("Escribe números finitos.")
    else:
        resultado = calcular(primero, segundo, operacion)
        if isinstance(resultado, (int, float)) and not math.isfinite(resultado):
            print("El resultado es demasiado grande.")
        else:
            print("Resultado:", resultado)
except ValueError:
    print("Entrada inválida. Escribe números; usa punto para los decimales.")
