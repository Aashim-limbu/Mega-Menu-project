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
		<div className="w-full bg-gray-300">
			<ul className="flex justify-between gap-x-3">
				{navItems.map((item) => (
					<li className="flex-1 p-4 text-center font-semibold hover:bg-white " onClick={() => handleClick(item)} key={item.parentId}>
						{item.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default NavBar;
