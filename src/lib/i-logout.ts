import { API_URL } from '@/services/form';
import router from 'next/router';

const url = API_URL.LOGOUT;
const loginUrl = '/flow/login';

export async function sessionLogout(onSuccess?: () => void, onFail?: () => void) {
  const httpRes: any = await fetch(url).then(res => res.json());
  if (httpRes.isLoggedIn === false) {
    // localStorage.clear(token);
    localStorage?.removeItem('multi');
    if (onSuccess) {
      onSuccess();
    }

    router.push(loginUrl);
  }
  if (onFail) {
    onFail();
  }
}
