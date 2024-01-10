import Menu from "./Menu";
import NavBar from "./NavBar";
import { useState } from "react";
import "./styles/main.css";
import { ToursComponent } from "./components/Tours/Tours.component";

function App() {
  const [Query, setQuery] = useState(0);
  const [subMenu, setSubMenu] = useState(null);
  const [allProducts, setAllProducts] = useState(null);

  return (
    <div className="App">
      <header>
        <NavBar setQuery={setQuery} />
        <Menu
          Query={Query}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          setQuery={setQuery}
          setAllProducts={setAllProducts}
        />
      </header>

      <ToursComponent tours={subMenu} allProducts={allProducts} />
    </div>
  );
}

export default App;
