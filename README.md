# Python Grand Prix

**Web lista para subir a GitHub Pages, sin instalar programas.** Abre `EMPIEZA-AQUI.html` para seguir la guía visual. Ese archivo sí se abre con doble clic.

La raíz contiene `index.html`, `config.js` y `.nojekyll`. El código React y los estilos están integrados en el propio `index.html`; ya no se necesita una carpeta `assets/`. El archivo también se puede abrir con doble clic para practicar. También se incluyen el código fuente editable, 12 ejemplos de Python, el registro de Google Sheets y las pruebas.

## Publicar en GitHub sin terminal

1. Descomprime el ZIP en tu computadora. Entra en la carpeta `python-grand-prix`.
2. En GitHub, crea un repositorio público, por ejemplo `python-grand-prix`.
3. Selecciona **Add file → Upload files**. Arrastra el **contenido** de la carpeta, incluidos `index.html` y `config.js`. No subas el ZIP ni dejes otra carpeta por encima de `index.html`.
4. Guarda con **Commit changes**. Si no aparece `.nojekyll`, crea un archivo con ese nombre desde **Add file → Create new file**, escribe una línea en blanco y guarda.
5. Abre **Settings → Pages**. En **Source**, elige **Deploy from a branch**. Selecciona **main** y **/(root)**. Pulsa **Save**.
6. Espera a que GitHub termine de publicar. En esa misma pantalla aparecerá **Visit site**. Abre ese enlace, cuyo formato será `https://TU-USUARIO.github.io/python-grand-prix/`.

No selecciones `/docs`. No necesitas escribir `npm` ni instalar Node.js para este procedimiento. Si estás actualizando la primera entrega, **reemplaza `index.html` y conserva tu `config.js` si ya contiene la URL de Google Sheets**. No hace falta repetir la configuración de Apps Script. La publicación desde una rama está documentada por [GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Conectar Google Sheets, paso a paso

La web se puede publicar inmediatamente. Para registrar notas entre dispositivos, debes hacer esta configuración **una sola vez**; no se puede incluir una autorización de tu cuenta dentro del ZIP.

1. Crea una hoja de cálculo vacía en Google Sheets y ponle un nombre, por ejemplo **Notas Python Grand Prix**. Mantén la hoja privada; los estudiantes no necesitan acceso directo.
2. Dentro de la hoja, abre **Extensiones → Apps Script**. Es necesario abrirlo desde esta hoja, no crear un proyecto suelto.
3. Abre `google-sheets/Code.gs` con Bloc de notas. Copia **todo** el contenido. En Apps Script, borra el ejemplo `myFunction` y pega el código completo en el archivo `Código.gs` o `Code.gs`. **No pegues backend.template.gs**: ese archivo no incluye el banco de respuestas.
4. Guarda el proyecto. No necesitas escribir el ID de la hoja: `setup` lo guarda automáticamente.
5. En la barra superior del editor, junto a **Ejecutar**, abre el selector de funciones y elige **setup**. Pulsa **Ejecutar**. Esa es la función concreta que debes ejecutar para la primera autorización; no selecciones `doGet` ni `doPost`.
6. Si aparece **Se requiere autorización**, pulsa **Revisar permisos**, selecciona la cuenta propietaria de la hoja y permite el acceso solicitado a tus hojas de cálculo. Si Google muestra la advertencia de aplicación no verificada, comprueba que se trata de tu propio proyecto y del código que acabas de pegar. Si aparece la opción para continuar en **Avanzado**, úsala para autorizar tu proyecto. Si la cuenta institucional lo bloquea, solicita al administrador que habilite el acceso; no basta con cambiar una línea del código. Google explica este proceso en su [guía de autorización](https://developers.google.com/apps-script/guides/services/authorization).
7. Vuelve a la hoja. Debe existir la pestaña **Notas Python**, con 15 cabeceras. Si no aparece, vuelve a ejecutar `setup` y revisa el mensaje de error.
8. En Apps Script, abre **Implementar → Nueva implementación**. En el engranaje **Seleccionar tipo**, elige **Aplicación web**.
9. En **Ejecutar como**, selecciona **Yo**. En **Quién tiene acceso**, selecciona **Cualquier persona** (incluye usuarios sin iniciar sesión). Pulsa **Implementar**. Si esta opción no está disponible en tu cuenta, el administrador institucional debe permitirla. La configuración de identidad está descrita en [Aplicaciones web de Apps Script](https://developers.google.com/apps-script/guides/web).
10. Copia la **URL de la aplicación web** que termina en **`/exec`**. No copies el ID de implementación, la dirección de la hoja, una URL del editor ni la dirección `/dev`.
11. En tu repositorio de GitHub, abre el archivo **`config.js` de la raíz** y pulsa el lápiz para editar. Dentro de las comillas vacías de `googleScriptUrl`, pega la URL completa:

```javascript
window.PYTHON_GP_CONFIG = {
  googleScriptUrl: "PEGA_AQUI_TU_URL_QUE_TERMINA_EN_EXEC",
  classId: "python-2026",
  courseName: "Laboratorio de Python",
  version: "aleatoria"
};
```

12. Guarda con **Commit changes**, espera la actualización de Pages y recarga la web. **No recompiles** por cambiar `config.js`.
13. Completa una participación con nombre **Prueba** y apellido **Docente**. Debe aparecer **Nota registrada** en la web, una fila en la hoja y el resultado en el Top 5. Ese es el control definitivo de tu conexión real. Después puedes eliminar esa fila de prueba de la hoja; la clasificación se refresca con un máximo de 20 segundos de caché.

Puedes abrir directamente la URL `/exec` en el navegador. Si está bien desplegada, responde con un pequeño JSON que incluye `Python Grand Prix`. Esa respuesta comprueba que la aplicación es accesible, pero **no sustituye la entrega de prueba**.

## Qué hacen los estudiantes

- Escriben nombre y apellido. Se les asigna una de seis versiones completas, A–F, de forma aleatoria.
- Resuelven 12 ejercicios, mostrados uno a uno, con una guía previa y una explicación posterior.
- Hay seis tipos de interacción: elección múltiple, predicción de salida, completar piezas, detectar la línea de error, ordenar código y relacionar tipos.
- La primera respuesta queda cerrada al comprobarla. Las pistas no penalizan y los errores se explican antes de avanzar. No se puede saltar una pregunta sin contestarla.
- El progreso se conserva en ese navegador si el almacenamiento local está disponible. Al volver, se ofrece continuar con el mismo nombre y versión.
- Al terminar, se ve la nota y el repaso. La calculadora puede probarse con otros números y turtle muestra el recorrido geométrico del ejercicio.

Los ejemplos de Spider-Man, la Odisea, 67 y el Grand Prix of Italy son contextos educativos. No se incorporan logotipos ni recursos oficiales de esas marcas.

## Calificación y clasificación

**Nota = 10 − 0,25 × número de ejercicios incorrectos.** El resultado siempre queda entre 7 y 10. Por tu criterio de puntuación, incluso 12 errores producen 7; la nota por sí sola no equivale al porcentaje de dominio. Por eso también se muestran aciertos y errores.

| Errores | Nota | Errores | Nota |
| ---: | ---: | ---: | ---: |
| 0 | 10,00 | 7 | 8,25 |
| 1 | 9,75 | 8 | 8,00 |
| 2 | 9,50 | 9 | 7,75 |
| 3 | 9,25 | 10 | 7,50 |
| 4 | 9,00 | 11 | 7,25 |
| 5 | 8,75 | 12 | 7,00 |
| 6 | 8,50 | | |

Una pregunta con cuatro relaciones o dos espacios cuenta como **un ejercicio**: solo es correcta si todas sus piezas están correctas. No hay puntuación parcial ni penalización por velocidad.

El Top 5 muestra la mejor nota por nombre y apellido normalizados. En empate se usa la primera entrega recibida por Google. La hoja guarda **todos los intentos**, pero el Top 5 muestra una sola fila por estudiante. Si dos estudiantes tienen exactamente el mismo nombre y apellido, incluye su segundo apellido para distinguirlos. La clasificación pública abrevia el apellido.

## Qué registra la hoja

ID único de entrega; hash del comprobante; grupo; nombre; apellido; versión; inicio declarado por el dispositivo; recepción UTC del servidor; fecha y hora de Ecuador; duración declarada en segundos; aciertos; errores; nota; respuestas; revisión del banco.

El registro vuelve a corregir las respuestas con su propio banco. No acepta la nota calculada por el navegador como autoridad. La fecha de recepción la genera Google; el inicio y la duración son datos declarados por el dispositivo y no afectan la nota.

El envío usa POST y la confirmación consulta un comprobante. Si la respuesta de red se pierde, reintentar conserva el mismo ID y **no duplica la entrega**. Si falta internet, se conserva una copia pendiente en ese navegador; se reintenta al volver la conexión o al pulsar el botón de registro. No borres los datos del navegador antes de confirmar o descargar los resultados pendientes. La clasificación solo contiene entregas confirmadas en Sheets.

## Cambiar el curso o fijar una versión

En `config.js` puedes cambiar `courseName` y `version` sin compilar. Para asignar una versión a un grupo, usa `version: "A"` (o B–F). También puedes enviar enlaces que terminen en `?version=A`, hasta `?version=F`. Una actividad empezada conserva su versión aunque cambies el enlace. La asignación aleatoria no garantiza cantidades idénticas por versión; los enlaces permiten distribuirlas a mano.

Para comenzar un grupo nuevo, cambia `classId` en `config.js` y `CLASS_ID` dentro de `SETTINGS` en el código de Apps Script al **mismo identificador** (por ejemplo `decimo-b-septiembre`). Solo se atiende un grupo activo por implementación; los registros anteriores siguen en la hoja. Para clases simultáneas, usa una copia del registro y una web/configuración por clase. Después de modificar Apps Script, abre **Implementar → Administrar implementaciones → Editar → Versión: Nueva versión → Implementar**. Mantén la implementación existente para conservar su URL `/exec`.

## Arquitectura y límites

La aplicación usa **React 19.2.7, JavaScript, HTML5, CSS3 y Vite 7.3.1**. **Node.js participa en la compilación, no es un servidor de la página publicada.** GitHub Pages sirve archivos estáticos, como explica su [documentación](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). El ZIP incluye la compilación completa, por lo que no necesitas instalar Node.js para publicarla. No depende de un CDN para cargar React, CSS o los ejercicios.

Google Apps Script proporciona el servicio de escritura y lectura de notas. La lectura utiliza el [Content Service y JSONP de Google](https://developers.google.com/apps-script/guides/content), con callbacks restringidos y consultas de solo lectura. No publiques tu hoja como editable ni pongas credenciales privadas en `config.js`; la URL del servicio es pública por diseño.

Es una actividad guiada para aula supervisada. Los nombres se introducen sin autenticación, por lo que no se verifica la identidad. Las soluciones se explican en el cliente y pueden inspeccionarse; no es un examen blindado contra manipulación. El servidor recalcula las notas y valida las opciones, pero un cliente estático no puede ocultar su banco de respuestas. Apps Script está sujeto a las políticas y cuotas de la cuenta de Google.

La web no ejecuta Python arbitrario: evalúa respuestas estructuradas. El dibujo de turtle y la calculadora son simulaciones didácticas en JavaScript. Los archivos de `material-python/` sí son programas para ejecutar con Python instalado; **esa instalación solo hace falta para usar los .py aparte**, no para resolver la web.

Solo se recibió un archivo original: el ejemplo de comentarios. Se conserva sin cambios en `material-python/01_comentarios_original.py`. Los otros once ejemplos y los 72 ejercicios se elaboraron a partir de tu temario; no se presentan como copias de archivos que no fueron adjuntados.

## Modificar el código fuente (opcional)

Esta sección es solo para mantenimiento. Para subir la versión incluida no la necesitas.

Con Node.js 22.12 o superior:

```bash
npm ci
npm run dev
npm run build
npm test
```

`npm test` necesita Python 3 accesible como `python3` para verificar los ejemplos. En Windows puedes usar WSL o adaptar esa llamada a `py -3` en `tests/engine.test.mjs`.

- `app/main.jsx`: pantallas e interacciones.
- `app/styles.css`: diseño adaptable a distintos tamaños.
- `app/questions.js`: banco completo de seis versiones.
- `app/engine.js`: cálculo y navegación.
- `app/api.js`: envío con comprobación de guardado.
- `app/storage.js`: recuperación del avance y entregas pendientes.
- `google-sheets/backend.template.gs`: fuente del servicio.
- `scripts/build.mjs`: compila la web, actualiza la raíz y genera `Code.gs` y `GUIA-DOCENTE.md` a partir del mismo banco.

Si modificas las respuestas, aumenta `BANK_REVISION` en `app/engine.js`, ejecuta `npm run build`, vuelve a subir los archivos de publicación y actualiza el **Code.gs generado** en Apps Script. Las correcciones docentes del backend deben hacerse en `backend.template.gs` antes de compilar; de otro modo, `Code.gs` se sobrescribe. La variable `CLASS_ID` también se conserva desde esa plantilla en futuras compilaciones.

Vite genera un script clásico autocontenido y los estilos se integran en el HTML. La web funciona en la raíz o dentro del nombre de un repositorio, y permite práctica local con doble clic. El registro compartido requiere internet y la configuración de Apps Script. Consulta la [guía de publicación estática de Vite](https://vite.dev/guide/static-deploy) si cambias la arquitectura.

## Si algo no aparece

| Problema | Revisión concreta |
| --- | --- |
| Sigue mostrando “Cargando” con la versión anterior | Sustituye el `index.html` de la raíz por el de la versión 1.0.1. Espera la actualización de Pages y recarga con Ctrl + F5. La nueva versión ya no carga módulos ni archivos desde `assets/`. |
| No aparece la web en GitHub Pages | Comprueba que subiste el `index.html` compilado de la raíz del ZIP. El `app/index.html` es solo para desarrollo. Espera el despliegue y recarga con Ctrl + F5. |
| 404 | En Pages selecciona `main` y `/(root)`, y usa el enlace que muestra GitHub. |
| “npm no se reconoce” | Para esta entrega no necesitas usar npm. Sigue la publicación por archivos ya compilados. |
| No aparece `setup` | Guarda el archivo completo `Code.gs` y revisa que no falten las primeras líneas del banco. |
| No existe la pestaña de notas | Ejecuta `setup` desde un proyecto abierto mediante la hoja, y completa la autorización. |
| Sigue en modo práctica | Edita `config.js` en la raíz, pega la URL `/exec`, guarda en GitHub y espera el despliegue. |
| Registro pendiente | Confirma `/exec`, ejecución como Yo, acceso Cualquier persona, grupo coincidente y permiso de Sheets. Reintenta con el mismo resultado. |
| Se modificó el código pero la web no cambia | Cambios en `app/` requieren una nueva compilación. Cambios solo en `config.js` no. |
| Se modificó Apps Script pero sigue igual | Edita la implementación existente y publica una Nueva versión. Guardar el editor no actualiza la implementación por sí solo. |
| Se repite un estudiante en la hoja | Son intentos distintos si tienen IDs distintos. El Top 5 conserva la mejor nota. Reintentar el mismo ID no crea otra fila. |

## Verificación incluida

Consulta `VERIFICACION.md` para conocer las pruebas realizadas y las comprobaciones que solo se pueden completar después de publicar en tus cuentas. La entrega no contiene una URL de Apps Script inventada ni datos de estudiantes de ejemplo en el Top 5.
