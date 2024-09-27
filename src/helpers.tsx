export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const isValidName = (value: string) => {
  return String(value)
  .toLowerCase()
  .match(
    /^[a-zA-Z]+( [a-zA-Z]+)+$/
  );
}

export const isValidEmail = (value: string) => {
  return String(value)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export const isValidPhone = (value: string) => {
  var regex = new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/); 
  return regex.test(value);
} 

export const PhoneMask = (value: string) => {
  let santizedValue = value
    .replace('(', '')
    .replace(')', '')
    .replace(" ", "")
    .replace("-", "");

  console.log(santizedValue.length)

  if ((santizedValue.length >= 2) && (santizedValue.length < 6)) {
    console.log(">= 2")
    return `(${santizedValue.slice(0,2)}) ${santizedValue.slice(2,11)}`

  } else if (santizedValue.length >= 6 && (santizedValue.length < 11)) {
    return `(${santizedValue.slice(0,2)}) ${santizedValue.slice(2,6)}-${santizedValue.slice(6,11)}`

  } else if (santizedValue.length >= 11) {
    return `(${santizedValue.slice(0,2)}) ${santizedValue.slice(2,7)}-${santizedValue.slice(7,11)}`
  }
  return santizedValue;
}
