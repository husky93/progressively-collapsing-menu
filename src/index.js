import Menu from './modules/menu';
import './style.css';

const navbar = document.querySelector('.navbar');
const links = [];

for (let i = 0; i < 36; i++) {
  const navItem = document.createElement('li');
  const navLink = document.createElement('a');
  navLink.textContent = `Link ${i}`;
  navItem.appendChild(navLink);

  links.push(navItem);
}

const menu = Menu(navbar, links);
menu.createMenu();
menu.moveLinks();
window.onresize = menu.moveLinks;
