/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    TMDB_API_KEY: string;
    DATABASE_URL: string;
    FRONTEND_URL: string;
    PORT: string;
    JWT_SECRET: string;
  }
}

namespace Express {
  interface Request {
    user: {
      userId: string;
      email: string;
    };
  }
}
