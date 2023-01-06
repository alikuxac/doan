import axios from 'axios';
import { format } from 'date-fns';
export default class JwtService {
  jwtConfig = { tokenType: "Bearer", auth: "auth/", baseUrl: 'https://doan-production.up.railway.app/', };

  constructor(jwtOverrideConfig: any) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // Request interceptor
    axios.interceptors.request.use(
      (config: any) => {
        config.baseURL = this.jwtConfig.baseUrl;
        // config.port = 5000;
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${token}`;
        }

        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axios.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];

          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  login(email: string, password: string) {
    return axios.post(`${this.jwtConfig.auth}login`, {
      email,
      password,
    });
  }

  logout() {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
  }

  register(email: string, password: string, fullname: string, phone: string) {
    return axios.post(`${this.jwtConfig.auth}register`, {
      email,
      password,
      fullname,
      phone,
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUserStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  countByType() {
    return axios.get(`/hotel/countByType`);
  }

  getHotels() {
    return axios.get('/hotel')
  }

  getRandomImage() {
    return axios.get('/hotel/randomPhoto');
  }

  getBookingById(id: string) {
    return axios.get(`/reservation/${id}`)
  }

  getAvailableRoom(id: number, checkIn: Date, checkOut: Date) {
    return axios.get(`/hotel/${id}/availableroom?checkIn=${format(checkIn, 'MM/dd/yyyy')}&checkOut=${format(checkOut, 'MM/dd/yyyy')}`)
  }
}