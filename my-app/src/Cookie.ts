export const getCookie = (name: string) => {
  let value = '; ' + document.cookie;
  let parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  console.log('getcookie!!');
};

export const setCookie = (name: string, value: string, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  console.log('setcookie!!');
};

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  console.log('deletecookie!!');
};

