A slightly tweaked version of https://github.com/bensmithett/viewloader/tree/1.x-master to help us
incrementally update to v2.

With this HTML:

```html
<div data-view="someThing"></div>
```

and this JS:

```javascript
viewloader.execute(SomeNamespace);
```

viewloader will automagically call `new SomeNamespace.SomeThing($el, el)`

(Transforming the first letter to lowercase is a specific requirement of our use case)
