export function validatePassword(text) {
    let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return reg.test(text) === true;
  }
  export function validateEmail(text) {
    let reg = /^\w+([\+.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text) === true;
  };
  