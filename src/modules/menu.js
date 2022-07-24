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

  const isFreeSpace = (link) => {
    const navbar = document.querySelector('.menu--wrapper');
    const dropdown = document.querySelector('.dropdown');
    const rect = navbar.getBoundingClientRect();
    const rectDropdown = dropdown.getBoundingClientRect();
    const freeSpace = rect.right - rectDropdown.right;
    const linkWidth = link.clientWidth;

    return freeSpace >= linkWidth + 24;
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
    title.classList.add('.dropdown-title');
    dropdown.classList.add('dropdown');
    collapsable.classList.add('dropdown-collapse');
    title.textContent = options.dropdownText || 'More ↓';
    dropdown.append(title, collapsable);

    wrapper.appendChild(dropdown);
  };

  const createMenu = () => {
    const menu = document.createElement('ul');
    const wrapper = document.createElement('nav');
    wrapper.classList.add('menu--wrapper');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'row';
    menu.classList.add('menu--progressive');
    wrapper.appendChild(menu);
    parent.appendChild(wrapper);
    appendLinks(menu);
    createDropdown(wrapper);
  };

  const moveLinks = () => {
    const menuContainer = document.querySelector('.menu--progressive');
    const dropdown = document.querySelector('.dropdown-collapse');
    const menulinks = [...menuContainer.children];

    menulinks
      .slice()
      .reverse()
      .forEach((link) => {
        if (!isInViewport(link)) {
          if (!dropdown) {
            createDropdown();
            const newDropdown = document.querySelector('.dropdown-collapse');
            menuContainer.removeChild(link);
            newDropdown.appendChild(link);
          } else {
            menuContainer.removeChild(link);
            dropdown.appendChild(link);
          }
        }
      });

    const link = dropdown ? dropdown.lastElementChild : null;
    if (link && isFreeSpace(link)) {
      dropdown.removeChild(link);
      menuContainer.appendChild(link);
    }

    if (dropdown && !dropdown.lastElementChild) {
      parent.removeChild(dropdown.parentElement);
    }
  };
  return { createMenu, moveLinks };
};

export default Menu;
