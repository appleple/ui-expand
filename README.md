# ui-expand

![](./assets/icon_fullscreen.svg)

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
  trigger: '.js-expand-btn' //inner element
});
```

## Event

```js
new Expand('.js-expand', {
  trigger: '.js-expand-btn',
  onOpen: (_element, trigger) => {
    trigger.innerHTML = 'close';
  },
  onClose: (_element, trigger) => {
    trigger.innerHTML = 'expand';
  },
  beforeOpen: (_element, trigger) => {
    trigger.innerHTML = 'expand';
  },
  beforeClose: (_element, trigger) => {
    trigger.innerHTML = 'close';
  }
});
```