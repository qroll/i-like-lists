import cors from "cors";
import csurf from "csurf";
import helmet from "helmet";
import nc from "next-connect";

const securityMiddleware = nc()
  .use(helmet())
  .use(cors({ origin: "http://localhost:3000" })) // TODO: env
  .use(csurf({ cookie: true }));

export default securityMiddleware;
