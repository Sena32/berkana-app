export type RequestInterceptor = (input: RequestInfo, init: RequestInit) => Promise<[RequestInfo, RequestInit]> | [RequestInfo, RequestInit];
export type ResponseInterceptor = (response: Response) => Promise<Response> | Response;

export class HttpClient {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(private baseUrl: string = '') {}

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  async request<T>(input: string, init: RequestInit = {}, customBaseUrl?: string): Promise<{ data: T, headers: Headers }> {
    const url = (customBaseUrl ?? this.baseUrl) + input;
    let modifiedInput: RequestInfo = url;
    let modifiedInit: RequestInit = init;

    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(modifiedInput, modifiedInit);
      modifiedInput = result[0];
      modifiedInit = result[1];
    }

    let response = await fetch(modifiedInput, modifiedInit);

    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorParser;
      try {
        errorParser = JSON.parse(errorText);
      } catch {
        errorParser = { message: errorText };
      }
      throw { status: response.status, message: errorParser.message };
    }
    const responseData = await response.json();
    return { data: responseData, headers: response.headers };
  }
} 