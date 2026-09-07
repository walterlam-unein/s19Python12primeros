# input devuelve texto. int o float permiten convertirlo a número.
nombre = input("Nombre: ")
try:
    vueltas = int(input("Vueltas completas: "))
    tiempo = float(input("Tiempo por vuelta (usa punto decimal): "))
    print(nombre, "tardó", vueltas * tiempo, "segundos")
except ValueError:
    print("Escribe un entero para las vueltas y un número para el tiempo.")
