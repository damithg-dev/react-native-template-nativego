import React, {createRef} from 'react';

export const navigationRef = createRef();
export const isReadyRef = createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
}

export function goBack() {
  navigationRef.current?.goBack();
}
