import { useContext } from "react";

import { viewportContext } from "../helpers/WindowContext";

export const useViewPort = () => {
  const { width, height } = useContext(viewportContext);

  return { width, height };
};