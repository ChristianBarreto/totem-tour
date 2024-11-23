export type APIError = string;


export const axiosParams = {
  headers: {
    // 'Access-Control-Allow-Origin': 'https://totem-2id4w5fuzq-uc.a.run.app/'
  }
}

export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://totem-2id4w5fuzq-uc.a.run.app'
  : 'http://127.0.0.1:5001/totem-tour/us-central1/totem'

export const websiteUrl = process.env.NODE_ENV === 'production'
  ? 'https://totem-tour.web.app'
  : 'http://localhost:3000'

console.log(process.env.NODE_ENV, baseUrl)