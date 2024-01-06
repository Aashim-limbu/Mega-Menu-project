import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function Menu() {
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
			console.log(response.data);
			return response.data;
		} else {
			throw new Error("Request failed with status:", response.status);
		}
	}
	console.log(destinations);
	const getContinentName = (parentId) => {
		switch (parentId) {
			case 1:
				return "Africa";
			case 2:
				return "Asia";
			case 3:
				return "Oceania";
			case 4:
				return "South America";
			case 6:
				return "Europe";
			case 7:
				return "North America";
			default:
				return "Unknown Continent";
		}
	};

	return (
		<div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				destinations?.data
					.filter((element) => element.destinationType === "COUNTRY")
					.map((country) => (
						<div key={country.destinationId}>
							<strong>Country Name:</strong> {country.destinationName}
							<br />
							<strong>Continent:</strong> {getContinentName(country.parentId)}
						</div>
					))
			)}
		</div>
	);

}

export default Menu;
