export const environment = {
  production: true,
  baseUrl: 'https://api.github.com',
  githubAuthUrl: 'https://github.com/login/oauth',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: 'https://github-search-fb3ac.web.app/auth',
};
