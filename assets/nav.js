/* Phone menu: opens and closes the mobile navigation panel. */
(function () {
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  var mq = window.matchMedia('(max-width: 720px)');

  function isOpen() { return btn.getAttribute('aria-expanded') === 'true'; }

  function setOpen(open, returnFocus) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { menu.removeAttribute('hidden'); } else { menu.setAttribute('hidden', ''); }
    if (!open && returnFocus) { btn.focus(); }
  }

  btn.addEventListener('click', function () { setOpen(!isOpen()); });

  // Escape closes the menu and puts focus back on the button
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { setOpen(false, true); }
  });

  // Tapping anywhere outside the menu closes it
  document.addEventListener('click', function (e) {
    if (isOpen() && !menu.contains(e.target) && !btn.contains(e.target)) { setOpen(false); }
  });

  // Choosing a link closes the menu
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setOpen(false); }
  });

  // If the screen grows past phone width (rotating, resizing), tidy up
  function onChange() { if (!mq.matches) { setOpen(false); } }
  if (mq.addEventListener) { mq.addEventListener('change', onChange); } else { mq.addListener(onChange); }
})();
