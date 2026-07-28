/* Anastasia Buialo — portfolio
   Four pieces of state: lang, theme, open accordions, copied.
   No framework. Shared across all three pages. */
(function () {
  'use strict';

  var LANG_KEY = 'ab-portfolio-lang';
  var THEME_KEY = 'ab-portfolio-theme';
  var EMAIL = 'anastasia.buialo@gmail.com';
  var body = document.body;

  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function setPressed(selector, attr, value) {
    var btns = document.querySelectorAll(selector);
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute(attr) === value ? 'true' : 'false');
    }
  }

  function applyTheme(t) {
    body.dataset.theme = t;
    setPressed('[data-set-theme]', 'data-set-theme', t);
  }

  function applyLang(l) {
    body.dataset.lang = l;
    document.documentElement.lang = l;
    setPressed('[data-set-lang]', 'data-set-lang', l);
  }

  // Initialise from storage (defaults: light / en). The inline snippet in
  // <head>-of-<body> has already set the theme/lang to avoid a flash; here we
  // simply re-sync state and the toggle button pressed-states.
  var savedTheme = read(THEME_KEY);
  applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'light');
  var savedLang = read(LANG_KEY);
  applyLang(savedLang === 'en' || savedLang === 'no' ? savedLang : 'en');

  function closeHead(head) {
    head.setAttribute('aria-expanded', 'false');
    var p = document.getElementById(head.getAttribute('aria-controls'));
    if (p) p.hidden = true;
    var i = head.querySelector('.acc-icon');
    if (i) i.textContent = '+';
  }

  function toggleAccordion(btn) {
    var open = btn.getAttribute('aria-expanded') === 'true';
    // Exclusive: opening one collapses the others in the same group.
    if (!open) {
      var group = btn.closest('.accordion, .vw-accordion');
      if (group) {
        var others = group.querySelectorAll('.acc-head[aria-expanded="true"]');
        for (var i = 0; i < others.length; i++) {
          if (others[i] !== btn) closeHead(others[i]);
        }
      }
    }
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (panel) panel.hidden = open;
    var icon = btn.querySelector('.acc-icon');
    if (icon) icon.textContent = open ? '+' : '−'; // minus sign
  }

  function copyEmail(btn) {
    var done = function () {
      var copied = btn.getAttribute('data-label-copied') || 'Copied!';
      var normal = btn.getAttribute('data-label-copy') || 'Copy';
      btn.textContent = copied;
      clearTimeout(btn._copyTimer);
      btn._copyTimer = setTimeout(function () { btn.textContent = normal; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(function () {});
    } else {
      var ta = document.createElement('textarea');
      ta.value = EMAIL;
      body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      ta.remove();
    }
  }

  document.addEventListener('click', function (e) {
    var themeBtn = e.target.closest('[data-set-theme]');
    if (themeBtn) {
      var t = themeBtn.getAttribute('data-set-theme');
      write(THEME_KEY, t);
      applyTheme(t);
      return;
    }
    var langBtn = e.target.closest('[data-set-lang]');
    if (langBtn) {
      var l = langBtn.getAttribute('data-set-lang');
      write(LANG_KEY, l);
      applyLang(l);
      return;
    }
    var copyBtn = e.target.closest('[data-copy-email]');
    if (copyBtn) {
      copyEmail(copyBtn);
      return;
    }
    var accBtn = e.target.closest('.acc-head');
    if (accBtn) {
      toggleAccordion(accBtn);
    }
  });
})();
