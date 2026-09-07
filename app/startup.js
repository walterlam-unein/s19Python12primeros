// Visible startup diagnostics: never leave the initial loading message forever.
(function () {
  var root = document.getElementById('root');
  var stopped = false;
  var timer;
  function showProblem(message) {
    if (stopped || window.PYTHON_GP_READY) return;
    stopped = true;
    clearTimeout(timer);
    var title = document.createElement('h1');
    title.textContent = 'No se pudo iniciar la actividad';
    var description = document.createElement('p');
    description.textContent = 'Recarga la página. Si continúa, comparte el enlace con tu docente para revisar esta publicación.';
    var button = document.createElement('button');
    button.textContent = 'Recargar la página';
    button.className = 'button primary';
    button.onclick = function () { window.location.reload(); };
    var detail = document.createElement('p');
    detail.className = 'small muted';
    detail.textContent = 'Detalle: ' + message;
    var box = document.createElement('main');
    box.className = 'fallback';
    box.appendChild(title); box.appendChild(description); box.appendChild(button); box.appendChild(detail);
    root.replaceChildren(box);
  }
  window.addEventListener('error', function (event) {
    if (event.filename && /(?:^|\/)config\.js(?:\?|$)/.test(event.filename)) return;
    if (event.message) showProblem(event.message);
  });
  window.addEventListener('python-gp-ready', function () { stopped = true; clearTimeout(timer); });
  timer = setTimeout(function () {
    showProblem('El navegador no terminó de iniciar la aplicación. Comprueba que abriste el index.html de la raíz del ZIP actualizado.');
  }, 10000);
})();
