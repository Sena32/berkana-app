import { HttpClient } from "./http-client";

export class HttpService {
  constructor(private client: HttpClient) {}

  get<T>(path: string, queryParams?: Record<string, any>, headers: Record<string, string> = {}, baseUrlOverride?: string): Promise<{ data: T, headers: Headers }> {
    const queryString = queryParams ? '?' + new URLSearchParams(queryParams as Record<string, string>).toString() : '';
    return this.client.request<T>(path + queryString, { method: 'GET', headers }, baseUrlOverride);
  }

  post<T>(url: string, body: any, headers: Record<string, string> = {}, baseUrlOverride?: string): Promise<{ data: T, headers: Headers }> {
    return this.client.request<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    }, baseUrlOverride);
  }

  put<T>(url: string, body: any, headers: Record<string, string> = {}, baseUrlOverride?: string): Promise<{ data: T, headers: Headers }> {
    return this.client.request<T>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    }, baseUrlOverride);
  }

  delete<T>(url: string, headers: Record<string, string> = {}, baseUrlOverride?: string): Promise<{ data: T, headers: Headers }> {
    return this.client.request<T>(url, { method: 'DELETE', headers }, baseUrlOverride);
  }

  patch<T>(url: string, body: any, headers: Record<string, string> = {}, baseUrlOverride?: string): Promise<{ data: T, headers: Headers }> {
    return this.client.request<T>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    }, baseUrlOverride);
  }
} 