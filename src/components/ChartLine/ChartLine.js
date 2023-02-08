import React from "react";

import styles from "./ChartLine.module.scss";

const ChartLine = ({
  id,
  name,
  logo,
  isMinimal,
  priceValue,
  options,
  onChangeValue,
  color,
  selectedOptionName,
  isMobile,
}) => {
  const handleChangeOption = (event, id, nameOfOption) => {
    onChangeValue(event, id, nameOfOption);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: isMobile ? "" : "100%",
        flexDirection: isMobile ? "column-reverse" : "row",
        height: isMobile ? "300px" : "",
      }}
    >
      <div
        className={styles.lineDataWrapper}
      >
        <div>
          <div className={styles.companyTitle}>{name}</div>
          <div>
            {options &&
              options.map((option) => (
                <React.Fragment key={option.name}>
                  <input
                    type="radio"
                    value={option.name}
                    name={name}
                    onChange={(e) => handleChangeOption(e, id, option.name)}
                    checked={option.isActive === true}
                  />{" "}
                  <span className={styles.optionName}>{option.name}</span>
                </React.Fragment>
              ))}
          </div>
        </div>
        <img src={logo} alt={name} style={{ maxWidth: "25px" }} />
      </div>
      <div
        style={{
          height: isMobile ? `${priceValue * 2.5}px` : "25px",
          width: isMobile ? "25px" : `${priceValue * 4}px`,
          backgroundColor: isMinimal ? `${color}` : "lightGray",
        }}
      ></div>
      <span>{priceValue}</span>
    </div>
  );
};

export default ChartLine;
