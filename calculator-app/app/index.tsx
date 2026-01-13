import CalculatorButton from "@/components/CalculatorButton";
import ThemeText from "@/components/ThemeText";
import { Colors } from "@/constants/theme";
import { useCalculator } from "@/hooks/useCalculator";
import { globalStyles } from "@/styles/globasl-styles";
import React from "react";
import { View } from "react-native";

const CalculatorApp = () => {
  const {
    formula,
    buildNumber,
    prevNumber,
    reset,
    toggleSign,
    deleteLast,
    divideOperation,
    addOperation,
    multyplyOperation,
    substractOperation,
    calulateSubResult,
    calculateResult
  } = useCalculator();

  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
        <ThemeText variant="h1" numberOfLines={1} adjustsFontSizeToFit>
          {formula}
        </ThemeText>
        <ThemeText numberOfLines={1} adjustsFontSizeToFit variant="h2">
          {formula === prevNumber ? (
            <ThemeText variant="h2"> </ThemeText>
          ) : (
            <ThemeText variant="h2">{prevNumber}</ThemeText>
          )}
        </ThemeText>
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          onPress={reset}
          color={Colors.lightGray}
          blackText
          label="C"
        />
        <CalculatorButton
          onPress={toggleSign}
          color={Colors.lightGray}
          blackText
          label="+/-"
        />
        <CalculatorButton
          blackText
          onPress={deleteLast}
          color={Colors.lightGray}
          label="del"
        />
        <CalculatorButton
          onPress={divideOperation}
          color={Colors.orange}
          label="÷"
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="7"
          onPress={() => buildNumber("7")}
        />
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="8"
          onPress={() => buildNumber("8")}
        />
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="9"
          onPress={() => buildNumber("9")}
        />
        <CalculatorButton
          onPress={multyplyOperation}
          color={Colors.orange}
          label="x"
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="4"
          onPress={() => buildNumber("4")}
        />
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="5"
          onPress={() => buildNumber("5")}
        />
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="6"
          onPress={() => buildNumber("6")}
        />
        <CalculatorButton
          onPress={substractOperation}
          color={Colors.orange}
          label="-"
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="1"
          onPress={() => buildNumber("1")}
        />
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="2"
          onPress={() => buildNumber("2")}
        />
        <CalculatorButton
          color={Colors.lightGray}
          blackText
          label="3"
          onPress={() => buildNumber("3")}
        />
        <CalculatorButton
          onPress={addOperation}
          color={Colors.orange}
          label="+"
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          doubleSize
          onPress={() => buildNumber("0")}
          color={Colors.lightGray}
          blackText
          label="0"
        />
        <CalculatorButton
          onPress={() => buildNumber(".")}
          color={Colors.lightGray}
          blackText
          label="."
        />
        <CalculatorButton
          onPress={calculateResult}
          color={Colors.orange}
          label="="
        />
      </View>
    </View>
  );
};

export default CalculatorApp;
