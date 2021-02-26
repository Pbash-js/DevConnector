import React, { useState, useEffect } from "react";

const NotFound = () => {
  const [title, setTitle] = useState("");
  const fulltitle = "404 Not Found!";

  useEffect(() => {
    //   document.querySelector("body").style.overflow = "hidden";
    setTimeout(() => {
      [...fulltitle].forEach((item, index) =>
        setTimeout(() => {
          if (title === fulltitle) return 0;
          setTitle((title) => title + item);
        }, 100 * index)
      );
    }, 200);

    return () => {
      // document.querySelector("body").style.overflow = "auto";
    };
  }, []);

  return (
    window.location.pathname !== "/" && (
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">
            {title}
            <span className="animated-cursor">|</span>
          </h1>
        </div>
      </div>
    )
  );
};

export default NotFound;
