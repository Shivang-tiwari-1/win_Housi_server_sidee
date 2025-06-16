# Tambola_server_side

backend for Housi game

HTTP status codes
Success Codes
200 OK → Request successful, response contains the result.
201 Created → Resource created successfully (e.g., after POST).
202 Accepted → Request accepted but still processing.
204 No Content → Success but no content to return (e.g., after DELETE).

Client Error Codes (4xx)
400 Bad Request → Invalid input, missing data, malformed request.
401 Unauthorized → Authentication needed or failed (no/invalid token).
403 Forbidden → Authenticated, but not allowed to access the resource.
404 Not Found → Resource doesn’t exist (wrong URL or ID).
405 Method Not Allowed → HTTP method not supported on that route (e.g., sending POST to a GET endpoint).
409 Conflict → Resource conflict (e.g., duplicate entry like already existing username/email).
422 Unprocessable Entity → Valid request format, but semantically invalid (e.g., business rule failed).

Server Error Codes (5xx)
500 Internal Server Error → Something broke unexpectedly on the server.
501 Not Implemented → Endpoint or method not yet supported.
502 Bad Gateway → Server received an invalid response from upstream.
503 Service Unavailable → Server overloaded or down for maintenance.
504 Gateway Timeout → Upstream service didn’t respond in time.



1.have to add check so the client side can know if  automatic contest is on