export const apiData = {
    baseUrl: 'http://yanarm.nomoredomainsmonster.ru',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  }