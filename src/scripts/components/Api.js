export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _apiRequest(url, method, body) {
    const requestOprions = {
      method: method,
      headers: this._headers,
    }
    if (['POST', 'PATCH', 'PUT'].includes(method)) {
      requestOprions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOprions);
    if (!response.ok) return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    const json = await response.json();
    return json;
  }

  getInitialCards() {
    return this._apiRequest(`${this._baseUrl}/cards`, 'GET');
  }

  getUserInfo() {
    return this._apiRequest(`${this._baseUrl}/users/me`, 'GET');
  }

  editUserInfo(data) {
    const body = {
      name: data.name,
      about: data.about
    };
    return this._apiRequest(`${this._baseUrl}/users/me`, 'PATCH', body);
  }

  async createCard(data) {
    const body = {
      name: data.name,
      link: data.link
    };
    return this._apiRequest(`${this._baseUrl}/cards`, 'POST', body);
  }

  deleteCard(cardId) {
    return this._apiRequest(`${this._baseUrl}/cards/${cardId}`, 'DELETE')
  }

  async sendLikeRequest(cardId, action) {
    const method = action === 'makeActive' ? 'PUT' : 'DELETE';
    return this._apiRequest(`${this._baseUrl}/cards/${cardId}/likes`, method)
  }

  async editAvatar(link) {
    const body = {avatar: link};
    return this._apiRequest(`${this._baseUrl}/users/me/avatar`, 'PATCH', body)
  }
}

