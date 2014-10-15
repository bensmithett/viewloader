viewloader is a tiny little framework-agnostic JS bootstrapping thing that lets you attach JS behaviour to a HTML element using data attributes.

## How to use it

Add `data-view` attributes to your HTML:

```html
<div data-view="dropdown">
  ...
</div>
```

Create an object for your app that lists setup functions for each type of view.

```javascript
MyApp.Views = {
  dropdown: function( $el ) { $el.fancyDropdown(); },
  chatWindow: function( $el, el ) { new ChatWindowView({ el: el }); },
  // ... etc etc
};
```

Once the DOM is ready, run:

```javascript
viewloader.execute( MyApp.Views );
```

viewloader will find every element on the page with a `data-view` attribute and check to see if a function with that name exists on the supplied object.

If such a function exists, it will be called 2 arguments:

- `$el`: the jQuery-wrapped DOM element (i.e. `$(el)`)
- `el`: the DOM element

`viewloader.execute` takes an optional second argument so you can scope execution to a particular element/set of elements. This is useful if you've updated the DOM and need to re-bind behaviour to new elements.

```javascript
viewloader.execute( myApp.views, $("#updated-dom-container") );
```

## Dependencies
viewloader needs either [jQuery](http://jquery.com/) or [Zepto](http://zeptojs.com/). If you're not using either of those, it's 13 whole lines of JavaScript... I'm sure you can rewrite it to suit your needs :)

## License
viewloader is released under the [MIT License](http://ben.mit-license.org/)

## Shoutout
viewloader is just a slightly-tweaked and bower-componentized version of an idea that [Toby](https://github.com/tobico) showed me.
