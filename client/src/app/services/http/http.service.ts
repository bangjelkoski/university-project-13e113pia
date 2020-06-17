import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Injectable, ErrorHandler } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private storageService: StorageService) {}

  get(key: string): any {
    this.storageService.get(key);
  }

  post(key: string, value: any): void {
    this.storageService.set(key, value);
  }

  delete(key: string): void {
    this.storageService.remove(key);
  }
}

/**
 * When Server is ready

export class HttpService {
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;

    this.axiosClient = axios.create({
      baseURL: '/api',
      timeout: 3000,
      headers: {
        'X-Initialized-At': Date.now().toString(),
      },
    });
  }

  async get(endpoint, params) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'get',
        url: endpoint,
        params,
      });

      return { data };
    } catch (error) {
      return Promise.reject(this.errorHandler.handleError(error));
    }
  }

  async post(endpoint, params) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'post',
        url: endpoint,
        data: params,
      });

      return { data };
    } catch (error) {
      return Promise.reject(this.errorHandler.handleError(error));
    }
  }

  async patch(endpoint, params) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'patch',
        url: endpoint,
        data: params,
      });

      return { data };
    } catch (error) {
      return Promise.reject(this.errorHandler.handleError(error));
    }
  }

  async delete(endpoint, params) {
    try {
      const { data } = await this.axiosClient.request({
        method: 'delete',
        url: endpoint,
        data: params,
      });

      return { data };
    } catch (error) {
      return Promise.reject(this.errorHandler.handleError(error));
    }
  }
}
 */
