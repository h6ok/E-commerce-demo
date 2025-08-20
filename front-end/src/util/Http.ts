type Response = {
  data: object;
  error: object;
  status: number;
  timestamp: string;
};

async function Post(endPoint: string, payload: object): Promise<Response> {
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
