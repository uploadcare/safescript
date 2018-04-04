(function(global, factory) {
  'use strict'

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document
      ? factory(global)
      : function(w) {
        if (!w.document) {
          throw new Error('safescript requires a window with a document')
        }
        return factory(w)
      }
  } else {
    factory(global)
  }
})(typeof window !== 'undefined' ? window : this, function(window) {
  'use strict'

  var replace = function(safescript) {
    var script;
    safescript.style.display = 'none';
    if (safescript.childElementCount) {
      if (console.error) {
        console.error('safescript syntax error: No other nodes allowed inside. ' +
          'Please, escape the content with HTML entities.');
      }
      return;
    }
    script = window.document.createElement('script');
    script.text = safescript.textContent;
    safescript.parentElement.replaceChild(script, safescript)
  };
  var run = function() {
    var safescripts = [].slice.call(window.document.getElementsByTagName('safescript'));
    safescripts.forEach(replace);
  };

  var state = window.document.readyState;
  if (state === 'complete' || state === 'interactive') {
    run();
  } else {
    window.document.addEventListener('DOMContentLoaded', run);
  };
})
