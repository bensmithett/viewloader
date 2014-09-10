(function(root, factory) {
  root.viewloader = factory({},(root.jQuery || root.Zepto || root.$)); // Browser global
}(this, function(viewloader,$) {
  "use strict";
  var dasherize = function(s) {
    return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  };
  viewloader.execute = function(views, $scope, includeScope) {
    for(var view in views) {
      var dashView = dasherize(view),
        selector = "[data-view-" + dashView + "]",
      $els = $scope ? $scope.find(selector) : $(selector);
      if (includeScope === true && $scope) {
        $els = $els.add($scope.filter(selector));
      }
      $els.each(function(i, el) {
        var $el = $(el);
        views[view]($el, el, $el.data("view-" + dashView));
      });
    }
  };
  return viewloader;
}));
