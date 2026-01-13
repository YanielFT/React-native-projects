import { useEffect, useRef, useState } from "react";

enum Operator {
  add = "+",
  subtract = "-",
  multiply = "*",
  divide = "/",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState("0");
  const [number, setNumber] = useState("0");
  const [prevNumber, setPrevNumber] = useState("0");
  const lastOperation = useRef<Operator | undefined>(undefined);

  useEffect(() => {
    //Todo: Calcular subResultado
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ").at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calulateSubResult();
    setPrevNumber(String(subResult));
  }, [formula]);

  const reset = () => {
    setFormula("");
    setNumber("0");
    setPrevNumber("0");

    lastOperation.current = undefined;
  };

  const toggleSign = () => {
    if (number.includes("-")) {
      return setNumber(number.replace("-", ""));
    } else return setNumber("-" + number);
  };

  const deleteLast = () => {
    if (number.startsWith("-") && number.length === 2) {
      setNumber("0");
    } else if (number.length === 1) {
      setNumber("0");
    } else setNumber(number.slice(0, -1));
  };

  const setLastNumber = () => {
    if (number.endsWith(".")) {
      setPrevNumber(number.slice(0, -1));
    }
    setPrevNumber(number);
    setNumber("0");
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multyplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const calulateSubResult = () => {
    const [firstValue, operation, secondValue] = formula.split(" ");
    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        return num1 / num2;

      default:
        throw new Error(`Operation ${operation} not implemented`);
    }
  };
  const calculateResult = () => {
    const result = calulateSubResult();
    setFormula(String(result));

    lastOperation.current = undefined;
    setPrevNumber("0");
  };

  const buildNumber = (numberString: string) => {
    if (number.includes(".") && numberString === ".") return;
    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") return setNumber(number + numberString);
      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }
      if (numberString == "0" && !number.includes(".")) {
        return;
      }
    }
    setNumber(number + numberString);
  };

  return {
    formula,
    number,
    prevNumber,

    buildNumber,
    reset,
    toggleSign,
    deleteLast,
    divideOperation,
    multyplyOperation,
    addOperation,
    substractOperation,
    calulateSubResult,
    calculateResult,
  };
};
