export const isEmpty = (value: string): boolean => {
  return !value && value.trim() === "";
};

export const isEmail = (email: string): boolean => {
  return !isEmpty(email) && email.includes("@");
};

export const checkPassword = (password: string): boolean => {
  return !isEmpty(password) && password.trim().length >= 6;
};

export const userDetailsAreValid = (
  email: string,
  password: string,
  street: string,
  postal: number,
  city: string
) => {
  return (
    isEmail(email) &&
    checkPassword(password) &&
    !isEmpty(street) &&
    !(postal === 5) &&
    !isEmpty(city)
  );
};

export const emailIsConfirmed = (email: string, confirmEmail: string) => {
  return email === confirmEmail
}