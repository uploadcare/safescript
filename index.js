"use strict";

(function() {
  var replace = function(safescript) {
    var script;
    safescript.style.display = 'none';
    if (safescript.childElementCount) {
      if (console.error) {
        console.error("safescript syntax error: No other nodes allowed inside. " +
                      "Please, escape the content with HTML entities.");
      }
      return;
    }
    script = document.createElement('script');
    script.text = safescript.textContent;
    safescript.parentElement.replaceChild(script, safescript)
  };
  var run = function() {
    var safescripts = [].slice.call(document.getElementsByTagName('safescript'));
    safescripts.forEach(replace);
  };

  var state = document.readyState;
  if (state === 'complete' || state === 'interactive') {
    run();
  } else {
    document.addEventListener("DOMContentLoaded", run);
  };
})();
