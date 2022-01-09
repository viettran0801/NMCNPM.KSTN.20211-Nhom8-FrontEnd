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

export function parseInstantToDateTime(time) {
  const d = new Date(time);

  var datestring = "";
  if (d.getHours < 10) datestring += "0";
  datestring += d.getHours() + ":";

  if (d.getMinutes() < 10) datestring += "0";
  datestring += d.getMinutes() + "\n";
  if (d.getDate() < 10) datestring += "0";
  datestring += d.getDate() + "-";
  if (d.getMonth() < 9) datestring += "0";
  datestring += d.getMonth() + 1;
  datestring += "-" + d.getFullYear();

  return datestring;
}
