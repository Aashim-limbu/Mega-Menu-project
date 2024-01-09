import React, { useEffect, useState } from "react";
import LazyImage from "../ImageLazyLoading.component";
import axios from "axios";

export const ToursComponent = ({ tours }) => {
  const [allTags, setAllTags] = useState(null);
  async function renderAttractionDetails() {
    const res = await axios.get(`/api/partner/products/tags/`, {
      headers: {
        "exp-api-key": import.meta.env.VITE_ACCESS_KEY,
        "Content-Type": "application/json",
        "Accept-Language": "en-US",
        Accept: "application/json;version=2.0",
      },
    });

    if (res.status === 200) {
      // console.log(res);
      // return response.data || { data: [] };
      setAllTags(res?.data?.tags);
      res?.data?.tags
        ?.filter((tagID) => tagID.tagId === 21913)
        .map((tag) => {
          console.log(tag);
        });
    } else {
      // throw new Error("Request failed with status:", response.status);
    }
  }

  renderAttractionDetails();

  // console.log(tours);

  return (
    <div className="tours">
      <div className="wrapper">
        <ol>
          {allTags
            // ?.filter((parentTag) => parentTag?.parentTagIds?.length > 3)
            ?.map((tag) => (
              <li>
                {tag?.allNamesByLocale?.en}:{" "}
                {tag?.parentTagIds?.map((pTag) => `${pTag}, `)}
              </li>
            ))}
        </ol>
        <div className="tours-list">
          {tours === "Loading" ? (
            <>
              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>

              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>

              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>

              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>

              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>

              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>

              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>

              <div className="tour loading">
                <div className="image"></div>

                <div className="content">
                  <h3></h3>
                </div>
              </div>
            </>
          ) : tours?.length ? (
            tours?.map((tour) => (
              <div
                className="tour"
                key={tour.sortOrder}
                // onClick={() => renderAttractionDetails(tour.destinationId)}
              >
                <div className="image">
                  <LazyImage
                    imageLow={tour.thumbnailURL}
                    imageHigh={tour.thumbnailHiResURL}
                    alt="Your Image Alt Text"
                    height={10}
                  />
                </div>

                <div className="content">
                  <h3>{tour.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <h1>No Data Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};
