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
        height: isMobile ? "290px" : "",
      }}
    >
      <div
        className={styles.lineDataWrapper}
      >
        <div style={{justifySelf: "end"}}>
          <div className={styles.companyTitle}>{name}</div>
          <div className={styles.optionsWrapper}>
            {options &&
              options.map((option) => (
                <div key={option.name} className={styles.radioWrapper}>
                  <input
                    type="radio"
                    value={option.name}
                    name={name}
                    onChange={(e) => handleChangeOption(e, id, option.name)}
                    checked={option.isActive === true}
                  />{" "}
                  <div className={styles.optionName}>{option.name}</div>
                </div>
              ))}
          </div>
        </div>
        <img src={logo} alt={name} className={styles.companyLogo} />
      </div>
      <div
        style={{
          height: isMobile ? `${priceValue * 2.5}px` : "25px",
          width: isMobile ? "70%" : `${priceValue * 4}px`,
          backgroundColor: isMinimal ? `${color}` : "lightGray",
          borderRadius: isMobile ? "3px 3px 0 0" : "0 3px 3px 0",
          boxShadow: isMobile ? "5px 5px 5px 0 rgba(0, 0, 0, 0.5)" : "0px 5px 5px 0px rgba(0, 0, 0, 0.5)",
        }}
      ></div>
      <span className={styles.priceValue}>{priceValue}</span>
    </div>
  );
};

export default ChartLine;
