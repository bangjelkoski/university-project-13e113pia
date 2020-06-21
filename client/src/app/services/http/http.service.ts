import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Injectable, ErrorHandler } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;

    this.axiosClient = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 3000,
      headers: {
        'X-Initialized-At': Date.now().toString(),
      },
    });
  }

  async get(endpoint, params = {}) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'get',
        url: endpoint,
        params,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async post(endpoint, params = {}) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'post',
        url: endpoint,
        data: params,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async patch(endpoint, params = {}) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'patch',
        url: endpoint,
        data: params,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async delete(endpoint, params = {}) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'delete',
        url: endpoint,
        data: params,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
}
