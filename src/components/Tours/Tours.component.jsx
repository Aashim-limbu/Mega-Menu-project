import React, { useEffect, useState } from "react";
import LazyImage from "../ImageLazyLoading.component";
import axios from "axios";
import HtmlToParagraphs from "../HtmlToParagraph.component";

export const ToursComponent = ({ tours, allProducts }) => {
  // console.log("allProducts: ", allProducts);

  return (
    <div className="tours">
      <div className="wrapper">
        <div className="tours-list">
          {allProducts === "Loading" ? (
            <>
              <div className="item loading">
                <div className="image"></div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name"></h3>
                    </div>

                    <div className="price">
                      <div className="from"></div>
                      <h4 className=""></h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="item loading">
                <div className="image"></div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name"></h3>
                    </div>

                    <div className="price">
                      <div className="from"></div>
                      <h4 className=""></h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="item loading">
                <div className="image"></div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name"></h3>
                    </div>

                    <div className="price">
                      <div className="from"></div>
                      <h4 className=""></h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="item loading">
                <div className="image"></div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name"></h3>
                    </div>

                    <div className="price">
                      <div className="from"></div>
                      <h4 className=""></h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="item loading">
                <div className="image"></div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name"></h3>
                    </div>

                    <div className="price">
                      <div className="from"></div>
                      <h4 className=""></h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="item loading">
                <div className="image"></div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name"></h3>
                    </div>

                    <div className="price">
                      <div className="from"></div>
                      <h4 className=""></h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="item loading">
                <div className="image"></div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name"></h3>
                    </div>

                    <div className="price">
                      <div className="from"></div>
                      <h4 className=""></h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : allProducts?.length ? (
            allProducts?.map((tour) => (
              <div className="item" key={tour.sortOrder}>
                <div className="image">
                  {/* <div className="featured">{tour.primaryDestinationName}</div> */}

                  {/* <button className="wishlist">
                    <i className="far fa-heart"></i>
                  </button> */}

                  <LazyImage
                    imageLow={tour.thumbnailURL}
                    imageHigh={tour.thumbnailHiResURL}
                    alt="Your Image Alt Text"
                    height={10}
                  />
                </div>

                <div className="content">
                  <div className="rot-info">
                    <div className="rot-name">
                      <h3 className="name" title={tour.title}>
                        {tour.title}
                      </h3>
                    </div>

                    <div className="price">
                      <span> from</span>
                      <h4 className="">{tour.priceFormatted}</h4>
                    </div>
                  </div>

                  <div className="item-contact-info">
                    <HtmlToParagraphs
                      data={tour?.shortDescription}
                      length={300}
                    />
                  </div>

                  <div className="item-footer">
                    <ul>
                      <li>
                        <i className="far fa-map"></i>
                        {tour.primaryDestinationName}
                      </li>
                      <li>
                        <i className="far fa-clock"></i> {tour.duration}
                      </li>
                    </ul>
                  </div>
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
