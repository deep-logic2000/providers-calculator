import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCompaniesData,
  setSelectedOption,
} from "../../store/actionCreators/priceAC";

import { useViewPort } from "../../hooks/useViewPort";

import ChartLine from "../../components/ChartLine/ChartLine";
import backblazeLogo from "../../assets/images/backblaze_logo.png";
import bunnyLogo from "../../assets/images/bunny-logo.png";
import scalewayLogo from "../../assets/images/scaleway-logo.png";
import vultrLogo from "../../assets/images/vultr-logo.png";

import styles from "./ChartContainer.module.scss";

const linesData = [
  {
    id: "1",
    name: "backblaze",
    minPriceValue: 7,
    maxPriceValue: null,
    options: null,
    priceStorage: 0.005,
    priceTransfer: 0.01,
    storageCapacityFree: 0,
    transferCapacityFree: 0,
    logo: backblazeLogo,
    color: "#FF0000",
  },
  {
    id: "2",
    name: "bunny",
    minPriceValue: null,
    maxPriceValue: 10,
    options: [
      { name: "hdd", isActive: true },
      { name: "ssd", isActive: false },
    ],
    priceStorage: { hdd: 0.01, ssd: 0.02 },
    priceTransfer: { hdd: 0.01, ssd: 0.01 },
    storageCapacityFree: { hdd: 0, ssd: 0 },
    transferCapacityFree: { hdd: 0, ssd: 0 },
    logo: bunnyLogo,
    color: "#ff7300",
  },
  {
    id: "3",
    name: "scaleway",
    minPriceValue: null,
    maxPriceValue: null,
    options: [
      { name: "multi", isActive: true },
      { name: "single", isActive: false },
    ],
    priceStorage: { multi: 0.06, single: 0.03 },
    priceTransfer: { multi: 0.02, single: 0.02 },
    storageCapacityFree: { multi: 75, single: 75 },
    transferCapacityFree: { multi: 75, single: 75 },
    logo: scalewayLogo,
    color: "#6200ff",
  },
  {
    id: "4",
    name: "vultr",
    minPriceValue: 5,
    maxPriceValue: null,
    options: null,
    priceStorage: 0.01,
    priceTransfer: 0.01,
    storageCapacityFree: 0,
    transferCapacityFree: 0,
    logo: vultrLogo,
    color: "#001aff",
  },
];

const ChartContainer = () => {
  const [activeOptionName, setActiveOptionName] = useState("");
  const storageValue = useSelector(({ price }) => price.storageValue);
  const transferValue = useSelector(({ price }) => price.transferValue);
  const companiesData = useSelector(({ price }) => price.companiesData);
  const dispatch = useDispatch();
  const { width } = useViewPort();

  useEffect(() => {
    dispatch(setCompaniesData(linesData));
  }, [dispatch]);

  const getLine = (id) => {
    return linesData.find((line) => line.id === id);
  };

  const onChangeOptionName = useCallback(
    (event, id, nameOfOption) => {
      setActiveOptionName(event.target.value);
      dispatch(setSelectedOption(id, nameOfOption, event.target.value));
    },
    [dispatch]
  );

  const getPriceValueByOption = (id, optionName) => {
    const line = getLine(id);
    const totalStorage =
      storageValue - line.storageCapacityFree[optionName] < 0
        ? 0
        : storageValue - line.storageCapacityFree[optionName];
    const totalTransfer =
      transferValue - line.transferCapacityFree[optionName] < 0
        ? 0
        : transferValue - line.transferCapacityFree[optionName];
    const finalPrice =
      totalStorage * line.priceStorage[optionName] +
      totalTransfer * line.priceTransfer[optionName];
    if (line.maxPriceValue && finalPrice > line.maxPriceValue) {
      return line.maxPriceValue;
    }
    if (line.minPriceValue && finalPrice < line.minPriceValue) {
      return line.minPriceValue;
    }
    return finalPrice;
  };

  const getPriceValueByLine = (id) => {
    const line = getLine(id);
    const totalStorage =
      storageValue - line.storageCapacityFree < 0
        ? 0
        : storageValue - line.storageCapacityFree;
    const totalTransfer =
      transferValue - line.transferCapacityFree < 0
        ? 0
        : transferValue - line.transferCapacityFree;
    const finalPrice =
      totalStorage * line.priceStorage + totalTransfer * line.priceTransfer;
    if (line.maxPriceValue && finalPrice > line.maxPriceValue) {
      return line.maxPriceValue;
    }
    if (line.minPriceValue && finalPrice < line.minPriceValue) {
      return line.minPriceValue;
    }
    return finalPrice;
  };

  const getPriceValue = (id, optionsArr) => {
    if (optionsArr) {
      const activeOptionName = optionsArr.find(
        (option) => option.isActive
      ).name;
      return getPriceValueByOption(id, activeOptionName);
    } else {
      return getPriceValueByLine(id);
    }
  };

  useEffect(() => {}, [activeOptionName]);

  const checkIsMinimal = (id) => {
    const index = companiesData.findIndex((line) => line.id === id);
    const tempArr = companiesData.map((line) =>
      Number(getPriceValue(line.id, line.options).toFixed(2))
    );
    return !tempArr.some((price) => price < tempArr[index]);
  };

  return (
    <div className={styles.container}>
      {companiesData.map((line, index) => {
        const selectedOptionName = line.options?.find(
          (option) => option.isActive
        ).name;
        return (
          <div className={styles.lineWrapper} key={index}>
            <ChartLine
              {...line}
              priceValue={getPriceValue(line.id, line.options).toFixed(2)}
              isMinimal={checkIsMinimal(line.id)}
              options={line.options}
              onChangeValue={onChangeOptionName}
              selectedOptionName={selectedOptionName}
              isMobile={width <= 768}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChartContainer;
