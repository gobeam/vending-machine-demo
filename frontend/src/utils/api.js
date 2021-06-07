const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URI}`;

export default class ApiEndpoint {
  getBasePath = () => `${API_BASE_URL}`;

  makeApiPayload = (method, payload = null, contentType = null) => {
    const jsonPayload = {
      method,
      headers: {},
    };
    if (!contentType) {
      jsonPayload.headers.Accept = "application/json";
      jsonPayload.headers["Content-Type"] = "application/json";
    }
    if (payload !== null) {
      jsonPayload.body = contentType ? payload : JSON.stringify(payload);
    }
    return jsonPayload;
  };
}
