import React from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("window");
import {fonts , colors } from '../../styles'

export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: colors.mainBackgroundColor,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "600",
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: "400",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    buttonContainer:{
      marginTop: 10,
      marginBottom: 10,
      flex: 1
    },
    confirmButton:{
      marginTop: 10,
      marginBottom: 10
    }
  });