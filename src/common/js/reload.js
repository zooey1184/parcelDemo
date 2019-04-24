export default function listenPage(p) {
  function run(option) {
    var _self = this;

    function getHiddenProp() {
      var prefixes = ['webkit', 'moz', 'ms', 'o'];
      if ('hidden' in document) return 'hidden';
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document)
          return prefixes[i] + 'Hidden';
      }
      return null;
    }

    function getVisibilityState() {
      var prefixes = ['webkit', 'moz', 'ms', 'o'];
      if ('visibilityState' in document) return 'visibilityState';
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document)
          return prefixes[i] + 'VisibilityState';
      }
      return null;
    }

    function isHidden() {
      var prop = getHiddenProp();
      if (!prop) return false;

      return document[prop];
    }
    var visProp = getHiddenProp();
    _self.outLoad = true;
    _self.outClose = true;

    function result(m) {
      if (m && option && option.onload) {
        if (_self.outLoad) {
          _self.outLoad = false;
          option.onload();
          setTimeout(function() {
            _self.outLoad = true
          }, 100)
        }
      } else if (!m && option && option.onclose) {
        if (_self.outClose) {
          _self.outClose = false;
          option.onclose();
          setTimeout(function() {
            _self.outClose = true
          }, 3000)
        }
      }
    }
    if (visProp) {
      var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
      document.addEventListener(evtname, function() {
        var r = document[getVisibilityState()];
        if (r == "visible") {
          result(true)
        } else if (r == "hidden") {
          result(false)
        }
      }, false);
    }
    window.focusEvent = window.focusEvent || [];
    window.focusEvent.push(function() {
      result(true)
    })
    window.blurEvent = window.blurEvent || [];
    window.blurEvent.push(function() {
      result(false)
    })
    window.onfocus = function() {
      if (window.focusEvent) {
        for (var i = 0; i < window.focusEvent.length; i++) {
          if (typeof window.focusEvent[i] == "function") window.focusEvent[i]()
        };
      }
    };
    window.onblur = function() {
      if (window.blurEvent) {
        for (var i = 0; i < window.blurEvent.length; i++) {
          if (typeof window.blurEvent[i] == "function") window.blurEvent[i]()
        };
      }
    };
  }
  return new run(p)

}
