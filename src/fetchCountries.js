const BASE_URL = "https://restcountries.com/v3.1/name/";

export function fetchCountries(country) {
  return fetch(
    `${BASE_URL}${country}?fields=name,capital,population,flags,languages`
  )
    .then((response) => {
      // console.log(response);

      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
}
