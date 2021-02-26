export class ClientNetworkError extends Error {
  status: number;
  statusText: string;

  constructor(res: Response) {
    super(res.statusText);
    this.status = res.status;
    this.statusText = res.statusText;
  }
}

interface PostOptions {
  fetchOptions?: RequestInit;
  requestOptions?: {
    /** return full response or just json payload, default false */
    full?: boolean;
  };
}

export default class ClientNetwork {
  static async post<T>(url: string, body: T, options: PostOptions = {}): Promise<Response> {
    const { fetchOptions, requestOptions } = options;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body === null || body === undefined ? null : JSON.stringify(body),
      ...fetchOptions,
    });

    if (res.ok) {
      return requestOptions?.full ? res : await res.json();
    }

    throw new ClientNetworkError(res);
  }
}
