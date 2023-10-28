# Nuxt 3 CMS Stock Course EP.3

## Outcome

-   Understand style in vue component and how to use it
-   Understand how to implement css in assets folders

## Documentation for Assets folder

https://nuxt.com/docs/guide/assets

## Setup

1. Create css in `assets/css` folder in `assets/css/mycss.css`

```css
/* assets/css/mycss.css */
.mydivclass {
    color: red;
}
```

2. Import css in `nuxt.config.js`

```js
// nuxt.config.js
export default {
    css: ["~/assets/css/mycss.css"],
};
```

3. Use css in component in `app.vue`

```html
<template>
    <div>
        <h1 class="mydivclass" style="color: green;">{{ msg }}</h1>
        <input type="text" placeholder="Search" />
        <h3>Image From public/</h3>
        <img src="./images/dog.jpeg" alt="Dog logo" />
        <h3>Image From assets/</h3>
        <img src="~/assets/images/mountain.jpg" alt="Dog logo" />
    </div>
</template>
```
