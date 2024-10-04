export function getCookie(cookieName: string): string {
  const regex = new RegExp(`(?:^|; )${cookieName}=([^;]*)`);
  const match = document.cookie.match(regex);
  return match ? decodeURIComponent(match[1]) : '';
}

export function isLoggedIn(): boolean {
  const loginCookie = getCookie('playoff-preditor-token');
  return loginCookie !== '';
}
