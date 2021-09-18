import React, { useState } from "react";
import ImageGrid from "./ImageGrid";
import Spinner from "./Spinner";

const Search = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalResults, setTotalResults] = useState(null);

  async function requestFetch() {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${search}&orientation=landscape&per_page=300`,
        {
          method: "GET",
          headers: {
            Authorization: process.env.REACT_APP_PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
      setImages(data.photos);
      setTotalResults(data.total_results);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    requestFetch();
    setSearch("");
  };

  return (
    <>
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <div className="header">
            <div className="search"></div>
            <div className="header-wrapper">
              <div className="container heading-wrapper">
                <div className="text-center text-light search-content">
                  <h1>AnyPic</h1>
                  <p className="mt-3">
                    Your trusted source for searching free pictures!
                  </p>
                </div>

                <form className="search-wrapper" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Search for pictures..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button
                    className="btn btn-light text-dark text-center fw-bold text-uppercase"
                    type="submit"
                  >
                    Search 🔍
                  </button>
                </form>
              </div>
            </div>
          </div>
          {totalResults === 0 && (
            <h1 className="mt-5 text-center text-danger">No data found 😪</h1>
          )}
          {error && (
            <h1 className="mt-5 text-center text-danger">
              Fail to fetch data 😪
            </h1>
          )}
          {images.length === 0 && (
            <div className="container my-5 text-center footer">
              <h1>Hi, I’m F Shrabon. Nice to meet you.</h1>
              <p>
                I'm a freelance Web designer and Front-end Developer, I design
                and code beautifully simple things and I love what I do. I love
                challenges and my objective is obtaining a challenging career
                with a progressive organization, where I can utilize my
                technical skills and creativity. I want to be an expert in Web
                Development. <br />
                For more details please have a look to my portfolio here {"> "}
                <span>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://fshrabon.xyz"
                    className="text-decoration-none text-primary"
                  >
                    F Shrabon
                  </a>
                </span>
              </p>
            </div>
          )}

          {images.length !== 0 && <ImageGrid images={images} />}
        </>
      )}
    </>
  );
};

export default Search;
