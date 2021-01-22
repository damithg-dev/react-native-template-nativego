import React from "react";
import Config from "react-native-config";

export const BASE_URL_DEV = "";
export const BASE_URL_UAT = "";
export const BASE_URL_QA = "";
export const BASE_URL_LIVE = "";

/**
 * get relevant environment base url
 * to change environment got .env and change according to. 
 */
export const getBaseUrl = () => {
  switch (Config.ENVIRONMENT) {
    case "DEV":
      return BASE_URL_DEV;
    case "QA":
      return BASE_URL_QA;
    case "UAT":
      return BASE_URL_UAT;
    case "LIVE":
      return BASE_URL_LIVE;
  }
};

/**
 * export your api endpoint from here sample export shown in bellow
 * export const SAMPLE = () => `${getBaseUrl()}`;
 */
