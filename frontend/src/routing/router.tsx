import Root from '../pages/root/Root';
import Login from '../pages/login/Login';
import Error from '../pages/error/Error';
import BrowserRouterBuilder from './routerBuilder';
import Register from '../pages/register/Register';

const router = new BrowserRouterBuilder()
  .addRoute('/', <Root />)
  .addRoute('/login', <Login />)
  .addRoute('/register', <Register />)
  .addErrorHandler(<Error />)
  .build();

export default router;
