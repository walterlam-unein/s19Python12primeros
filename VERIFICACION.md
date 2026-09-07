# Verificación de la entrega

Resultado: **96 pruebas automatizadas aprobadas, 0 fallos** en la versión entregada. Compilación de producción completada con React 19.2.7 y Vite 7.3.1, ejecutada con Node.js 24.19.0.

## Contenido y evaluación

- 72 ejercicios con identificadores únicos: 6 versiones de 12 temas.
- Guía y explicación presentes en cada ejercicio; seis tipos de interacción.
- Todas las soluciones se ejecutaron con Python 3 y coincidieron con la salida prevista.
- Los seis ejemplos de detección de errores produjeron el TypeError esperado en la línea señalada.
- Los seis dibujos de turtle se verificaron con primitivas simuladas: número de avances, ángulo de cada giro y cierre del polígono. No se abrió una ventana gráfica de Tk.
- Las piezas correctas de los ejercicios de completar reconstruyen el código de solución.
- Se comprobaron los 13 resultados posibles (0 a 12 errores) en las seis versiones: 78 recorridos completos del motor de la web.
- No se avanza sin responder ni se cambia una respuesta después de comprobarla. La serialización y recuperación conservan el resultado.

## Registro y clasificación

El servicio se probó en un entorno simulado de Apps Script que reproduce las operaciones utilizadas de Sheets, caché, bloqueo y respuestas de contenido. Estas pruebas comprueban la lógica y el contrato de datos, no la disponibilidad ni los permisos de una cuenta real de Google.

- Recorre las seis versiones para los 13 números de errores: 78 calificaciones recalculadas en el servidor.
- Ignora una nota o un número de errores enviados por el cliente y corrige sus respuestas.
- Rechaza entregas incompletas, opciones inexistentes, órdenes con líneas repetidas, grupos incorrectos, revisiones incompatibles y nombres con fórmulas o código.
- Repetir el mismo ID y comprobante conserva una única fila.
- El estado no revela nombre, apellido ni respuestas; un comprobante diferente no obtiene la confirmación de otra entrega.
- El Top 5 conserva la mejor nota por estudiante, aplica el desempate documentado y abrevia los apellidos.
- Las consultas GET no escriben datos y los nombres de callback JSONP están restringidos.
- Una respuesta opaca al POST no se considera un registro correcto: se exige comprobante del servidor.
- Se probaron confirmación tardía, respuesta del POST perdida, rechazo y comprobante incoherente.

## Aplicación y publicación

- React renderizó correctamente la portada, las 72 pantallas de ejercicios antes y después de responder, los resultados de las seis versiones, turtle y la calculadora.
- La simulación de la calculadora controla la división entre cero.
- El índice de producción contiene el código React y los estilos integrados. No carga módulos, archivos JSX ni recursos de assets/. Solo config.js es externo y es opcional para el modo práctica.
- El script exacto del HTML entregado se ejecutó como JavaScript clásico en un entorno VM, con y sin configuración, y con URLs representativas de archivo local y GitHub Pages. Esta prueba verifica el script; no sustituye un navegador.
- El control de arranque muestra un error visible si la aplicación no inicia y desactiva su temporizador cuando React confirma el montaje.
- El ZIP contiene los archivos compilados y `.nojekyll`, sin `node_modules`, dependencias enlazadas ni rutas absolutas del entorno de desarrollo en la configuración de Vite.
- Los 12 archivos `.py` tienen sintaxis válida. El archivo original de comentarios se conserva sin cambios.

## Comprobaciones que dependen de tus cuentas

**No se publicó el proyecto en una cuenta de GitHub ni se desplegó Apps Script en una cuenta de Google**, porque la entrega solicitada es el ZIP y no se proporcionó una implementación de Sheets. No se realizó una prueba visual o de interacción en un navegador. Las pruebas de React son renderizados en servidor y las pruebas de navegación ejercitan el motor de estado.

La comprobación definitiva de la conexión real consiste en completar una participación de prueba después de seguir `EMPIEZA-AQUI.html`: debe aparecer “Nota registrada”, una fila en Sheets y el resultado en el Top 5. El acceso anónimo, los permisos institucionales, las cuotas de Apps Script y la publicación de Pages solo pueden verificarse en tus cuentas.

Ningún conjunto de pruebas garantiza ausencia absoluta de errores. Aquí se especifica exactamente lo comprobado, sin presentar simulaciones como pruebas de un servicio desplegado.

## Reproducir

```bash
npm ci
npm run build
npm test
```

Solo para mantenimiento: requiere Node.js 22.12+ y Python 3 disponible como `python3`. Para publicar la web compilada no necesitas ejecutar esos comandos.

## Corrección 1.0.1

La entrega anterior usaba módulos de JavaScript externos. Una copia incompleta de assets/, un índice antiguo que apunte a archivos que ya no existen, o abrir el HTML mediante file:// podía impedir el arranque. La nueva entrega elimina esas dependencias integrando el script clásico y los estilos en index.html. No se determinó cuál de esas situaciones ocurrió en la publicación del usuario, porque no se proporcionó su URL. Las restricciones de módulos al abrir archivos locales están descritas por [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

Al actualizar, conserva config.js si ya contiene la URL de tu registro. El banco de ejercicios, la fórmula de nota y el protocolo de Google Sheets mantienen su compatibilidad.
