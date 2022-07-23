const menu = (() => {
  const isInViewport = (element) => {
    const dropdown = document.querySelector('.dropdown');
    const rect = element.getBoundingClientRect();
    const rectDropdown = dropdown.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= rectDropdown.left
    );
  };

  const isFreeSpace = (link) => {
    const navbar = document.querySelector('.navbar');
    const dropdown = document.querySelector('.dropdown');
    const rect = navbar.getBoundingClientRect();
    const rectDropdown = dropdown.getBoundingClientRect();
    const freeSpace = rect.right - rectDropdown.right;
    const linkWidth = link.clientWidth;

    return freeSpace >= linkWidth;
  };

  const moveLinks = () => {
    const menuContainer = document.querySelector('.menu--progressive');
    const dropdown = document.querySelector('.dropdown-menu');
    const menulinks = [...menuContainer.children];

    menulinks.forEach((link) => {
      if (!isInViewport(link)) {
        menuContainer.removeChild(link);
        dropdown.appendChild(link);
      }
    });

    const link = dropdown.lastChild;
    if (isFreeSpace(link)) {
      dropdown.removeChild(link);
      menuContainer.appendChild(link);
    }
  };
  return { moveLinks };
})();

export default menu;
