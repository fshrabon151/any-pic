import React, { useState } from "react";

const ImageGrid = ({ images }) => {
  const [noOfElements, setNoOfElement] = useState(20);
  const slice = images.slice(0, noOfElements);
  const loadMore = () => {
    setNoOfElement(noOfElements + noOfElements);
  };
  return (
    <div className="container mb-5">
      <div className="text-center pb-5">
        <h1>Matches images</h1>
      </div>
      <div className="image-grid row shadow rounded p-4 g-4 justify-content-center align-items-center">
        {slice.map((image) => (
          <a
            rel="noreferrer"
            target="_blank"
            href={image.src.large2x}
            key={image.id}
            className="col-sm-6 col-md-4 col-lg-3"
          >
            <img src={image.src.medium} alt="" className="img-fluid" />
          </a>
        ))}
      </div>

      <div className="d-flex justify-content-center py-4 mt-4">
        <button
          disabled={images.length === slice.length}
          className="text-center btn btn-dark"
          onClick={loadMore}
        >
          Show More
        </button>
      </div>

      <p className="text-end">
        Showing {`${images.length} of ${slice.length}`} images
      </p>
    </div>
  );
};

export default ImageGrid;
