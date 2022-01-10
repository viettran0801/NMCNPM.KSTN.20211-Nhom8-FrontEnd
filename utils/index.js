import axios from "axios";
import qs from "qs";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi.json";

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

export function convertTimeAgo(time) {
  TimeAgo.addLocale(vi);
  const timeAgo = new TimeAgo("vi");

  return timeAgo.format(new Date(time), "round");
}
