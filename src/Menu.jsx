import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function Menu({ Query }) {
	const { data: destinations, isLoading } = useQuery({
		queryKey: ["destinations"],
		queryFn: getDestination,
	});
	async function getDestination() {
		const response = await axios.get("/api/partner/v1/taxonomy/destinations", {
			headers: {
				"exp-api-key": import.meta.env.VITE_ACCESS_KEY,
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Request failed with status:", response.status);
		}
	}
	const getContinentName = (parentId) => {
		switch (parentId) {
			case 1:
				return "Africa";
			case 2:
				return "Asia";
			case 3:
				return "Oceania";
			case 9:
				return "South America";
			case 6:
				return "Europe";
			case 8:
				return "North America";
			default:
				return "Unknown Continent";
		}
	};
	async function renderAttraction(id) {
		const response = await axios.post(
			"/api/partner/v1/taxonomy/attractions",
			{
				destId: id,
				sortOrder: "RECOMMENDED",
			},
			{
				headers: {
					"exp-api-key": import.meta.env.VITE_ACCESS_KEY,
					"Content-Type": "application/json",
				},
			}
		);
		console.log(response.data.data);
	}
	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="grid grid-cols-4 gap-2">
					{destinations?.data
						.filter((element) => element.parentId === Query)
						.map((country) => (
							<div
								className="bg-gray-400  p-4"
								key={country.destinationId}
								onClick={() => renderAttraction(country.destinationId)}
							>
								<strong>Country Name:</strong> {country.destinationName}
								<br />
								<strong>Continent:</strong> {getContinentName(country.parentId)}
								<br />
								<strong>Parent Id: </strong>
								{country.parentId}
								<br />
								<strong>Destination Id : </strong>
								{country.destinationId}
							</div>
						))}
				</div>
			)}
		</>
	);
}

export default Menu;
