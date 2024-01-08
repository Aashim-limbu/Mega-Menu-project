import Menu from "./Menu";
import NavBar from "./NavBar";
import { useState } from "react";

function App() {
	const [Query, setQuery] = useState(0);
	return (
		<div className="w-full">
            <div className="container m-auto">
			<NavBar setQuery={setQuery} />
			<Menu Query={Query} />
            </div>
		</div>
	);
}

export default App;
