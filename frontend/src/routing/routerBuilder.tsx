import { createBrowserRouter, RouteObject } from 'react-router-dom';

export default class BrowserRouterBuilder {
  routes: RouteObject[] = [];
  errorHandler: JSX.Element;

  constructor() {
    // Sensible default
    this.errorHandler = <div>Error!</div>;
  }

  addRoute(route: string, element: JSX.Element) {
    this.routes.push({
      path: route,
      element: element,
    });

    return this;
  }

  addErrorHandler(element: JSX.Element) {
    this.errorHandler = element;
    return this;
  }

  build() {
    const root = this.routes.find((route) => route.path === '/');
    if (!root) {
      throw new Error('Browser router must have a root path!');
    }
    root.errorElement = this.errorHandler;
    return createBrowserRouter(this.routes);
  }
}
