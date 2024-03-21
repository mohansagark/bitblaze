export const fetchStore = (key) => {
  if (!key) return null;
  return sessionStorage.getItem(key);
};

export const persistData = (key, value) => {
  if (key && value) sessionStorage.setItem(key, value);
  return null;
};

export const changeTheme = (theme) => {
  document.querySelector("html")?.setAttribute("data-theme", theme);
};
