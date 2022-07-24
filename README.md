# progressively-collapsing-menu

Progressively collapsing menu component. Moves links that are overflowing viewport inside a dropdown menu. Highly customisable as there is only basic styling applied.

![](https://github.com/husky93/progressively-collapsing-menu/blob/main/menu.gif)

## How to use

##### - Install the module inside your project

```
npm install progressively-collapsing-menu --save
```

##### - Import it with your preferred method and call the imported function

```javascript
import Menu from 'progressively-collapsing-menu';
const menu = Menu(parent, links, {
  dropdownText: 'Show more'
});
```

###### Function takes 3 parameters:
- `parent` - a DOM element, container in which your menu will be nested.
- `links` - an array of DOM elements containing all your menu links.
- `options` - an object with optional additional parameters. Those parameters are:
  - `dropdownText` - Changes the default text of the dropdown menu. Must be a string.
  - `noStyles` - Removes all the basic styling. :warning: **Use with caution**: This option may cause issues. It breaks the custom dropdown animation and may also break whole menu component.

###### It returns an object with two methods:
- `createMenu` - Creates and renders menu with provided `links` inside the specified `parent` container.
- `moveLinks` - Checks if links are overflowing or if there is free space and moves them between menu and dropdown accordingly.

##### - Create menu

Create menu and call `moveLinks` method whenever you want to check if links are overflowing and move them inside the dropdown, or move them from dropdown to menu if there is free space available.

```javascript
menu.createMenu();
menu.moveLinks();
window.onresize = menu.moveLinks;
```

### Full use example with webpack

```javascript
import Menu from 'progressively-collapsing-menu';

const container = document.querySelector('.container');
const links = [];

for (let i = 0; i < 24; i++) {
  const navItem = document.createElement('li');
  const navLink = document.createElement('a');
  navLink.textContent = `Link ${i}`;
  navItem.appendChild(navLink);
  links.push(navItem);
}

const menu = Menu(container, links);

menu.createMenu();
menu.moveLinks();
window.onresize = menu.moveLinks;
```