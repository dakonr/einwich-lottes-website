document.querySelectorAll('[data-c]').forEach(function (el) {
  var raw = el.getAttribute('data-c');
  var at = raw.indexOf('@');
  var addr = at > -1
    ? raw.slice(0, at).split(',').map(function (c) { return String.fromCharCode(c); }).join('') + raw.slice(at)
    : raw;
  function decode() {
    el.href = 'mailto:' + addr;
    if (!el.querySelector('svg')) el.textContent = addr;
  }
  el.addEventListener('focus', decode);
  el.addEventListener('mouseenter', decode);
  el.addEventListener('touchstart', decode);
  el.addEventListener('click', decode);
});
