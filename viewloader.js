(function (root, factory) {
  root.viewloader = factory({}, (root.jQuery || root.Zepto || root.$));
}(this, function (viewloader, $) {
  "use strict";

  var capitaliseFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  viewloader.execute = function (views, $scope) {
    var $els = $scope ? $scope.find("[data-view]") : $("[data-view]");

    $els.each(function(i, el) {
      var $el = $(el);
      var view = capitaliseFirstLetter($el.data("view"));

      if (view && views[view]) {
        new views[view]($el, el);
      }
    });
  };

  return viewloader;
}));
