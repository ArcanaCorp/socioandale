export const isValidPhone = (value) => {
    return /^9\d{8}$/.test(value);
}