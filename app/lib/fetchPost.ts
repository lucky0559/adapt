export const fetchPost = async (endpoint: string, payload: any) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  return data;
};
