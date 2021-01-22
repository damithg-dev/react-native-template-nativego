import React, { Component } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Url from "./Url";

// Custom API error to throw
function ApiError(message, data, status) {
  let response = null;
  let isObject = false;
  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  this.response = response;
  this.message = message;
  this.status = status;
  this.toString = function() {
    return `${this.message}\nResponse:\n${
      isObject ? JSON.stringify(this.response, null, 2) : this.response
    }`;
  };
}



// API wrapper function
export const fetchResource = async (
  path,
  userOptions = {},
  authorization = true,
  isAFile = false,
  progress = () => {}
) => {
  // Define default options
  const defaultOptions = {};
  if (global.AUTH_TOKEN == null) {
    await AsyncStorage.getItem(Constant.AUTH_TOKEN, (err, token) => {
      global.AUTH_TOKEN == token;
    });
  }

  var defaultHeaders = {};
  if (authorization) {
    defaultHeaders = {
      Authorization: "Bearer " + global.AuthToken,
      "app-version": Constant.APP_VERSION,
      "Content-Type": "application/json",
      'app_version': getReadableVersion(),
      "os_type" : Platform.OS == 'ios' ? 'ios' : 'android',
      
    };
  } else {
    defaultHeaders = {
      "app-version": Constant.APP_VERSION,
      "Content-Type": "application/json",
      'app_version': getReadableVersion(),
      "os_type" : Platform.OS == 'ios' ? 'ios' : 'android'
    };
  }
  //

  const options = {
    // Merge options
    ...defaultOptions,
    ...userOptions,
    // Merge headers
    headers: {
      ...defaultHeaders,
      ...userOptions.headers,
    },
  };

  // Build Url
  const baseUrl = isLive ? Url.BASE_URL_LIVE : Url.BASE_URL_DEV
  const url = `${baseUrl}${path}`;

  if (isAFile == false) {
    // Detect is we are uploading a file
    const isFile = options.body instanceof File;
    const isFormData = options.body instanceof FormData;

    // Stringify JSON data
    // If body is not a file
    if (options.body && typeof options.body === "object" && !isFile) {
      options.body = JSON.stringify(options.body);
    }

    // console.log(
    //   "-----------------------------------------------------------------------"
    // );
    // console.log("URL ---" + url);
    // console.log("Headers ---" + JSON.stringify(options.headers));
    // console.log("Method ---" + JSON.stringify(options.method));
    // console.log("Body ---" + JSON.stringify(options.body));
    // console.log(
    //   "-----------------------------------------------------------------------"
    // );

    // Variable which will be used for storing response
    let response = null;
    return fetch(url, options)
      .then(async (responseObject) => {
        if(responseObject.status == 403){
          await deletePushNotificationToken()
          await AsyncStorage.multiRemove([
            Constant.AUTH_TOKEN , 
            Constant.CUSTOMER_ACC_DETAIL,  
            Constant.CUSTOMER_ONBOARDING_COMPLETED,
          ]);
          RNRestart.Restart();
          return null
        } 

        return responseObject.json()
      })
      .then((parsedResponse) => {
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        // console.log("URL ---" + url);
        // console.log("Headers ---" + JSON.stringify(options.headers));
        // console.log("Method ---" + JSON.stringify(options.method));
        // console.log("Body ---" + JSON.stringify(options.body));
        // console.log("Response ---" + JSON.stringify(parsedResponse));
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        return parsedResponse;
      })
      .catch((error) => {
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        // console.log("URL ---" + url);
        // console.log("Headers ---" + JSON.stringify(options.headers));
        // console.log("Method ---" + JSON.stringify(options.method));
        // console.log("Body ---" + JSON.stringify(options.body));
        // console.log("error --- " + JSON.stringify(error));
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        if (response) {
          throw new ApiError(
            `Request failed with status ${response.status}.`,
            error,
            response.status
          );
        } else {
          throw new ApiError(error.toString(), null, "REQUEST_FAILED");
        }
      });
  } else {
    return RNFetchBlob.fetch(options.method, url, options.headers, options.body)
      .uploadProgress({ interval : 10 },(written, total) => {
        let uploadProgress = written / total;
        // console.log('fetch ****** progress *************' , uploadProgress);
        progress(uploadProgress);
      })
      .then((responseObject) => responseObject.json())
      .then((parsedResponse) => {
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        // console.log("URL ---" + url);
        // console.log("Body ---" + JSON.stringify(options));
        // console.log("response --- " + JSON.stringify(parsedResponse));
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        return parsedResponse;
      })
      .catch((error) => {
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        // console.log("URL ---" + url);
        // console.log("Body ---" + JSON.stringify(options));
        // console.log("error --- " + JSON.stringify(error));
        // console.log(
        //   "-----------------------------------------------------------------------"
        // );
        if (response) {
          throw new ApiError(
            `Request failed with status ${response.status}.`,
            error,
            response.status
          );
        } else {
          throw new ApiError(error.toString(), null, "REQUEST_FAILED");
        }
      });
  }
};
