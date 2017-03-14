# Popup
My popup is very simple. I use it in my every project. Its main feature is that it is able to compute the length of your vertical scrollbar and prevents page bouncing when scrollbar is hidden and the popup is toggled. Popup can be closed by clicking “close” button or hiting “ESC” key.

## Usage

Tou use the popup you need to add **jQuery**, **popup.js** and **popup.css** to your application. It can be initialized like:
```html
<div class="popup" id="popup">
  <h2>Awesome popup!</h2>
  <a href="#" class="popup__close">x</a>  
</div>
```
If you want to display popup on page load you should use following code:
```html
<div class="popup is-visible" id="popup">
  <h2>Awesome popup!</h2>
  <a href="#" class="popup__close">x</a>  
</div>
```
### Note:
It's important to ise **id**, since it is required for poup initialization and css modifications. That's it!

It order to toggle popup, you can use such a html markup:
```html
<a href="#popup" class="open-popup">Open popup</a>
```

