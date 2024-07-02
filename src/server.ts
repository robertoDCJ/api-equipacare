import http, { IncomingMessage, ServerResponse } from "http";
import app from "./app";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    app(req, res);
  }
);
const PORT = process.env["PORT"] || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
