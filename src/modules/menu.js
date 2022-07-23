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

  const moveOverflowingLinks = () => {
    const menuContainer = document.querySelector('.menu--progressive');
    const dropdown = document.querySelector('.dropdown');
    const links = [...menuContainer.children];

    links.forEach((link) => {
      if (!isInViewport(link)) {
        console.log('yo');
      }
    });
    console.log(links);
  };
  return { moveOverflowingLinks };
})();

export default menu;
