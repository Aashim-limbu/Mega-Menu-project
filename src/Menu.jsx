import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Menu({ Query, subMenu, setSubMenu, setQuery }) {
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
      },
      {
        headers: {
          "exp-api-key": import.meta.env.VITE_ACCESS_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data.data);
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

      if (res.status === 200) {
        // console.log(response)
        // return response.data || { data: [] };
      } else {
        // throw new Error("Request failed with status:", response.status);
      }
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
                      setQuery("");
                    }}
                    // onMouseLeave={() => setHoveredItem(null)}
                  >
                    {country.destinationName}
                    {/* {hoveredItem === country.destinationId && (
                      <SubMenu
                        subMenu={subMenu}
                        position={{ ...submenuPosition }}
                      />
                    )} */}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

const SubMenu = ({ subMenu, position }) => {
  const { x, y } = position;

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
        </>
      ) : (
        subMenu
          // ?.filter((data) => data.rating >= 4.5)
          .map((tour, index) => <li key={index}>{tour.title}</li>)
      )}
    </ul>
  );
};

export default Menu;
