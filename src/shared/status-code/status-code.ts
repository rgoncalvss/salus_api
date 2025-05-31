export const statusCode = {
  /** The server could not understand the request due to invalid syntax. */
  BAD_REQUEST: 400,

  /** This response is sent when a request conflicts with the current state of the server. */
  CONFLICT: 409,

  /** The request has succeeded and a new resource has been created as a result. */
  CREATED: 201,

  /** The client does not have access rights to the content. */
  FORBIDDEN: 403,

  /** The server has encountered a situation it doesn't know how to handle. */
  INTERNAL_SERVER_ERROR: 500,

  /** There is no content to send for this request, but the headers may be useful. */
  NO_CONTENT: 204,

  /** The server can not find the requested resource. */
  NOT_FOUND: 404,

  /** The request has succeeded. */
  OK: 200,

  /** The client must authenticate itself to get the requested response. */
  UNAUTHORIZED: 401,
} as const;
