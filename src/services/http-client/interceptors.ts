import { RequestInterceptor, ResponseInterceptor } from "./http-client";

// Interceptor de autenticação (exemplo, precisa ser adaptado para integração real)
export const authInterceptor: RequestInterceptor = async (input, init) => {
  // Exemplo: adicionar token se existir (ajuste para integração real)
  const token = undefined; // Buscar token do contexto/auth
  if (token) {
    const headers = {
      ...init.headers,
      'Authorization': `Bearer ${token}`,
    };
    return [input, { ...init, headers }];
  }
  return [input, init];
};

// Interceptor de log de resposta
export const responseLogger: ResponseInterceptor = async (response) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Response]: ${response.status} ${response.url}`);
  }
  return response;
};

// Interceptor de log de request
export const requestLogger: RequestInterceptor = async (input, init) => {
  if (process.env.NODE_ENV === 'development') {
    const { method } = init;
    let curlCommand = `curl -X ${method?.toUpperCase() || '--'} '${input}'`;
    if (init.headers) {
      Object.entries(init.headers).forEach(([key, value]) => {
        curlCommand += ` \\\n  -H '${key}: ${value}'`;
      });
    }
    if (init.body) {
      try {
        const bodyData = JSON.parse(init.body as string);
        curlCommand += ` \\\n  -d '${JSON.stringify(bodyData)}'`;
      } catch {
        curlCommand += ` \\\n  -d '${init.body}'`;
      }
    }
    console.log('Curl Command:', curlCommand);
  }
  return [input, init];
}; 