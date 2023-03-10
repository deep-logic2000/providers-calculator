import React from "react";
import Slider from "rc-slider";
import { useSelector, useDispatch } from "react-redux";
import { useViewPort } from "../../hooks/useViewPort";

import {
  setStorageValue,
  setTransferValue,
} from "../../store/actionCreators/priceAC";

import "rc-slider/assets/index.css";
import "./SlidersSection.scss";

const SliderComponent = () => {
  const dispatch = useDispatch();
  const storageValue = useSelector(({ price }) => price.storageValue);
  const transferValue = useSelector(({ price }) => price.transferValue);
  const { width } = useViewPort();
  const isMobile = width <= 768;

  const onSliderStorageChange = (value) => {
    dispatch(setStorageValue(value));
  };
  const onSliderTransferChange = (value) => {
    dispatch(setTransferValue(value));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: isMobile ? "60%" : "",
        margin: isMobile ? "20px auto" : "",
        gap: isMobile ? "0px" : "50px",
        justifyContent: "space-between",
        marginBottom: isMobile ? "20px" : "30px",
      }}
    >
      <div style={{ minWidth: "40%" }}>
        <p className="slider__title">Storage: {storageValue}</p>
        <Slider
          value={storageValue}
          allowCross={false}
          min={0}
          max={1000}
          step={1}
          onChange={onSliderStorageChange}
          defaultValue={70}
        />
        <div className="edgeValues__wrapper">
          <p>0</p>
          <p>1000</p>
        </div>
      </div>
      <div className="sliderWrapper" style={{ minWidth: "40%" }}>
        <p className="slider__title">Transfer: {transferValue}</p>
        <Slider
          value={transferValue}
          allowCross={false}
          min={0}
          max={1000}
          step={1}
          onChange={onSliderTransferChange}
          defaultValue={70}
        />
        <div className="edgeValues__wrapper">
          <p>0</p>
          <p>1000</p>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
