export const phone_number_reg = /^(9|8|7)\d{9}$/;
export const national_code_reg=/^((?!(0))[0-9]{6,6})$/;
export const email_reg=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
export const otp_reg = /^\d{6}$/;