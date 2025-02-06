export function getCookie(cookieName: string): string {
  const regex = new RegExp(`(?:^|; )${cookieName}=([^;]*)`);
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[1]) : '';
}

export function deleteCookie() {
  document.cookie = 'playoff-preditor-token=; Max-Age=-99999999;';
}

export function isLoggedIn(): boolean {
  const loginCookie = getCookie('playoff-preditor-token');
  return loginCookie !== '';
}
