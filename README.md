# ui-expand

![](./assets/example.gif)

## Install

```
$ npm install ui-expand --save
```

```js
import Expand from 'ui-expand'
```

### CDN

```html
<script src="https://unpkg.com/ui-expand@0.0.3/js/ui-expand.min.js"></script>
```

## Usage

```html
<div class="js-expand">
  <button class="js-expand-btn">expand</button>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, delectus vitae voluptas, corrupti ea expedita velit veniam accusamus repellat ex non esse ipsa harum laudantium veritatis excepturi, sapiente qui. Excepturi.</p>
  </div>
</div>
```

```js
new Expand('.js-expand', {
  trigger: '.js-expand-btn' //it should be inside `.js-expand`
});
```

## Event

```js
new Expand('.js-expand', {
  trigger: '.js-expand-btn',
  beforeOpen: (_element, trigger) => { //before expand

  },
  onOpen: (_element, trigger) => { // after expand

  },
  beforeClose: (_element, trigger) => { // before close

  },
  onClose: (_element, trigger) => { // after close

  }
});
```