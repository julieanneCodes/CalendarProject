export const url = 'http://127.0.0.1:8000';
export const noFound = 'No results found :(';
const errorHandler = (response) => {
  if (!response.ok) {
    return { error: response.statusText, errorCode: response.status };
  }
  return response.json();
};

export const commonFetch = async (url, options) => {
  return fetch(url, options)
    .then(errorHandler)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return { error };
    });
};
