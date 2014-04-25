//  viewloader 0.0.2
(function(root, factory) {
  root.viewloader = factory({},(root.jQuery || root.Zepto || root.$)); // Browser global
}(this, function(viewloader,$) {
  "use strict";
  var dasherize = function(s) {
    var r = /([a-z0-9][A-Z])/g,
    dash = function(m) {
      return m[0] + '-' + m[1].toLowerCase();
    };
    return s.replace(r, dash);
  };
  viewloader.execute = function(views, $scope) {
    for(var view in views) {
      var dashView = dasherize(view),
        selector = "[data-view-" + dashView + "]",
      $els = $scope ? $scope.find(selector) : $(selector);
      $els.each(function(i, el) {
        var $el = $(el);
        views[view]($el, el, $el.data("view-" + dashView));
      });
    }
  };
  return viewloader;
}));
