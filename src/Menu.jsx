import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Menu({ Query, subMenu, setSubMenu, setQuery, setAllProducts }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 });

  const { data: destinations = { data: [] }, isLoading } = useQuery({
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
      // console.log("Destination: ", response.data);
      return response.data || { data: [] };
    } else {
      throw new Error("Request failed with status:", response.status);
    }
  }

  function handleMouseEnter(country) {
    setHoveredItem(country.destinationId);
    setSubMenu("Loading");
    renderAttraction(country.destinationId);
  }

  async function renderAttraction(id) {
    const response = await axios.post(
      "/api/partner/v1/taxonomy/attractions",
      {
        destId: id,
        sortOrder: "RECOMMENDED",
        // topX: "1-6",
      },
      {
        headers: {
          "exp-api-key": import.meta.env.VITE_ACCESS_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Attractions: ", response.data.data);

      response.data.data.map((data) => {
        console.log(data.primaryDestinationUrlName);
      });
      setSubMenu(response.data.data);

      // const res = await axios.get(`/api/partner/products/tags/`, {
      //   headers: {
      //     "exp-api-key": import.meta.env.VITE_ACCESS_KEY,
      //     "Content-Type": "application/json",
      //     "Accept-Language": "en-US",
      //     Accept: "application/json;version=2.0",
      //   },
      // });

      // console.log(res.data);

      // const res = await axios.get(`/api/partner/products/30POKHARA`, {
      //   headers: {
      //     "exp-api-key": import.meta.env.VITE_ACCESS_KEY,
      //     "Content-Type": "application/json",
      //     "Accept-Language": "en-US",
      //     Accept: "application/json;version=2.0",
      //   },
      // });

      // console.log(res.data);

      // if (res.status === 200) {
      // console.log(response)
      // return response.data || { data: [] };
      // } else {
      // throw new Error("Request failed with status:", response.status);
      // }
    } else {
      setSubMenu(null);
      throw new Error("Request failed with status:", response.status);
    }
  }

  function handleMouseMove(event) {
    setSubmenuPosition({ x: event.clientX, y: event.clientY });
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="wrapper" onMouseMove={handleMouseMove}>
          <div className="menu-dropdown">
            <ul className="menu-dropdown-list">
              {destinations.data
                .filter((element) => element.parentId === Query)
                .map((country) => (
                  <li
                    className="drop-menu"
                    key={country.destinationId}
                    onClick={() => {
                      handleMouseEnter(country);
                    }}
                    // onMouseLeave={() => setHoveredItem(null)}
                  >
                    {country.destinationName}
                    {hoveredItem === country.destinationId && (
                      <SubMenu
                        setQuery={setQuery}
                        subMenu={subMenu}
                        setAllProducts={setAllProducts}
                        position={{ ...submenuPosition }}
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

const SubMenu = ({ subMenu, position, setAllProducts, setQuery }) => {
  const { x, y } = position;

  async function renderAttractionDetails(seoId) {
    setAllProducts("Loading");
    const res = await axios.get(
      `/api/partner/v1/attraction/products?seoId=${seoId}`,
      {
        headers: {
          Accept: "application/json;version=2.0",
          "exp-api-key": import.meta.env.VITE_ACCESS_KEY,
          "Content-Type": "application/json",
          "Accept-Language": "en-US",
        },
      }
    );

    if (res.status === 200) {
      setAllProducts(res.data.data);
    } else {
      setAllProducts(null);
      throw new Error("Request failed with status:", res.status);
    }
  }

  return (
    <ul
      className="sub-menu-dropdown"
      // style={{ position: "fixed", top: y + 10, left: x + 10 }}
    >
      {subMenu === "Loading" ? (
        <>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
          <li className="loading-li"></li>
        </>
      ) : (
        subMenu
          // ?.filter((data) => data.rating >= 4.5)
          .map((tour, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery("");
                renderAttractionDetails(tour.seoId);
              }}
            >
              {tour.title}
            </li>
          ))
      )}
    </ul>
  );
};

export default Menu;
