import React, { useMemo, useState, useRef } from "react";
import styles from "./Calculator.less";

const Calculator = () => {
  const btns = useMemo(
    () => [
      "C",
      "DEL",
      "÷",
      "x",
      "7",
      "8",
      "9",
      "-",
      "4",
      "5",
      "6",
      "+",
      "1",
      "2",
      "3",
      "=",
      "0",
      ".",
    ],
    []
  ); // 所有可点击的按钮
  const [content, setContent] = useState(""); // 计算内容
  const [result, setResult] = useState("0"); // 计算结果
  const lastClick = useRef(""); // 上一次点击的按钮

  // 根据数组计算结果
  const calResult = (jisuanArr: Array<string>, arr: Array<string>) => {
    const num1 = Number(jisuanArr[0]);
    const num2 = Number(jisuanArr[2]);
    const symbol = jisuanArr[1];
    let result = "";
    symbol === "-" && (result += num1 - num2);
    symbol === "+" && (result += num1 + num2);
    symbol === "x" && (result += num1 * num2);
    symbol === "÷" && (result += num1 / num2);
    if (arr.length > 0) {
      const jiArr = [result].concat(arr.splice(0, 2));
      result = calResult(jiArr, arr);
    }
    return result;
  };
  // 根据字符串计算出结果
  const calculateByStr = (str: string): string => {
    const arr = str.split(" ");
    if (arr.length === 1) {
      return arr[0];
    }
    if (arr.length > 1) {
      const jisuanArr = arr.splice(0, 3);
      const result = calResult(jisuanArr, arr);
      return result;
    }
    return "0";
  };

  // 点击操作按钮
  const handleClick = (val: string) => {
    let tempContent = "";
    switch (val) {
      case "C":
        setContent("");
        setResult("0");
        lastClick.current = "C";
        break;
      case "DEL":
        if (!["C", "÷", "x", "-", "+"].includes(lastClick.current)) {
          const operResult = result.split(",").join("").slice(0, -1);
          setResult(operResult || "0");
          lastClick.current = val;
        }
        break;
      case "÷":
      case "x":
      case "-":
      case "+":
        tempContent = content;
        if (lastClick.current === "C") {
          tempContent += `0 ${val} `;
        } else if (["÷", "x", "-", "+"].includes(lastClick.current)) {
          tempContent = tempContent.slice(0, -3) + ` ${val} `;
        } else {
          const str =
            result[result.length - 1] === "." ? result.slice(0, -1) : result;
          const resultStr = tempContent + str;
          const tempResult = calculateByStr(resultStr);
          setResult(tempResult);
          tempContent += `${str} ${val} `;
        }
        setContent(tempContent);
        lastClick.current = val;
        break;
      case ".":
        if (!result.includes(".")) {
          if (["C", "÷", "x", "-", "+", "="].includes(lastClick.current)) {
            setResult("0.");
          } else {
            setResult(`${result}.`);
          }
          lastClick.current = val;
        }
        break;
      case "=":
        tempContent = content;
        const str =
          result[result.length - 1] === "." ? result.slice(0, -1) : result;
        const resultStr = tempContent + str;
        setResult(calculateByStr(resultStr));
        setContent("");
        lastClick.current = val;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        const tempResult =
          result === "0" ||
          ["÷", "x", "-", "+", "="].includes(lastClick.current)
            ? val
            : result + val;
        setResult(tempResult);
        lastClick.current = val;
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles["calculate-wrapper"]}>
      <div className={styles["calculate-box"]}>
        <div className={styles["calculate-header"]}>
          <div className={styles["calculate-head-content"]}>{content}</div>
          <div className={styles["calculate-head-result"]}>{result}</div>
        </div>
        <div className={styles["calcute-content"]}>
          {btns.map((item, index) => (
            <div
              key={index}
              className={`${styles["calcute-content-item"]} ${
                styles[`item-${index}`]
              }`}
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
