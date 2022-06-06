export const getCookie = (name) => {
  const doc = document.cookie;
  const prefix = name + "=";
  let newToken = null;

  if (doc.split("; ").length > 0) {
    doc.split("; ").some((item) => {
      if (item.includes(prefix)) {
        newToken = item;
      }
    });
  }

  if (newToken !== null) {
    return newToken.split(prefix)[1];
  } else {
    return newToken;
  }
};