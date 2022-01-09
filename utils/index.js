import axios from "axios";
import qs from "qs";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function fetchAPI(
  path,
  { method = "GET", body, token, params = {} } = {}
) {
  const authen = token ? { Authorization: `Bearer ${token}` } : {};
  const data = body ? body : {};
  const headers = {
    "Content-Type": "application/json",
    ...authen,
  };
  const res = await axios({
    method,
    url: `${baseUrl}${path}`,
    data,
    headers,
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  return res.data;
}
