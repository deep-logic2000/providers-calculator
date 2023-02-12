import { useContext } from "react";

import { viewportContext } from "../helpers/WindowContext";

export const useViewPort = () => {
  const { width, height } = useContext(viewportContext);

  console.log("width, height in useViewPort", width, height);
  return { width, height };
};