import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { cookie } from '@elysiajs/cookie'
import { Role } from '../models';
import cors from '@elysiajs/cors';

export const googleAuth = new Elysia()
  .use(cors({
    credentials: true,
    origin: (request: Request): boolean => {
      const origin = request.headers.get('origin');
      if (!origin) {
        return false;
      }
      const allowedOrigins = JSON.parse(Bun.env.ALLOWED_DOMAINS || '[]') as string[];
      return allowedOrigins.includes(origin);
    },
  }))
  .use(cookie())
  .use(jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET!,
    exp: '7d'
  }))
  .post("/login",
    async ({ body, jwt, cookie, setCookie, set }) => {

      const googleToken = body.token;

      // Verify the token with Google's API
      const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`);

      if (!googleResponse.ok) {
        set.status = 401;
        return { error: "Invalid Google token" };
      }

      const googleData = await googleResponse.json();

      // Check if the email is verified
      if (!googleData.email_verified) {
        set.status = 401;
        return { error: "Email not verified by Google" };
      }

      const email = googleData.email;

      const roles = (await Role.findOne({ email }))?.roles ?? ['recruiter'];

      setCookie('auth', await jwt.sign({ "roles": `${JSON.stringify(roles)}` }), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 86400,
        domain: '.gentil.tech'
      })

      return `Sign in as ${cookie.auth}`
    },
    {
      body: t.Object({
        token: t.String()
      })
    }
  );
