function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      if (response.status === 404) throw new Error('error');
      return response.json();
    })
    .catch(error => {
      console.log(error);
      return [];
    });
}

export { fetchCountries };
