# progressively-collapsing-menu

Progressively collapsing menu component. Moves links that are overflowing menu component to a dropdown menu. <br>
Highly customizable as there is only basic styling applied. Very adaptable, works in many layouts - you can align it however you like.

![](https://github.com/husky93/progressively-collapsing-menu/blob/main/menu.gif)

## How to use

#### 1. Install the module inside your project

```
npm install progressively-collapsing-menu --save
```

#### 2. Import it with your preferred method and call the imported function

```javascript
import Menu from 'progressively-collapsing-menu';
const menu = Menu(parent, links, {
  dropdownText: 'Show more'
});
```

##### Function takes 3 parameters:
- `parent` - a DOM element, container in which your menu will be nested.
- `links` - an array of DOM elements containing all your menu links.
- `options` - an object with optional additional parameters. Those parameters are:
  - `dropdownText` - Changes the default text of the dropdown menu. Must be a string.
  - `noStyles` - Removes most of the basic styling. :warning: **Use with caution**: This option may cause issues. It breaks the custom dropdown animation and may cause problems with component functionality.

##### It returns an object with two methods:
- `createMenu` - Creates and renders menu with provided `links` inside the specified `parent` container.
- `moveLinks` - Checks if links are overflowing or if there is free space inside the specified `parent` element and moves them between menu and dropdown accordingly.

#### 3. Create menu

Create menu and call `moveLinks` method whenever you want to check if links are overflowing and move them inside the dropdown, or move them from dropdown to menu if there is free space available inside the provided as a parameter `parent` element.

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
