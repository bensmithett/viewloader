viewloader is a tiny little framework-agnostic JS bootstrapping thing that lets you attach JS behaviour to a HTML element using data attributes.

## How to use it
Add `data-view-setup-function-name` attributes to your HTML:

```html
<div data-view-dropdown>
  ...
</div>
<div data-view-chat-window='{"foo":"bar"}'>
  ...
</div>
```

Create an object for your app that lists setup functions for each type of view.

```javascript
myApp.views = {
  dropdown: function( $el ) { $el.fancyDropdown(); },
  chatWindow: function( $el, el, props) { new ChatWindowView({ el: el, foo: props.foo }); },
  // ... etc etc
};
```

Once the DOM is ready, run:

```javascript
viewloader.execute( myApp.views );
```

viewloader will use the setup functions defined in your "views" object and try to match them against elements in the DOM. If there is a match it’ll call the setup function with 3 arguments:

- `$el`: the jQuery-wrapped matched DOM element (i.e. `$(el)`)
- `el`: the matched DOM element
- `props`: whatever value is passed into your data attribute. This can be anything parse by jQuery’s `.data()` function — strings, numbers, and even JSON.

viewloader will transform `camelCased` function names into `dash-er-ized` attributes in your HTML. So, as in the example above, a setup function named `chatWindow` will be matched by an HTML element like: `<div data-view-chat-window>`.

`viewloader.execute` takes an optional second argument so you can scope execution to a particular element/set of elements. This is useful if you've updated the DOM and need to re-bind behaviour to new elements.

```javascript
viewloader.execute( myApp.views, $("#updated-dom-container") );
```

## Dependencies
viewloader needs either [jQuery](http://jquery.com/) or [Zepto](http://zeptojs.com/). If you're not using either of those, it's 25 whole lines of JavaScript, so I’m sure you can rewrite it to suit your needs :)

## License
viewloader is released under the [MIT License](http://ben.mit-license.org/)

## Shoutout
viewloader is just a slightly-tweaked and bower-componentized version of an idea that [Toby](https://github.com/tobico) showed me.
