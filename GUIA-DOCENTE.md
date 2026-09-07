# Guía docente: 72 ejercicios y soluciones

12 ejercicios por versión. Cada ejercicio incorrecto descuenta 0,25: nota = 10 − 0,25 × errores. Las preguntas con varias piezas cuentan como un solo ejercicio.

## Versión A

### A01 · Comentarios: Solo se ejecuta el código

El programa viene del caso de comentarios de clase. ¿Qué aparece en pantalla?

**Guía:** Lee solo las instrucciones activas. Fuera de las comillas, # inicia un comentario hasta el final de la línea.

```python
# Precio de los cuadernos
precio = 5
cantidad = 3
# print("67")
print(precio * cantidad)
```

**Respuesta:**

```text
15
```

Python ignora las líneas que empiezan con #. Solo se ejecuta print(precio * cantidad): 5 × 3 = 15.

### A02 · Imprimir en pantalla: Un mensaje, una instrucción

Completa la línea para mostrar el texto Grand Prix of Italy.

**Guía:** Selecciona la pieza que sustituye a ___. print() muestra texto entre comillas o el valor de una variable.

```python
___("Grand Prix of Italy")
```

**Respuesta:**

```text
Pieza que falta: print
```

print() muestra información. input() pide un dato; int() convierte un valor.

### A03 · Tipos de variables: Cada dato tiene su tipo

Relaciona los cuatro datos del laboratorio con su tipo.

**Guía:** int: entero · float: decimal · str: texto · bool: True o False. Elige un tipo en cada fila.

**Respuesta:**

```text
numero = 67 → int
tiempo = 2.5 → float
heroe = "Spider-Man" → str
listo = True → bool
```

El tipo depende del valor: los enteros son int, los decimales float, los textos entre comillas str y los valores lógicos bool. Un número entre comillas sigue siendo texto.

### A04 · Operaciones: Suministros para el box

Cada caja tiene 4 botellas. Hay 3 cajas y se usan 2 botellas. ¿Cuántas quedan?

**Guía:** Sigue el orden: paréntesis; multiplicación y división; suma y resta. % obtiene el resto y // la división entera.

```python
botellas = 4 * 3 - 2
print(botellas)
```

**Respuesta:**

```text
10
```

Primero se multiplica: 4 × 3 = 12. Después se resta 2: quedan 10.

### A05 · Entrada con input: La entrada no es un entero

El usuario escribe 3. ¿En qué línea se produce el TypeError?

**Guía:** input() siempre devuelve str. Elige la línea donde Python intenta hacer la operación incompatible, no la línea donde se pide el dato.

```python
vueltas = input("Vueltas: ")
total = vueltas + 1
print(total)
```

**Respuesta:**

```text
Línea 2 · total = vueltas + 1
```

input devuelve texto. En la línea 2 no se puede sumar "3" y 1. Convierte la entrada con int().

### A06 · Funciones: Una función en cuatro pasos

Ordena la función que duplica las vueltas de práctica.

**Guía:** Usa ↑ y ↓: primero define la función con def, luego su return con sangría, después llámala y al final imprime el resultado.

**Respuesta:**

```text
def duplicar(numero):
    return numero * 2
resultado = duplicar(3)
print(resultado)
```

La función se define antes de llamarla. return entrega el valor al programa. El resultado que se imprime es 6.

### A07 · Condicionales: Entrada al box

¿Qué mensaje elige el programa?

**Guía:** Evalúa la condición como verdadera o falsa. Solo se ejecuta uno de los dos bloques. == compara; = asigna.

```python
combustible = 2
if combustible < 3:
    print("Entrar al box")
else:
    print("Seguir")
```

**Respuesta:**

```text
Entrar al box
```

2 < 3 es verdadero: se ejecuta el bloque if y se omite el else.

### A08 · Bucles: Tres vueltas, sin repetir código

Completa el bucle para imprimir 1, 2 y 3, cada número en una línea.

**Guía:** for recorre una secuencia. range no incluye el límite final. while repite mientras la condición sea verdadera y necesita una actualización para poder terminar.

```python
for vuelta in ___:
    print(vuelta)
```

**Respuesta:**

```text
Instrucción que falta: range(1, 4)
```

range(1, 4) empieza en 1 y se detiene antes de 4.

### A09 · Listas: Segundo en la parrilla

¿Qué nombre se imprime?

**Guía:** Una lista guarda elementos en orden. Empieza a contar en 0. len() cuenta elementos y append() añade uno al final.

```python
pilotos = ["Alex", "Dani", "Sam"]
print(pilotos[1])
```

**Respuesta:**

```text
Dani
```

Las listas empiezan en el índice 0. El índice 1 corresponde al segundo elemento: Dani.

### A10 · Diccionarios: Leer por su clave

Completa la clave para imprimir 67.

**Guía:** Un diccionario relaciona claves con valores. Si la clave es texto, escríbela entre comillas dentro de [] o de get().

```python
piloto = {"nombre": "Alex", "puntos": 67}
print(piloto[___])
```

**Respuesta:**

```text
Clave que falta: "puntos"
```

Los diccionarios se consultan por clave. La clave "puntos" tiene el valor 67.

### A11 · Dibujos con turtle: Un dibujo, paso a paso

Completa el giro para dibujar un cuadrado. Hay 4 lados iguales.

**Guía:** forward avanza y right gira en grados. Para cerrar un polígono regular, el giro exterior es 360 ÷ número de lados. Sustituye ___.

```python
import turtle
for lado in range(4):
    turtle.forward(80)
    turtle.right(___)
turtle.done()
```

**Respuesta:**

```text
Giro en grados: 90
```

360 ÷ 4 = 90°. Se avanza y gira 4 veces para cerrar el dibujo. El giro de turtle es el exterior, no el ángulo interior.

### A12 · Calculadora: Tu primera calculadora

Suma los puntos de dos rondas. Completa las dos piezas para sumar.

**Guía:** 1. Elige el operador que pide el problema. 2. Llama a calcular con a y b para guardar lo que devuelve return. float admite números con decimales.

```python
def calcular(a, b):
    return a [1] b

a = float(input("Primer número: "))
b = float(input("Segundo número: "))
resultado = [2]
print(resultado)
```

**Respuesta:**

```text
[1] Operador: +
[2] Llamada a la función: calcular(a, b)
```

El operador + permite sumar. calcular(a, b) devuelve el resultado y lo guarda en resultado. Con 4 y 3 se obtiene 7.

## Versión B

### B01 · Comentarios: La línea que queda fuera

¿Qué mensaje sí verá Peter al ejecutar este código?

**Guía:** Lee solo las instrucciones activas. Fuera de las comillas, # inicia un comentario hasta el final de la línea.

```python
# Mensajes de Spider-Man
# print("Telaraña lista")
print("Ruta lista")
```

**Respuesta:**

```text
Ruta lista
```

Las dos primeras líneas son comentarios. El único print activo muestra Ruta lista.

### B02 · Imprimir en pantalla: El número 67

Completa la instrucción para imprimir el valor de numero, sin escribir la palabra numero.

**Guía:** Selecciona la pieza que sustituye a ___. print() muestra texto entre comillas o el valor de una variable.

```python
numero = 67
print(___)
```

**Respuesta:**

```text
Pieza que falta: numero
```

Una variable va sin comillas cuando quieres usar su valor. print(numero) muestra 67.

### B03 · Tipos de variables: Cada dato tiene su tipo

Clasifica los datos del viaje de la Odisea.

**Guía:** int: entero · float: decimal · str: texto · bool: True o False. Elige un tipo en cada fila.

**Respuesta:**

```text
destino = "Ítaca" → str
islas = 8 → int
regreso = False → bool
distancia = 4.5 → float
```

El tipo depende del valor: los enteros son int, los decimales float, los textos entre comillas str y los valores lógicos bool. Un número entre comillas sigue siendo texto.

### B04 · Operaciones: El 67 también calcula

¿Qué resultado produce el programa?

**Guía:** Sigue el orden: paréntesis; multiplicación y división; suma y resta. % obtiene el resto y // la división entera.

```python
numero = 67
print(numero + 3 * 2)
```

**Respuesta:**

```text
73
```

La multiplicación tiene prioridad: 3 × 2 = 6. Después, 67 + 6 = 73.

### B05 · Entrada con input: Edad para el registro

El usuario escribe 14. ¿Qué línea falla al intentar sumar un número a un texto?

**Guía:** input() siempre devuelve str. Elige la línea donde Python intenta hacer la operación incompatible, no la línea donde se pide el dato.

```python
nombre = "Peter"
edad = input("Edad: ")
print(edad + 1)
```

**Respuesta:**

```text
Línea 3 · print(edad + 1)
```

La línea 3 intenta sumar un str y un int. int(input(...)) permite realizar la suma.

### B06 · Funciones: Una función en cuatro pasos

Ordena la función que saluda a Peter.

**Guía:** Usa ↑ y ↓: primero define la función con def, luego su return con sangría, después llámala y al final imprime el resultado.

**Respuesta:**

```text
def saludar(nombre):
    return "Hola " + nombre
resultado = saludar("Peter")
print(resultado)
```

La función se define antes de llamarla. return entrega el valor al programa. El resultado que se imprime es Hola Peter.

### B07 · Condicionales: Ruta de Spider-Man

¿Qué se imprime si la ruta está disponible?

**Guía:** Evalúa la condición como verdadera o falsa. Solo se ejecuta uno de los dos bloques. == compara; = asigna.

```python
ruta_libre = True
if ruta_libre:
    print("Avanzar")
else:
    print("Esperar")
```

**Respuesta:**

```text
Avanzar
```

La variable tiene el valor True. Se ejecuta el bloque del if.

### B08 · Bucles: Cuenta atrás del box

Completa la actualización para que se impriman 3, 2, 1 y el bucle termine.

**Guía:** for recorre una secuencia. range no incluye el límite final. while repite mientras la condición sea verdadera y necesita una actualización para poder terminar.

```python
cuenta = 3
while cuenta > 0:
    print(cuenta)
    ___
```

**Respuesta:**

```text
Instrucción que falta: cuenta -= 1
```

Restar 1 acerca la variable a cero. Si no cambia o si aumenta, el bucle no termina.

### B09 · Listas: Una parada más

¿Cuántas paradas hay después de append?

**Guía:** Una lista guarda elementos en orden. Empieza a contar en 0. len() cuenta elementos y append() añade uno al final.

```python
paradas = ["Eea", "Ítaca"]
paradas.append("Puerto")
print(len(paradas))
```

**Respuesta:**

```text
3
```

append añade un elemento al final. La lista pasa de dos a tres elementos; len devuelve 3.

### B10 · Diccionarios: Destino de la Odisea

Completa la consulta para mostrar Ítaca.

**Guía:** Un diccionario relaciona claves con valores. Si la clave es texto, escríbela entre comillas dentro de [] o de get().

```python
viaje = {"destino": "Ítaca", "dias": 10}
print(viaje[___])
```

**Respuesta:**

```text
Clave que falta: "destino"
```

La clave es "destino" y el valor asociado es "Ítaca".

### B11 · Dibujos con turtle: Un dibujo, paso a paso

Completa el giro para dibujar un triángulo equilátero. Hay 3 lados iguales.

**Guía:** forward avanza y right gira en grados. Para cerrar un polígono regular, el giro exterior es 360 ÷ número de lados. Sustituye ___.

```python
import turtle
for lado in range(3):
    turtle.forward(90)
    turtle.right(___)
turtle.done()
```

**Respuesta:**

```text
Giro en grados: 120
```

360 ÷ 3 = 120°. Se avanza y gira 3 veces para cerrar el dibujo. El giro de turtle es el exterior, no el ángulo interior.

### B12 · Calculadora: Tu primera calculadora

Calcula las provisiones que quedan después del viaje. Completa las dos piezas para restar.

**Guía:** 1. Elige el operador que pide el problema. 2. Llama a calcular con a y b para guardar lo que devuelve return. float admite números con decimales.

```python
def calcular(a, b):
    return a [1] b

a = float(input("Primer número: "))
b = float(input("Segundo número: "))
resultado = [2]
print(resultado)
```

**Respuesta:**

```text
[1] Operador: -
[2] Llamada a la función: calcular(a, b)
```

El operador - permite restar. calcular(a, b) devuelve el resultado y lo guarda en resultado. Con 10 y 4 se obtiene 6.

## Versión C

### C01 · Comentarios: Comentario al final

Lee el código del viaje. ¿Qué número se imprime?

**Guía:** Lee solo las instrucciones activas. Fuera de las comillas, # inicia un comentario hasta el final de la línea.

```python
islas = 4  # Paradas de la Odisea
islas = islas + 2
print(islas)
```

**Respuesta:**

```text
6
```

El comentario no cambia la asignación. islas comienza en 4 y aumenta en 2: el resultado es 6.

### C02 · Imprimir en pantalla: Presentación de Peter

Completa el print para mostrar Hola Peter, separado por un espacio.

**Guía:** Selecciona la pieza que sustituye a ___. print() muestra texto entre comillas o el valor de una variable.

```python
nombre = "Peter"
print("Hola", ___)
```

**Respuesta:**

```text
Pieza que falta: nombre
```

La coma en print separa los argumentos con un espacio. La variable se llama nombre, con n minúscula.

### C03 · Tipos de variables: Cada dato tiene su tipo

Clasifica las variables del box de Monza.

**Guía:** int: entero · float: decimal · str: texto · bool: True o False. Elige un tipo en cada fila.

**Respuesta:**

```text
pit_stop = True → bool
piloto = "Alex" → str
vueltas = 12 → int
segundos = 3.2 → float
```

El tipo depende del valor: los enteros son int, los decimales float, los textos entre comillas str y los valores lógicos bool. Un número entre comillas sigue siendo texto.

### C04 · Operaciones: Reparto en la Odisea

Se reparten 17 provisiones en grupos de 5. ¿Cuántas sobran?

**Guía:** Sigue el orden: paréntesis; multiplicación y división; suma y resta. % obtiene el resto y // la división entera.

```python
sobran = 17 % 5
print(sobran)
```

**Respuesta:**

```text
2
```

% obtiene el resto. Se forman 3 grupos de 5, que usan 15 provisiones; sobran 2.

### C05 · Entrada con input: Provisiones del viaje

El usuario escribe 8. Selecciona la línea donde ocurre el TypeError.

**Guía:** input() siempre devuelve str. Elige la línea donde Python intenta hacer la operación incompatible, no la línea donde se pide el dato.

```python
provisiones = input("Provisiones: ")
restantes = provisiones - 2
print(restantes)
```

**Respuesta:**

```text
Línea 2 · restantes = provisiones - 2
```

No se puede restar 2 al texto "8". Se convierte la entrada a entero antes de operar.

### C06 · Funciones: Una función en cuatro pasos

Ordena la función que suma un punto de bono.

**Guía:** Usa ↑ y ↓: primero define la función con def, luego su return con sangría, después llámala y al final imprime el resultado.

**Respuesta:**

```text
def sumar_bono(puntos):
    return puntos + 1
resultado = sumar_bono(66)
print(resultado)
```

La función se define antes de llamarla. return entrega el valor al programa. El resultado que se imprime es 67.

### C07 · Condicionales: La condición del 67

¿Qué mensaje aparece con este número?

**Guía:** Evalúa la condición como verdadera o falsa. Solo se ejecuta uno de los dos bloques. == compara; = asigna.

```python
numero = 67
if numero == 67:
    print("Coincide")
else:
    print("Otro número")
```

**Respuesta:**

```text
Coincide
```

== compara valores. Como 67 es igual a 67, la condición es verdadera.

### C08 · Bucles: El 67, dos veces

Elige el rango que repite exactamente dos veces el mensaje.

**Guía:** for recorre una secuencia. range no incluye el límite final. while repite mientras la condición sea verdadera y necesita una actualización para poder terminar.

```python
for intento in ___:
    print("67")
```

**Respuesta:**

```text
Instrucción que falta: range(2)
```

range(2) produce 0 y 1: son dos iteraciones, aunque no se imprima intento.

### C09 · Listas: Primer elemento

¿Qué valor se imprime en esta lista de números?

**Guía:** Una lista guarda elementos en orden. Empieza a contar en 0. len() cuenta elementos y append() añade uno al final.

```python
numeros = [67, 7, 6]
print(numeros[0])
```

**Respuesta:**

```text
67
```

El índice 0 accede al primer elemento, que vale 67.

### C10 · Diccionarios: El barrio de Peter

Elige la clave que permite mostrar Queens.

**Guía:** Un diccionario relaciona claves con valores. Si la clave es texto, escríbela entre comillas dentro de [] o de get().

```python
heroe = {"alias": "Spider-Man", "barrio": "Queens"}
print(heroe[___])
```

**Respuesta:**

```text
Clave que falta: "barrio"
```

"barrio" es la clave que apunta a "Queens". El valor no se usa como índice.

### C11 · Dibujos con turtle: Un dibujo, paso a paso

Completa el giro para dibujar un hexágono regular. Hay 6 lados iguales.

**Guía:** forward avanza y right gira en grados. Para cerrar un polígono regular, el giro exterior es 360 ÷ número de lados. Sustituye ___.

```python
import turtle
for lado in range(6):
    turtle.forward(55)
    turtle.right(___)
turtle.done()
```

**Respuesta:**

```text
Giro en grados: 60
```

360 ÷ 6 = 60°. Se avanza y gira 6 veces para cerrar el dibujo. El giro de turtle es el exterior, no el ángulo interior.

### C12 · Calculadora: Tu primera calculadora

Calcula el total de botellas en varias cajas. Completa las dos piezas para multiplicar.

**Guía:** 1. Elige el operador que pide el problema. 2. Llama a calcular con a y b para guardar lo que devuelve return. float admite números con decimales.

```python
def calcular(a, b):
    return a [1] b

a = float(input("Primer número: "))
b = float(input("Segundo número: "))
resultado = [2]
print(resultado)
```

**Respuesta:**

```text
[1] Operador: *
[2] Llamada a la función: calcular(a, b)
```

El operador * permite multiplicar. calcular(a, b) devuelve el resultado y lo guarda en resultado. Con 3 y 5 se obtiene 15.

## Versión D

### D01 · Comentarios: Prueba desactivada

En el Grand Prix of Italy, una línea está desactivada. ¿Cuál es la salida?

**Guía:** Lee solo las instrucciones activas. Fuera de las comillas, # inicia un comentario hasta el final de la línea.

```python
vueltas = 3
# vueltas = 67
print(vueltas)
```

**Respuesta:**

```text
3
```

La asignación vueltas = 67 está comentada. La variable conserva el valor 3.

### D02 · Imprimir en pantalla: Salida hacia Ítaca

Selecciona el texto correcto para completar la línea.

**Guía:** Selecciona la pieza que sustituye a ___. print() muestra texto entre comillas o el valor de una variable.

```python
print(___)  # Debe mostrar: Destino: Ítaca
```

**Respuesta:**

```text
Pieza que falta: "Destino: Ítaca"
```

Los textos necesitan comillas. Así Python los reconoce como cadenas y no como nombres de variables.

### D03 · Tipos de variables: Cada dato tiene su tipo

Presta atención: "67" tiene comillas.

**Guía:** int: entero · float: decimal · str: texto · bool: True o False. Elige un tipo en cada fila.

**Respuesta:**

```text
precio = 1.5 → float
mensaje = "67" → str
intentos = 3 → int
activo = False → bool
```

El tipo depende del valor: los enteros son int, los decimales float, los textos entre comillas str y los valores lógicos bool. Un número entre comillas sigue siendo texto.

### D04 · Operaciones: Turnos completos

Cada turno de práctica dura 4 minutos. ¿Cuántos turnos completos caben en 15 minutos?

**Guía:** Sigue el orden: paréntesis; multiplicación y división; suma y resta. % obtiene el resto y // la división entera.

```python
turnos = 15 // 4
print(turnos)
```

**Respuesta:**

```text
3
```

// hace división entera. Con estos números positivos, 15 // 4 da 3 turnos completos.

### D05 · Entrada con input: Tiempo con decimales

El usuario escribe 2.5. ¿En qué línea se produce el TypeError?

**Guía:** input() siempre devuelve str. Elige la línea donde Python intenta hacer la operación incompatible, no la línea donde se pide el dato.

```python
segundos = input("Segundos: ")
bono = 0.5
print(segundos + bono)
```

**Respuesta:**

```text
Línea 3 · print(segundos + bono)
```

La línea 3 suma texto y un decimal. Aquí corresponde float(input(...)), porque el dato puede tener decimales.

### D06 · Funciones: Una función en cuatro pasos

Ordena la función que calcula la mitad del recorrido.

**Guía:** Usa ↑ y ↓: primero define la función con def, luego su return con sangría, después llámala y al final imprime el resultado.

**Respuesta:**

```text
def mitad(distancia):
    return distancia / 2
resultado = mitad(12)
print(resultado)
```

La función se define antes de llamarla. return entrega el valor al programa. El resultado que se imprime es 6.0.

### D07 · Condicionales: Viento hacia Ítaca

¿Qué bloque se ejecuta?

**Guía:** Evalúa la condición como verdadera o falsa. Solo se ejecuta uno de los dos bloques. == compara; = asigna.

```python
viento = 4
if viento > 5:
    print("Esperar")
else:
    print("Navegar")
```

**Respuesta:**

```text
Navegar
```

4 > 5 es falso, por eso se ejecuta el else y se muestra Navegar.

### D08 · Bucles: Una parada por isla

Completa la línea para visitar todos los elementos de islas.

**Guía:** for recorre una secuencia. range no incluye el límite final. while repite mientras la condición sea verdadera y necesita una actualización para poder terminar.

```python
islas = ["Eea", "Ítaca"]
for isla in ___:
    print(isla)
```

**Respuesta:**

```text
Instrucción que falta: islas
```

for recorre cada elemento de la lista. La variable isla recibe un nombre en cada iteración.

### D09 · Listas: Cambiar el destino

¿Qué destino queda en la primera posición?

**Guía:** Una lista guarda elementos en orden. Empieza a contar en 0. len() cuenta elementos y append() añade uno al final.

```python
destinos = ["Centro", "Queens"]
destinos[0] = "Brooklyn"
print(destinos[0])
```

**Respuesta:**

```text
Brooklyn
```

Asignar a destinos[0] sustituye el primer elemento. Los demás permanecen iguales.

### D10 · Diccionarios: Actualizar el marcador

Completa la clave para cambiar las vueltas a 5.

**Guía:** Un diccionario relaciona claves con valores. Si la clave es texto, escríbela entre comillas dentro de [] o de get().

```python
carrera = {"vueltas": 4, "puntos": 10}
carrera[___] = 5
print(carrera["vueltas"])
```

**Respuesta:**

```text
Clave que falta: "vueltas"
```

Se utiliza la misma clave "vueltas" para reemplazar su valor de 4 por 5.

### D11 · Dibujos con turtle: Un dibujo, paso a paso

Completa el giro para dibujar un pentágono regular. Hay 5 lados iguales.

**Guía:** forward avanza y right gira en grados. Para cerrar un polígono regular, el giro exterior es 360 ÷ número de lados. Sustituye ___.

```python
import turtle
for lado in range(5):
    turtle.forward(65)
    turtle.right(___)
turtle.done()
```

**Respuesta:**

```text
Giro en grados: 72
```

360 ÷ 5 = 72°. Se avanza y gira 5 veces para cerrar el dibujo. El giro de turtle es el exterior, no el ángulo interior.

### D12 · Calculadora: Tu primera calculadora

Reparte una distancia en partes iguales. Completa las dos piezas para dividir.

**Guía:** 1. Elige el operador que pide el problema. 2. Llama a calcular con a y b para guardar lo que devuelve return. float admite números con decimales.

```python
def calcular(a, b):
    if b == 0:
        return "No se puede dividir entre cero"
    return a [1] b

a = float(input("Primer número: "))
b = float(input("Segundo número: "))
resultado = [2]
print(resultado)
```

**Respuesta:**

```text
[1] Operador: /
[2] Llamada a la función: calcular(a, b)
```

El operador / permite dividir. calcular(a, b) devuelve el resultado y lo guarda en resultado. Con 12 y 4 se obtiene 3. Antes de dividir se comprueba que b no sea cero.

## Versión E

### E01 · Comentarios: Texto o comentario

Un # dentro de comillas es texto. ¿Qué muestra este programa?

**Guía:** Lee solo las instrucciones activas. Fuera de las comillas, # inicia un comentario hasta el final de la línea.

```python
# Número de prueba
print("#67")
```

**Respuesta:**

```text
#67
```

Dentro de una cadena, # es un carácter normal. El comentario es solo la primera línea.

### E02 · Imprimir en pantalla: Un marcador sencillo

Completa la línea para mostrar Puntos: 10.

**Guía:** Selecciona la pieza que sustituye a ___. print() muestra texto entre comillas o el valor de una variable.

```python
puntos = 10
print("Puntos:", ___)
```

**Respuesta:**

```text
Pieza que falta: puntos
```

print puede recibir texto y una variable separados por una coma. Se muestra el valor de puntos.

### E03 · Tipos de variables: Cada dato tiene su tipo

Identifica los tipos de los datos de Spider-Man.

**Guía:** int: entero · float: decimal · str: texto · bool: True o False. Elige un tipo en cada fila.

**Respuesta:**

```text
telaranas = 6 → int
altura = 12.5 → float
mascara = True → bool
ciudad = "Queens" → str
```

El tipo depende del valor: los enteros son int, los decimales float, los textos entre comillas str y los valores lógicos bool. Un número entre comillas sigue siendo texto.

### E04 · Operaciones: Primero los paréntesis

Spider-Man agrupa dos entregas antes de duplicar el total. ¿Cuál es la salida?

**Guía:** Sigue el orden: paréntesis; multiplicación y división; suma y resta. % obtiene el resto y // la división entera.

```python
entregas = (3 + 2) * 2
print(entregas)
```

**Respuesta:**

```text
10
```

Primero se resuelve el paréntesis: 3 + 2 = 5. Después, 5 × 2 = 10.

### E05 · Entrada con input: Convertir antes de dividir

El usuario escribe 10. ¿Qué línea intenta operar con un texto y falla?

**Guía:** input() siempre devuelve str. Elige la línea donde Python intenta hacer la operación incompatible, no la línea donde se pide el dato.

```python
distancia = input("Distancia: ")
mitad = distancia / 2
print(mitad)
```

**Respuesta:**

```text
Línea 2 · mitad = distancia / 2
```

La línea 2 no puede dividir una cadena. float convierte el dato a número y permite usar decimales.

### E06 · Funciones: Una función en cuatro pasos

Ordena la función que elimina una parada del viaje.

**Guía:** Usa ↑ y ↓: primero define la función con def, luego su return con sangría, después llámala y al final imprime el resultado.

**Respuesta:**

```text
def quitar_parada(paradas):
    return paradas - 1
resultado = quitar_parada(5)
print(resultado)
```

La función se define antes de llamarla. return entrega el valor al programa. El resultado que se imprime es 4.

### E07 · Condicionales: Justo en el límite

La calificación es exactamente 7. ¿Qué imprime el programa?

**Guía:** Evalúa la condición como verdadera o falsa. Solo se ejecuta uno de los dos bloques. == compara; = asigna.

```python
nota = 7
if nota >= 7:
    print("Meta alcanzada")
else:
    print("Revisar")
```

**Respuesta:**

```text
Meta alcanzada
```

>= incluye la igualdad. Con nota igual a 7, la condición se cumple.

### E08 · Bucles: Contar rescates

Completa la condición para imprimir 1, 2 y 3. Después el bucle debe terminar.

**Guía:** for recorre una secuencia. range no incluye el límite final. while repite mientras la condición sea verdadera y necesita una actualización para poder terminar.

```python
rescate = 1
while ___:
    print(rescate)
    rescate += 1
```

**Respuesta:**

```text
Instrucción que falta: rescate <= 3
```

<= 3 incluye el número 3. Al llegar a 4, la condición pasa a ser falsa.

### E09 · Listas: El último tiempo

¿Qué número muestra el programa?

**Guía:** Una lista guarda elementos en orden. Empieza a contar en 0. len() cuenta elementos y append() añade uno al final.

```python
tiempos = [9, 8, 7]
print(tiempos[-1])
```

**Respuesta:**

```text
7
```

El índice -1 representa el último elemento de una lista.

### E10 · Diccionarios: Una consulta con get

Completa la clave para mostrar 7.

**Guía:** Un diccionario relaciona claves con valores. Si la clave es texto, escríbela entre comillas dentro de [] o de get().

```python
registro = {"nombre": "Sam", "nota": 7}
print(registro.get(___))
```

**Respuesta:**

```text
Clave que falta: "nota"
```

get("nota") recupera el valor asociado a esa clave: 7.

### E11 · Dibujos con turtle: Un dibujo, paso a paso

Completa el giro para dibujar un octágono regular. Hay 8 lados iguales.

**Guía:** forward avanza y right gira en grados. Para cerrar un polígono regular, el giro exterior es 360 ÷ número de lados. Sustituye ___.

```python
import turtle
for lado in range(8):
    turtle.forward(40)
    turtle.right(___)
turtle.done()
```

**Respuesta:**

```text
Giro en grados: 45
```

360 ÷ 8 = 45°. Se avanza y gira 8 veces para cerrar el dibujo. El giro de turtle es el exterior, no el ángulo interior.

### E12 · Calculadora: Tu primera calculadora

Combina dos cantidades. Esta vez, 67 es el resultado. Completa las dos piezas para sumar.

**Guía:** 1. Elige el operador que pide el problema. 2. Llama a calcular con a y b para guardar lo que devuelve return. float admite números con decimales.

```python
def calcular(a, b):
    return a [1] b

a = float(input("Primer número: "))
b = float(input("Segundo número: "))
resultado = [2]
print(resultado)
```

**Respuesta:**

```text
[1] Operador: +
[2] Llamada a la función: calcular(a, b)
```

El operador + permite sumar. calcular(a, b) devuelve el resultado y lo guarda en resultado. Con 60 y 7 se obtiene 67.

## Versión F

### F01 · Comentarios: Explicar sin modificar

¿Qué imprime el programa después de aplicar el bono?

**Guía:** Lee solo las instrucciones activas. Fuera de las comillas, # inicia un comentario hasta el final de la línea.

```python
puntos = 6  # Puntaje inicial
# El bono vale uno
puntos += 1
print(puntos)
```

**Respuesta:**

```text
7
```

Los comentarios explican el código. puntos += 1 suma uno al valor 6.

### F02 · Imprimir en pantalla: Salto de línea

Elige la instrucción que falta para que Listo aparezca después de Inicio, en otra línea.

**Guía:** Selecciona la pieza que sustituye a ___. print() muestra texto entre comillas o el valor de una variable.

```python
print("Inicio")
___
```

**Respuesta:**

```text
Pieza que falta: print("Listo")
```

Cada llamada a print termina con un salto de línea de forma predeterminada.

### F03 · Tipos de variables: Cada dato tiene su tipo

Relaciona cada dato de la travesía con su tipo.

**Guía:** int: entero · float: decimal · str: texto · bool: True o False. Elige un tipo en cada fila.

**Respuesta:**

```text
barco = "Odisea" → str
viento = False → bool
horas = 7.5 → float
paradas = 4 → int
```

El tipo depende del valor: los enteros son int, los decimales float, los textos entre comillas str y los valores lógicos bool. Un número entre comillas sigue siendo texto.

### F04 · Operaciones: Mitad del recorrido

¿Qué muestra Python al dividir la distancia?

**Guía:** Sigue el orden: paréntesis; multiplicación y división; suma y resta. % obtiene el resto y // la división entera.

```python
distancia = 12
print(distancia / 4)
```

**Respuesta:**

```text
3.0
```

En Python, / produce un float incluso cuando la división es exacta: 12 / 4 da 3.0.

### F05 · Entrada con input: Puntos de la ronda

El usuario escribe 67. ¿Qué línea produce el TypeError?

**Guía:** input() siempre devuelve str. Elige la línea donde Python intenta hacer la operación incompatible, no la línea donde se pide el dato.

```python
puntos = input("Puntos: ")
print("Procesando")
print(puntos - 7)
```

**Respuesta:**

```text
Línea 3 · print(puntos - 7)
```

El error aparece en la resta de la línea 3. int transforma "67" en 67.

### F06 · Funciones: Una función en cuatro pasos

Ordena la función que triplica la cantidad de cajas.

**Guía:** Usa ↑ y ↓: primero define la función con def, luego su return con sangría, después llámala y al final imprime el resultado.

**Respuesta:**

```text
def triplicar(cajas):
    return cajas * 3
resultado = triplicar(4)
print(resultado)
```

La función se define antes de llamarla. return entrega el valor al programa. El resultado que se imprime es 12.

### F07 · Condicionales: Una vuelta pendiente

¿Qué mensaje muestra el programa?

**Guía:** Evalúa la condición como verdadera o falsa. Solo se ejecuta uno de los dos bloques. == compara; = asigna.

```python
pendientes = 1
if pendientes == 0:
    print("Terminado")
else:
    print("Continuar")
```

**Respuesta:**

```text
Continuar
```

1 no es igual a 0. La condición es falsa y se ejecuta el else.

### F08 · Bucles: Cuatro luces de salida

Completa la línea para imprimir los números 0, 1, 2 y 3.

**Guía:** for recorre una secuencia. range no incluye el límite final. while repite mientras la condición sea verdadera y necesita una actualización para poder terminar.

```python
for luz in ___:
    print(luz)
```

**Respuesta:**

```text
Instrucción que falta: range(4)
```

range(4) empieza en 0 y excluye 4. Recorre cuatro números.

### F09 · Listas: Quitar la última tarea

pop() sin argumentos elimina el último elemento. ¿Cuántas tareas quedan?

**Guía:** Una lista guarda elementos en orden. Empieza a contar en 0. len() cuenta elementos y append() añade uno al final.

```python
tareas = ["Leer", "Probar", "Revisar"]
tareas.pop()
print(len(tareas))
```

**Respuesta:**

```text
2
```

La lista empieza con tres elementos. pop() elimina Revisar, y quedan dos.

### F10 · Diccionarios: Estado del laboratorio

Elige la clave que devuelve True.

**Guía:** Un diccionario relaciona claves con valores. Si la clave es texto, escríbela entre comillas dentro de [] o de get().

```python
sesion = {"curso": "Python", "activa": True}
print(sesion[___])
```

**Respuesta:**

```text
Clave que falta: "activa"
```

La clave "activa" guarda un bool. Al imprimirlo aparece True sin comillas.

### F11 · Dibujos con turtle: Un dibujo, paso a paso

Completa el giro para dibujar un cuadrado de lado 110. Hay 4 lados iguales.

**Guía:** forward avanza y right gira en grados. Para cerrar un polígono regular, el giro exterior es 360 ÷ número de lados. Sustituye ___.

```python
import turtle
for lado in range(4):
    turtle.forward(110)
    turtle.right(___)
turtle.done()
```

**Respuesta:**

```text
Giro en grados: 90
```

360 ÷ 4 = 90°. Se avanza y gira 4 veces para cerrar el dibujo. El giro de turtle es el exterior, no el ángulo interior.

### F12 · Calculadora: Tu primera calculadora

Calcula el número de minutos de varios turnos. Completa las dos piezas para multiplicar.

**Guía:** 1. Elige el operador que pide el problema. 2. Llama a calcular con a y b para guardar lo que devuelve return. float admite números con decimales.

```python
def calcular(a, b):
    return a [1] b

a = float(input("Primer número: "))
b = float(input("Segundo número: "))
resultado = [2]
print(resultado)
```

**Respuesta:**

```text
[1] Operador: *
[2] Llamada a la función: calcular(a, b)
```

El operador * permite multiplicar. calcular(a, b) devuelve el resultado y lo guarda en resultado. Con 6 y 2 se obtiene 12.

