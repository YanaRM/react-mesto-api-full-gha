export const apiData = {
    baseUrl: 'https://api.yanarm.nomoredomainsmonster.ru',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  }