import React, { createContext, useState, useEffect } from "react";

const viewportContext = createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState(window.screen.width);
  const [height, setHeight] = useState(window.screen.height);

  const handleWindowResize = () => {
    setWidth(window.screen.width);
    setHeight(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

export { viewportContext, ViewportProvider };
