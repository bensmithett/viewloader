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




<div data-hydrate-as="SomeThing" data-hydrate-with="a string"></div>
<div data-hydrate-as="SomeThing" data-hydrate-with-json="{etc:123}"></div>


async function hydrate(views, root = document) {
  const hydrated = []

  root.querySelectorAll('[data-hydrate-as]').forEach((element) => {
    const { dataset } = element
    const hydrator = views[dataset.hydrateAs]
    if (typeof hydrator === 'function') {
      hydrated.push(hydrator({
        element,
        data: dataset.hydrateWithJson ? JSON.parse(dataset.hydrateWithJson) : dataset.hydrateWith
      }))
    }
  })

  return {
    destroyAll () {
      hydrated.forEach((view) => view.destroy && view.destroy())
    },
    resetAll () {
      hydrated.forEach((view) => view.reset && view.reset())
    },
  }
}


const header = document.querySelector('#header')
const content = document.querySelector('#content')

const myViews = {
  header: viewloader.hydrate(views, header),
  content: viewloader.hydrate(views, content)
}

// Then, when you're replacing a segment of the page (e.g. client-side pagination)
myViews.content.destroy()
content.innerHTML = newContent
myViews.content = viewloader.hydrate(views, content)
