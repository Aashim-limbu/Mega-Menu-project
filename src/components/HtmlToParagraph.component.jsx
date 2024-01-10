/* eslint-disable react/prop-types */
import { useState } from "react";

const HtmlToParagraphs = ({ data, length, readMore }) => {
  const [paragraphLength, setParagraphLength] = useState(false);

  const convertToParagraphs = (content) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(content, "text/html");
    const plainText = parsedHtml.body.textContent;

    const para = plainText.replace(/\s+/g, " ");

    const truncatedText =
      content.length > length
        ? paragraphLength
          ? para
          : `${para.slice(0, length)}...`
        : para;

    return truncatedText !== "null" ? truncatedText : "No Description🙁";
  };

  return (
    <p className="desc">
      {convertToParagraphs(data)}
      <br />
      {readMore ? (
        <span
          className="read-more"
          onClick={() => setParagraphLength(!paragraphLength)}
        >
          {paragraphLength ? "Read Less" : "Read More"}
        </span>
      ) : null}
    </p>
  );
};

export default HtmlToParagraphs;
