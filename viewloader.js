(function (root, factory) {
  root.viewloader = factory({}, (root.jQuery || root.Zepto || root.$), root);
}(this, function(viewloader, $, root) {
  "use strict";

  viewloader.execute = function (views, $scope) {
    var $els = $scope ? $scope.find("[data-view]") : $("[data-view]");

    $els.each(function(i, el) {
      var $el = $(el);
      var view = $el.data("view");
      if (view && views[view]) {
        views[view]($el, el);
      }
    });
  };

  return viewloader;
}));
