document.querySelectorAll('[data-c]').forEach(function (el) {
  var codes = el.getAttribute('data-c');
  var addr = codes.split(',').map(function (c) { return String.fromCharCode(c); }).join('');
  function decode() {
    el.href = 'mailto:' + addr;
    if (!el.querySelector('svg')) el.textContent = addr;
  }
  el.addEventListener('focus', decode);
  el.addEventListener('mouseenter', decode);
  el.addEventListener('touchstart', decode);
  el.addEventListener('click', decode);
});