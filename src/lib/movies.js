class Movies {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async configuration(key) {
    if (!this._configuration) {
      this._configuration = await this.fetch('configuration')
      console.log(this._configuration)
    }
    return this._configuration[key]
  }

  async search(title) {
    const configuration = await this.configuration('images')
    const data = await this.fetch('search/movie', { page: 1, query: title })
    return data.results.map(({ id, title, poster_path, release_date }) => ({
      id,
      title,
      year: parseInt(release_date.substring(0, 4), 10),
      image: `${configuration.base_url}w300${poster_path}`
    }))
  }

  async fetch(action, parameters = {}) {
    return fetch(this.url(action, parameters)).then(response => response.json())
  }

  url(action, parameters = {}) {
    var url = `https://api.themoviedb.org/3/${action}?language=en-US` +
      `&api_key=${this.apiKey}`
    for (var key in parameters) {
      url += `&${key}=${encodeURIComponent(parameters[key])}`
    }
    return url
  }
}

export default (new Movies(process.env.REACT_APP_TMDB_KEY))
