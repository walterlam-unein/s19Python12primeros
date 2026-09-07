import { VERSIONS } from './engine.js';

export const TOPICS = ['Comentarios', 'Imprimir en pantalla', 'Tipos de variables', 'Operaciones', 'Entrada con input', 'Funciones', 'Condicionales', 'Bucles', 'Listas', 'Diccionarios', 'Dibujos con turtle', 'Calculadora'];
const options = values => values.map((label, i) => ({ id: `o${i}`, label }));
function choice(type, title, prompt, guide, code, values, right, explanation, extra = {}) {
  return { type, title, prompt, guide, code, options: options(values), answer: `o${right}`, explanation, ...extra };
}

const comments = [
  ['Solo se ejecuta el código', 'El programa viene del caso de comentarios de clase. ¿Qué aparece en pantalla?', '# Precio de los cuadernos\nprecio = 5\ncantidad = 3\n# print("67")\nprint(precio * cantidad)', ['15', '67\n15', '5', 'No aparece nada'], 0, 'Python ignora las líneas que empiezan con #. Solo se ejecuta print(precio * cantidad): 5 × 3 = 15.', '15'],
  ['La línea que queda fuera', '¿Qué mensaje sí verá Peter al ejecutar este código?', '# Mensajes de Spider-Man\n# print("Telaraña lista")\nprint("Ruta lista")', ['Telaraña lista', 'Ruta lista', 'Los dos mensajes', 'Mensajes de Spider-Man'], 1, 'Las dos primeras líneas son comentarios. El único print activo muestra Ruta lista.', 'Ruta lista'],
  ['Comentario al final', 'Lee el código del viaje. ¿Qué número se imprime?', 'islas = 4  # Paradas de la Odisea\nislas = islas + 2\nprint(islas)', ['4', '2', '6', 'Un error por el comentario'], 2, 'El comentario no cambia la asignación. islas comienza en 4 y aumenta en 2: el resultado es 6.', '6'],
  ['Prueba desactivada', 'En el Grand Prix of Italy, una línea está desactivada. ¿Cuál es la salida?', 'vueltas = 3\n# vueltas = 67\nprint(vueltas)', ['67', '3', 'vueltas', '3\n67'], 1, 'La asignación vueltas = 67 está comentada. La variable conserva el valor 3.', '3'],
  ['Texto o comentario', 'Un # dentro de comillas es texto. ¿Qué muestra este programa?', '# Número de prueba\nprint("#67")', ['67', 'Nada: todo es comentario', 'Número de prueba', '#67'], 3, 'Dentro de una cadena, # es un carácter normal. El comentario es solo la primera línea.', '#67'],
  ['Explicar sin modificar', '¿Qué imprime el programa después de aplicar el bono?', 'puntos = 6  # Puntaje inicial\n# El bono vale uno\npuntos += 1\nprint(puntos)', ['6', '1', '7', '6 1'], 2, 'Los comentarios explican el código. puntos += 1 suma uno al valor 6.', '7']
].map(d => choice('output', d[0], d[1], 'Lee solo las instrucciones activas. Fuera de las comillas, # inicia un comentario hasta el final de la línea.', d[2], d[3], d[4], d[5], { verification: { code: d[2], output: d[6] } }));

const prints = [
  ['Un mensaje, una instrucción', 'Completa la línea para mostrar el texto Grand Prix of Italy.', '___("Grand Prix of Italy")', ['print', 'input', 'int', 'return'], 0, 'print() muestra información. input() pide un dato; int() convierte un valor.', 'print("Grand Prix of Italy")', 'Grand Prix of Italy'],
  ['El número 67', 'Completa la instrucción para imprimir el valor de numero, sin escribir la palabra numero.', 'numero = 67\nprint(___)', ['"numero"', 'numero', '"67 puntos"', 'input'], 1, 'Una variable va sin comillas cuando quieres usar su valor. print(numero) muestra 67.', 'numero = 67\nprint(numero)', '67'],
  ['Presentación de Peter', 'Completa el print para mostrar Hola Peter, separado por un espacio.', 'nombre = "Peter"\nprint("Hola", ___)', ['"nombre"', 'Nombre', 'nombre', 'str'], 2, 'La coma en print separa los argumentos con un espacio. La variable se llama nombre, con n minúscula.', 'nombre = "Peter"\nprint("Hola", nombre)', 'Hola Peter'],
  ['Salida hacia Ítaca', 'Selecciona el texto correcto para completar la línea.', 'print(___)  # Debe mostrar: Destino: Ítaca', ['Destino: Ítaca', '"Destino: Ítaca"', '# Destino: Ítaca', 'print'], 1, 'Los textos necesitan comillas. Así Python los reconoce como cadenas y no como nombres de variables.', 'print("Destino: Ítaca")  # Debe mostrar: Destino: Ítaca', 'Destino: Ítaca'],
  ['Un marcador sencillo', 'Completa la línea para mostrar Puntos: 10.', 'puntos = 10\nprint("Puntos:", ___)', ['"puntos"', '10 + puntos', 'puntos', '"10 + 0"'], 2, 'print puede recibir texto y una variable separados por una coma. Se muestra el valor de puntos.', 'puntos = 10\nprint("Puntos:", puntos)', 'Puntos: 10'],
  ['Salto de línea', 'Elige la instrucción que falta para que Listo aparezca después de Inicio, en otra línea.', 'print("Inicio")\n___', ['print = "Listo"', 'print("Listo")', 'input("Listo")', '# print("Listo")'], 1, 'Cada llamada a print termina con un salto de línea de forma predeterminada.', 'print("Inicio")\nprint("Listo")', 'Inicio\nListo']
].map(d => ({ type: 'fill', title: d[0], prompt: d[1], guide: 'Selecciona la pieza que sustituye a ___. print() muestra texto entre comillas o el valor de una variable.', code: d[2], blanks: [{ label: 'Pieza que falta', options: options(d[3]) }], answer: [`o${d[4]}`], explanation: d[5], solutionCode: d[6], verification: { code: d[6], output: d[7] } }));

const typeSets = [
  [['numero = 67', 'int'], ['tiempo = 2.5', 'float'], ['heroe = "Spider-Man"', 'str'], ['listo = True', 'bool']],
  [['destino = "Ítaca"', 'str'], ['islas = 8', 'int'], ['regreso = False', 'bool'], ['distancia = 4.5', 'float']],
  [['pit_stop = True', 'bool'], ['piloto = "Alex"', 'str'], ['vueltas = 12', 'int'], ['segundos = 3.2', 'float']],
  [['precio = 1.5', 'float'], ['mensaje = "67"', 'str'], ['intentos = 3', 'int'], ['activo = False', 'bool']],
  [['telaranas = 6', 'int'], ['altura = 12.5', 'float'], ['mascara = True', 'bool'], ['ciudad = "Queens"', 'str']],
  [['barco = "Odisea"', 'str'], ['viento = False', 'bool'], ['horas = 7.5', 'float'], ['paradas = 4', 'int']]
];
const types = typeSets.map((set, i) => ({ type: 'match', title: 'Cada dato tiene su tipo', prompt: ['Relaciona los cuatro datos del laboratorio con su tipo.', 'Clasifica los datos del viaje de la Odisea.', 'Clasifica las variables del box de Monza.', 'Presta atención: "67" tiene comillas.', 'Identifica los tipos de los datos de Spider-Man.', 'Relaciona cada dato de la travesía con su tipo.'][i], guide: 'int: entero · float: decimal · str: texto · bool: True o False. Elige un tipo en cada fila.', items: set.map(([label]) => ({ label })), choices: ['int', 'float', 'str', 'bool'].map(x => ({ id: x, label: x })), answer: set.map(([, value]) => value), explanation: 'El tipo depende del valor: los enteros son int, los decimales float, los textos entre comillas str y los valores lógicos bool. Un número entre comillas sigue siendo texto.', verification: { code: set.map(([line]) => line).join('\n') + '\n' + set.map(([line]) => `print(type(${line.split(' = ')[0]}).__name__)`).join('\n'), output: set.map(([, v]) => v).join('\n') } }));

const maths = [
  ['Suministros para el box', 'Cada caja tiene 4 botellas. Hay 3 cajas y se usan 2 botellas. ¿Cuántas quedan?', 'botellas = 4 * 3 - 2\nprint(botellas)', ['10', '4', '12', '14'], 0, 'Primero se multiplica: 4 × 3 = 12. Después se resta 2: quedan 10.', '10'],
  ['El 67 también calcula', '¿Qué resultado produce el programa?', 'numero = 67\nprint(numero + 3 * 2)', ['140', '73', '70', '134'], 1, 'La multiplicación tiene prioridad: 3 × 2 = 6. Después, 67 + 6 = 73.', '73'],
  ['Reparto en la Odisea', 'Se reparten 17 provisiones en grupos de 5. ¿Cuántas sobran?', 'sobran = 17 % 5\nprint(sobran)', ['3', '5', '2', '3.4'], 2, '% obtiene el resto. Se forman 3 grupos de 5, que usan 15 provisiones; sobran 2.', '2'],
  ['Turnos completos', 'Cada turno de práctica dura 4 minutos. ¿Cuántos turnos completos caben en 15 minutos?', 'turnos = 15 // 4\nprint(turnos)', ['3.75', '4', '1', '3'], 3, '// hace división entera. Con estos números positivos, 15 // 4 da 3 turnos completos.', '3'],
  ['Primero los paréntesis', 'Spider-Man agrupa dos entregas antes de duplicar el total. ¿Cuál es la salida?', 'entregas = (3 + 2) * 2\nprint(entregas)', ['7', '10', '8', '12'], 1, 'Primero se resuelve el paréntesis: 3 + 2 = 5. Después, 5 × 2 = 10.', '10'],
  ['Mitad del recorrido', '¿Qué muestra Python al dividir la distancia?', 'distancia = 12\nprint(distancia / 4)', ['3', '4.0', '3.0', '48'], 2, 'En Python, / produce un float incluso cuando la división es exacta: 12 / 4 da 3.0.', '3.0']
].map(d => choice('output', d[0], d[1], 'Sigue el orden: paréntesis; multiplicación y división; suma y resta. % obtiene el resto y // la división entera.', d[2], d[3], d[4], d[5], { verification: { code: d[2], output: d[6] } }));

const inputs = [
  ['La entrada no es un entero', 'El usuario escribe 3. ¿En qué línea se produce el TypeError?', 'vueltas = input("Vueltas: ")\ntotal = vueltas + 1\nprint(total)', 2, 'input devuelve texto. En la línea 2 no se puede sumar "3" y 1. Convierte la entrada con int().', 'vueltas = int(input("Vueltas: "))\ntotal = vueltas + 1\nprint(total)', '3', 'Vueltas: 4'],
  ['Edad para el registro', 'El usuario escribe 14. ¿Qué línea falla al intentar sumar un número a un texto?', 'nombre = "Peter"\nedad = input("Edad: ")\nprint(edad + 1)', 3, 'La línea 3 intenta sumar un str y un int. int(input(...)) permite realizar la suma.', 'nombre = "Peter"\nedad = int(input("Edad: "))\nprint(edad + 1)', '14', 'Edad: 15'],
  ['Provisiones del viaje', 'El usuario escribe 8. Selecciona la línea donde ocurre el TypeError.', 'provisiones = input("Provisiones: ")\nrestantes = provisiones - 2\nprint(restantes)', 2, 'No se puede restar 2 al texto "8". Se convierte la entrada a entero antes de operar.', 'provisiones = int(input("Provisiones: "))\nrestantes = provisiones - 2\nprint(restantes)', '8', 'Provisiones: 6'],
  ['Tiempo con decimales', 'El usuario escribe 2.5. ¿En qué línea se produce el TypeError?', 'segundos = input("Segundos: ")\nbono = 0.5\nprint(segundos + bono)', 3, 'La línea 3 suma texto y un decimal. Aquí corresponde float(input(...)), porque el dato puede tener decimales.', 'segundos = float(input("Segundos: "))\nbono = 0.5\nprint(segundos + bono)', '2.5', 'Segundos: 3.0'],
  ['Convertir antes de dividir', 'El usuario escribe 10. ¿Qué línea intenta operar con un texto y falla?', 'distancia = input("Distancia: ")\nmitad = distancia / 2\nprint(mitad)', 2, 'La línea 2 no puede dividir una cadena. float convierte el dato a número y permite usar decimales.', 'distancia = float(input("Distancia: "))\nmitad = distancia / 2\nprint(mitad)', '10', 'Distancia: 5.0'],
  ['Puntos de la ronda', 'El usuario escribe 67. ¿Qué línea produce el TypeError?', 'puntos = input("Puntos: ")\nprint("Procesando")\nprint(puntos - 7)', 3, 'El error aparece en la resta de la línea 3. int transforma "67" en 67.', 'puntos = int(input("Puntos: "))\nprint("Procesando")\nprint(puntos - 7)', '67', 'Puntos: Procesando\n60']
].map(d => ({ type: 'bug', title: d[0], prompt: d[1], guide: 'input() siempre devuelve str. Elige la línea donde Python intenta hacer la operación incompatible, no la línea donde se pide el dato.', code: d[2], options: d[2].split('\n').map((line, i) => ({ id: `line${i + 1}`, label: `Línea ${i + 1} · ${line}` })), answer: `line${d[3]}`, explanation: d[4], solutionCode: d[5], verification: { code: d[5], input: d[6], output: d[7] }, errorVerification: { code: d[2], input: d[6], error: 'TypeError', line: d[3] } }));

const functionSets = [
  ['duplicar', 'numero', 'numero * 2', '3', '6', 'Ordena la función que duplica las vueltas de práctica.'],
  ['saludar', 'nombre', '"Hola " + nombre', '"Peter"', 'Hola Peter', 'Ordena la función que saluda a Peter.'],
  ['sumar_bono', 'puntos', 'puntos + 1', '66', '67', 'Ordena la función que suma un punto de bono.'],
  ['mitad', 'distancia', 'distancia / 2', '12', '6.0', 'Ordena la función que calcula la mitad del recorrido.'],
  ['quitar_parada', 'paradas', 'paradas - 1', '5', '4', 'Ordena la función que elimina una parada del viaje.'],
  ['triplicar', 'cajas', 'cajas * 3', '4', '12', 'Ordena la función que triplica la cantidad de cajas.']
];
const funcs = functionSets.map(d => {
  const lines = [`def ${d[0]}(${d[1]}):`, `    return ${d[2]}`, `resultado = ${d[0]}(${d[3]})`, 'print(resultado)'];
  return { type: 'order', title: 'Una función en cuatro pasos', prompt: d[5], guide: 'Usa ↑ y ↓: primero define la función con def, luego su return con sangría, después llámala y al final imprime el resultado.', steps: lines.map((code, i) => ({ id: `s${i}`, code })), answer: ['s0', 's1', 's2', 's3'], explanation: `La función se define antes de llamarla. return entrega el valor al programa. El resultado que se imprime es ${d[4]}.`, solutionCode: lines.join('\n'), verification: { code: lines.join('\n'), output: d[4] } };
});

const conditionSets = [
  ['Entrada al box', '¿Qué mensaje elige el programa?', 'combustible = 2\nif combustible < 3:\n    print("Entrar al box")\nelse:\n    print("Seguir")', ['Seguir', 'Entrar al box', 'Los dos mensajes', '2'], 1, '2 < 3 es verdadero: se ejecuta el bloque if y se omite el else.', 'Entrar al box'],
  ['Ruta de Spider-Man', '¿Qué se imprime si la ruta está disponible?', 'ruta_libre = True\nif ruta_libre:\n    print("Avanzar")\nelse:\n    print("Esperar")', ['True', 'Esperar', 'Avanzar', 'No se imprime nada'], 2, 'La variable tiene el valor True. Se ejecuta el bloque del if.', 'Avanzar'],
  ['La condición del 67', '¿Qué mensaje aparece con este número?', 'numero = 67\nif numero == 67:\n    print("Coincide")\nelse:\n    print("Otro número")', ['Otro número', '67', 'Coincide', 'Error: hay dos signos ='], 2, '== compara valores. Como 67 es igual a 67, la condición es verdadera.', 'Coincide'],
  ['Viento hacia Ítaca', '¿Qué bloque se ejecuta?', 'viento = 4\nif viento > 5:\n    print("Esperar")\nelse:\n    print("Navegar")', ['Esperar', 'Navegar', 'Los dos', '5'], 1, '4 > 5 es falso, por eso se ejecuta el else y se muestra Navegar.', 'Navegar'],
  ['Justo en el límite', 'La calificación es exactamente 7. ¿Qué imprime el programa?', 'nota = 7\nif nota >= 7:\n    print("Meta alcanzada")\nelse:\n    print("Revisar")', ['Revisar', '7', 'No hay salida', 'Meta alcanzada'], 3, '>= incluye la igualdad. Con nota igual a 7, la condición se cumple.', 'Meta alcanzada'],
  ['Una vuelta pendiente', '¿Qué mensaje muestra el programa?', 'pendientes = 1\nif pendientes == 0:\n    print("Terminado")\nelse:\n    print("Continuar")', ['Terminado', 'Continuar', '0', 'Terminado\nContinuar'], 1, '1 no es igual a 0. La condición es falsa y se ejecuta el else.', 'Continuar']
].map(d => choice('choice', d[0], d[1], 'Evalúa la condición como verdadera o falsa. Solo se ejecuta uno de los dos bloques. == compara; = asigna.', d[2], d[3], d[4], d[5], { verification: { code: d[2], output: d[6] } }));

const loopSets = [
  ['Tres vueltas, sin repetir código', 'Completa el bucle para imprimir 1, 2 y 3, cada número en una línea.', 'for vuelta in ___:\n    print(vuelta)', ['range(1, 3)', 'range(1, 4)', 'range(3, 1)', 'range(4)'], 1, 'range(1, 4) empieza en 1 y se detiene antes de 4.', 'for vuelta in range(1, 4):\n    print(vuelta)', '1\n2\n3'],
  ['Cuenta atrás del box', 'Completa la actualización para que se impriman 3, 2, 1 y el bucle termine.', 'cuenta = 3\nwhile cuenta > 0:\n    print(cuenta)\n    ___', ['cuenta += 1', 'cuenta = 3', 'cuenta -= 1', 'print(cuenta)'], 2, 'Restar 1 acerca la variable a cero. Si no cambia o si aumenta, el bucle no termina.', 'cuenta = 3\nwhile cuenta > 0:\n    print(cuenta)\n    cuenta -= 1', '3\n2\n1'],
  ['El 67, dos veces', 'Elige el rango que repite exactamente dos veces el mensaje.', 'for intento in ___:\n    print("67")', ['range(1)', 'range(3)', 'range(0)', 'range(2)'], 3, 'range(2) produce 0 y 1: son dos iteraciones, aunque no se imprima intento.', 'for intento in range(2):\n    print("67")', '67\n67'],
  ['Una parada por isla', 'Completa la línea para visitar todos los elementos de islas.', 'islas = ["Eea", "Ítaca"]\nfor isla in ___:\n    print(isla)', ['islas', 'isla', '2', '"islas"'], 0, 'for recorre cada elemento de la lista. La variable isla recibe un nombre en cada iteración.', 'islas = ["Eea", "Ítaca"]\nfor isla in islas:\n    print(isla)', 'Eea\nÍtaca'],
  ['Contar rescates', 'Completa la condición para imprimir 1, 2 y 3. Después el bucle debe terminar.', 'rescate = 1\nwhile ___:\n    print(rescate)\n    rescate += 1', ['rescate < 3', 'rescate <= 3', 'rescate > 3', 'rescate == 1'], 1, '<= 3 incluye el número 3. Al llegar a 4, la condición pasa a ser falsa.', 'rescate = 1\nwhile rescate <= 3:\n    print(rescate)\n    rescate += 1', '1\n2\n3'],
  ['Cuatro luces de salida', 'Completa la línea para imprimir los números 0, 1, 2 y 3.', 'for luz in ___:\n    print(luz)', ['range(3)', 'range(1, 4)', 'range(4)', 'range(1, 5)'], 2, 'range(4) empieza en 0 y excluye 4. Recorre cuatro números.', 'for luz in range(4):\n    print(luz)', '0\n1\n2\n3']
].map(d => ({ type: 'fill', title: d[0], prompt: d[1], guide: 'for recorre una secuencia. range no incluye el límite final. while repite mientras la condición sea verdadera y necesita una actualización para poder terminar.', code: d[2], blanks: [{ label: 'Instrucción que falta', options: options(d[3]) }], answer: [`o${d[4]}`], explanation: d[5], solutionCode: d[6], verification: { code: d[6], output: d[7] } }));

const listSets = [
  ['Segundo en la parrilla', '¿Qué nombre se imprime?', 'pilotos = ["Alex", "Dani", "Sam"]\nprint(pilotos[1])', ['Alex', 'Dani', 'Sam', '1'], 1, 'Las listas empiezan en el índice 0. El índice 1 corresponde al segundo elemento: Dani.', 'Dani'],
  ['Una parada más', '¿Cuántas paradas hay después de append?', 'paradas = ["Eea", "Ítaca"]\nparadas.append("Puerto")\nprint(len(paradas))', ['2', '1', '3', 'Puerto'], 2, 'append añade un elemento al final. La lista pasa de dos a tres elementos; len devuelve 3.', '3'],
  ['Primer elemento', '¿Qué valor se imprime en esta lista de números?', 'numeros = [67, 7, 6]\nprint(numeros[0])', ['0', '7', '6', '67'], 3, 'El índice 0 accede al primer elemento, que vale 67.', '67'],
  ['Cambiar el destino', '¿Qué destino queda en la primera posición?', 'destinos = ["Centro", "Queens"]\ndestinos[0] = "Brooklyn"\nprint(destinos[0])', ['Brooklyn', 'Centro', 'Queens', '0'], 0, 'Asignar a destinos[0] sustituye el primer elemento. Los demás permanecen iguales.', 'Brooklyn'],
  ['El último tiempo', '¿Qué número muestra el programa?', 'tiempos = [9, 8, 7]\nprint(tiempos[-1])', ['9', '-1', '7', '8'], 2, 'El índice -1 representa el último elemento de una lista.', '7'],
  ['Quitar la última tarea', 'pop() sin argumentos elimina el último elemento. ¿Cuántas tareas quedan?', 'tareas = ["Leer", "Probar", "Revisar"]\ntareas.pop()\nprint(len(tareas))', ['3', '2', '1', '0'], 1, 'La lista empieza con tres elementos. pop() elimina Revisar, y quedan dos.', '2']
].map(d => choice('output', d[0], d[1], 'Una lista guarda elementos en orden. Empieza a contar en 0. len() cuenta elementos y append() añade uno al final.', d[2], d[3], d[4], d[5], { verification: { code: d[2], output: d[6] } }));

const dictSets = [
  ['Leer por su clave', 'Completa la clave para imprimir 67.', 'piloto = {"nombre": "Alex", "puntos": 67}\nprint(piloto[___])', ['0', '"puntos"', '"67"', 'puntos'], 1, 'Los diccionarios se consultan por clave. La clave "puntos" tiene el valor 67.', 'piloto = {"nombre": "Alex", "puntos": 67}\nprint(piloto["puntos"])', '67'],
  ['Destino de la Odisea', 'Completa la consulta para mostrar Ítaca.', 'viaje = {"destino": "Ítaca", "dias": 10}\nprint(viaje[___])', ['"dias"', '0', '"destino"', '"Ítaca"'], 2, 'La clave es "destino" y el valor asociado es "Ítaca".', 'viaje = {"destino": "Ítaca", "dias": 10}\nprint(viaje["destino"])', 'Ítaca'],
  ['El barrio de Peter', 'Elige la clave que permite mostrar Queens.', 'heroe = {"alias": "Spider-Man", "barrio": "Queens"}\nprint(heroe[___])', ['"barrio"', '"alias"', '1', '"Queens"'], 0, '"barrio" es la clave que apunta a "Queens". El valor no se usa como índice.', 'heroe = {"alias": "Spider-Man", "barrio": "Queens"}\nprint(heroe["barrio"])', 'Queens'],
  ['Actualizar el marcador', 'Completa la clave para cambiar las vueltas a 5.', 'carrera = {"vueltas": 4, "puntos": 10}\ncarrera[___] = 5\nprint(carrera["vueltas"])', ['"puntos"', '5', '"vueltas"', '0'], 2, 'Se utiliza la misma clave "vueltas" para reemplazar su valor de 4 por 5.', 'carrera = {"vueltas": 4, "puntos": 10}\ncarrera["vueltas"] = 5\nprint(carrera["vueltas"])', '5'],
  ['Una consulta con get', 'Completa la clave para mostrar 7.', 'registro = {"nombre": "Sam", "nota": 7}\nprint(registro.get(___))', ['"nombre"', '"nota"', '"7"', '0'], 1, 'get("nota") recupera el valor asociado a esa clave: 7.', 'registro = {"nombre": "Sam", "nota": 7}\nprint(registro.get("nota"))', '7'],
  ['Estado del laboratorio', 'Elige la clave que devuelve True.', 'sesion = {"curso": "Python", "activa": True}\nprint(sesion[___])', ['True', '"curso"', '1', '"activa"'], 3, 'La clave "activa" guarda un bool. Al imprimirlo aparece True sin comillas.', 'sesion = {"curso": "Python", "activa": True}\nprint(sesion["activa"])', 'True']
].map(d => ({ type: 'fill', title: d[0], prompt: d[1], guide: 'Un diccionario relaciona claves con valores. Si la clave es texto, escríbela entre comillas dentro de [] o de get().', code: d[2], blanks: [{ label: 'Clave que falta', options: options(d[3]) }], answer: [`o${d[4]}`], explanation: d[5], solutionCode: d[6], verification: { code: d[6], output: d[7] } }));

const turtleSets = [
  [4, 90, 80, 'cuadrado', ['90', '45', '180', '30'], 0],
  [3, 120, 90, 'triángulo equilátero', ['60', '90', '120', '180'], 2],
  [6, 60, 55, 'hexágono regular', ['120', '60', '30', '90'], 1],
  [5, 72, 65, 'pentágono regular', ['60', '90', '108', '72'], 3],
  [8, 45, 40, 'octágono regular', ['45', '90', '135', '60'], 0],
  [4, 90, 110, 'cuadrado de lado 110', ['180', '360', '90', '45'], 2]
];
const turtles = turtleSets.map(d => {
  const code = `import turtle\nfor lado in range(${d[0]}):\n    turtle.forward(${d[2]})\n    turtle.right(___)\nturtle.done()`;
  return { type: 'fill', title: 'Un dibujo, paso a paso', prompt: `Completa el giro para dibujar un ${d[3]}. Hay ${d[0]} lados iguales.`, guide: 'forward avanza y right gira en grados. Para cerrar un polígono regular, el giro exterior es 360 ÷ número de lados. Sustituye ___.', code, blanks: [{ label: 'Giro en grados', options: options(d[4]) }], answer: [`o${d[5]}`], explanation: `360 ÷ ${d[0]} = ${d[1]}°. Se avanza y gira ${d[0]} veces para cerrar el dibujo. El giro de turtle es el exterior, no el ángulo interior.`, solutionCode: code.replace('___', String(d[1])), turtle: { sides: d[0], turn: d[1], length: d[2] }, verification: { code: code.replace('___', String(d[1])), turtle: { sides: d[0], turn: d[1], length: d[2] } } };
});

const calculatorSets = [
  ['+', 'sumar', 4, 3, 7, 'Suma los puntos de dos rondas.', ['+', '-', '*', '/'], 0],
  ['-', 'restar', 10, 4, 6, 'Calcula las provisiones que quedan después del viaje.', ['+', '*', '-', '/'], 2],
  ['*', 'multiplicar', 3, 5, 15, 'Calcula el total de botellas en varias cajas.', ['/', '*', '+', '-'], 1],
  ['/', 'dividir', 12, 4, 3, 'Reparte una distancia en partes iguales.', ['+', '-', '*', '/'], 3],
  ['+', 'sumar', 60, 7, 67, 'Combina dos cantidades. Esta vez, 67 es el resultado.', ['-', '+', '/', '*'], 1],
  ['*', 'multiplicar', 6, 2, 12, 'Calcula el número de minutos de varios turnos.', ['*', '/', '-', '+'], 0]
];
const calculators = calculatorSets.map(d => {
  const guard = d[0] === '/' ? '    if b == 0:\n        return "No se puede dividir entre cero"\n' : '';
  const code = `def calcular(a, b):\n${guard}    return a [1] b\n\na = float(input("Primer número: "))\nb = float(input("Segundo número: "))\nresultado = [2]\nprint(resultado)`;
  const resolved = code.replace('[1]', d[0]).replace('[2]', 'calcular(a, b)');
  return { type: 'fill', title: 'Tu primera calculadora', prompt: `${d[5]} Completa las dos piezas para ${d[1]}.`, guide: '1. Elige el operador que pide el problema. 2. Llama a calcular con a y b para guardar lo que devuelve return. float admite números con decimales.', code,
    blanks: [{ label: '[1] Operador', options: options(d[6]) }, { label: '[2] Llamada a la función', options: options(['print(a, b)', 'calcular(a, b)', 'input(a, b)', 'calcular']) }], answer: [`o${d[7]}`, 'o1'], explanation: `El operador ${d[0]} permite ${d[1]}. calcular(a, b) devuelve el resultado y lo guarda en resultado. Con ${d[2]} y ${d[3]} se obtiene ${d[4]}.${d[0] === '/' ? ' Antes de dividir se comprueba que b no sea cero.' : ''}`, solutionCode: resolved, calculator: { op: d[0], a: d[2], b: d[3] }, verification: { code: resolved, input: `${d[2]}\n${d[3]}`, output: `Primer número: Segundo número: ${d[4]}.0` } };
});

const byTopic = [comments, prints, types, maths, inputs, funcs, conditionSets, loopSets, listSets, dictSets, turtles, calculators];
export const BANK = Object.fromEntries(VERSIONS.map((v, versionIndex) => [v, byTopic.map((variants, topicIndex) => ({ ...variants[versionIndex], id: `${v}${String(topicIndex + 1).padStart(2, '0')}`, topic: TOPICS[topicIndex], number: topicIndex + 1 }))]));

export function solutionText(q) {
  if (q.type === 'order') return q.answer.map(id => q.steps.find(s => s.id === id).code).join('\n');
  if (q.type === 'match') return q.items.map((item, i) => `${item.label} → ${q.answer[i]}`).join('\n');
  if (q.type === 'fill') return q.blanks.map((b, i) => `${b.label}: ${b.options.find(o => o.id === q.answer[i]).label}`).join('\n');
  return q.options.find(o => o.id === q.answer).label;
}
