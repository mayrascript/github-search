export const environment = {
  production: true,
  baseUrl: 'https://api.github.com',
  githubAuthUrl: 'https://github.com/login/oauth/authorize',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: 'http://localhost:4200/auth',
};
