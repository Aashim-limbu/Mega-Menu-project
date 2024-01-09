const navItems = [
  { id: 1, name: "Africa", parentId: 1 },
  { id: 2, name: "Asia", parentId: 2 },
  { id: 3, name: "Austrilia and Oceania", parentId: 3 },
  { id: 4, name: "North America", parentId: 8 },
  { id: 5, name: "Europe", parentId: 6 },
  { id: 6, name: "South America", parentId: 9 },
];
function NavBar({ setQuery }) {
  function handleClick(item) {
    setQuery(item.parentId);
  }
  return (
    <div className="header-top">
      <div className="inner-header">
        <div className="logo">
          <img src="" alt="" />
        </div>

        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li
                className="link"
                onMouseEnter={() => handleClick(item)}
                key={item.parentId}
              >
                <button className="nav-button">{item.name}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
