const Menu = (parent, [...links], options = {}) => {
  const isInViewport = (element) => {
    const dropdown = document.querySelector('.dropdown');
    const rect = element.getBoundingClientRect();
    const rectDropdown = dropdown ? dropdown.getBoundingClientRect() : null;
    return dropdown
      ? rect.right <= rectDropdown.left
      : rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
  };

  const isFreeSpace = () => {
    const navbar = document.querySelector('.menu-wrapper');
    const dropdown = document.querySelector('.dropdown');
    const dropdownList = document.querySelector('.dropdown-collapse');
    const rect = navbar.getBoundingClientRect();
    const rectDropdown = dropdown.getBoundingClientRect();
    const freeSpace = rect.right - rectDropdown.right;
    const linkWidth = dropdownList.lastElementChild.clientWidth;

    return freeSpace >= linkWidth;
  };

  const appendLinks = (menu) => {
    links.forEach((link) => {
      menu.appendChild(link);
    });
  };

  const createDropdown = (wrapper) => {
    const dropdown = document.createElement('div');
    const collapsable = document.createElement('div');
    const title = document.createElement('span');

    title.classList.add('dropdown-title');
    dropdown.classList.add('dropdown');
    collapsable.classList.add('dropdown-collapse');

    title.textContent =
      typeof options.dropdownText === 'string'
        ? options.dropdownText
        : 'More ↓';

    dropdown.addEventListener('click', () =>
      dropdown.classList.toggle('active')
    );

    dropdown.append(title, collapsable);
    wrapper.appendChild(dropdown);
  };

  const addDropdownStyles = () => {
    require('./assets/dropdown.css');
  };

  const addMenuStyles = () => {
    require('./assets/menu.css');
  };

  const createMenu = () => {
    const menu = document.createElement('ul');
    const wrapper = document.createElement('nav');

    wrapper.classList.add('menu-wrapper');
    menu.classList.add('menu--progressive');

    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'row';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'row';
    menu.style.overflow = 'hidden';
    menu.style.listStyle = 'none';

    wrapper.appendChild(menu);
    parent.appendChild(wrapper);

    appendLinks(menu);
    createDropdown(wrapper);

    if (!options.noStyles) {
      addDropdownStyles();
      addMenuStyles();
    }
  };

  const isElementEmpty = (element) => element.lastElementChild === null;

  const moveLinks = () => {
    const menuContainer = document.querySelector('.menu--progressive');
    const menulinks = [...menuContainer.children];

    menulinks
      .slice()
      .reverse()
      .forEach((link) => {
        let dropdown = document.querySelector('.dropdown-collapse');
        if (!isInViewport(link) && !dropdown) {
          const wrapper = document.querySelector('.menu-wrapper');
          createDropdown(wrapper);
          dropdown = document.querySelector('.dropdown-collapse');
          menuContainer.removeChild(link);
          dropdown.appendChild(link);
        } else if (!isInViewport(link) && dropdown) {
          menuContainer.removeChild(link);
          dropdown.appendChild(link);
        }
      });

    const dropdown = document.querySelector('.dropdown-collapse');
    if (dropdown && !isElementEmpty(dropdown)) {
      const dropdownLinks = [...dropdown.children];
      dropdownLinks
        .slice()
        .reverse()
        .forEach((link) => {
          if (isFreeSpace()) {
            dropdown.removeChild(link);
            menuContainer.appendChild(link);
          }
        });
    } else if (dropdown && isElementEmpty(dropdown)) {
      const wrapper = document.querySelector('.menu-wrapper');
      wrapper.removeChild(dropdown.parentElement);
    }
  };
  return { createMenu, moveLinks };
};

export default Menu;
