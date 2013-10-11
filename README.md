viewloader
==========

A tiny little framework-agnostic JS bootstrapping thing.

Add `data-view` attributes to your HTML:

```html
<div data-view="dropdown">
  ...
</div>
```

Create a object for your app that lists setup functions for each type of view.

```javascript
myApp.views = {
  dropdown: function( $el ) { $el.fancyDropdown(); },
  chatWindow: function( $el, el ) { new ChatWindowView({ model: new ChatWindow, el: el }); },
  // ...
};
```

Once the DOM is ready, run:

```javascript
viewloader.execute( myApp.Views );
```

viewloader will find every element on the page with a `data-view` attribute and call its setup function with 2 arguments:

- `$el`: the jQuery-wrapped DOM element (i.e. `$(el)`)
- `el`: the DOM element

`viewloader.execute` takes an optional second argument so you can scope execution to a particular element/set of elements. This is useful if you've updated the DOM and need to re-bind behaviour to new elements.

```javascript
viewloader.execute( myApp.views, $("#updated-dom-container") );
```

## License
viewloader is released under the [MIT License](http://ben.mit-license.org/)
