type Response<T> = {
  data: T;
  error: Error;
  status: number;
  timestamp: string;
};

type Error = {
  message: string;
};

async function Post<T>(
  endPoint: string,
  payload: object,
): Promise<Response<T>> {
  const headers = {
    "Content-type": "application/json",
  };

  const body = JSON.stringify(payload);
  const requestOptions = {
    method: "POST",
    headers,
    body,
  };
  const res = await fetch(endPoint, requestOptions);
  const data = await res.json();
  return data;
}

export { Post };
