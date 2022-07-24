import Menu from './modules/menu';
import './style.css';

const navbar = document.querySelector('.menu');
const links = [];

for (let i = 0; i < 36; i++) {
  const navItem = document.createElement('li');
  const navLink = document.createElement('a');
  navLink.textContent = `Link ${i}`;
  navItem.appendChild(navLink);
  links.push(navItem);
}

const menu = Menu(navbar, links, {
  dropdownText: 'Yo',
});
menu.createMenu();
menu.moveLinks();
window.onresize = menu.moveLinks;
