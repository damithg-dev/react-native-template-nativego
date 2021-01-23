import React from "react";
import moment from "moment";



export function currencyFormat(value, decimals = 2, currency = "LKR ") {
  value = value != null ? value : 0.0;
  const nValue = typeof value == "string" ? parseFloat(value.replace(",", "")) : value;
  const tempNum = nValue;
  const formatted = tempNum
    .toFixed(decimals)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return currency + formatted;
}

export function decimalFormat(value) {
  return value > 9 ? value : "0" + value;
}

export function dateFormat(date, formatType = "DD/MM/YYYY") {
  return moment(date).format(formatType);
}
