// client/src/utils/auth.ts
const Auth = {
  login: (token: string) => {
    localStorage.setItem('id_token', token);
    window.location.assign('/');
  },
  logout: () => {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  },
  getToken: () => localStorage.getItem('id_token')
};

export default Auth;
