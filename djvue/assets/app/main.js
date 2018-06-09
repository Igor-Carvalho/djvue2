(function () { 'use strict';
  Vue.use(VeeValidate);
  Vue.use(VueResource);
  Vue.use(Produtos);

  Vue.http.headers.common['xsrfCookieName'] = 'csrftoken';
  Vue.http.headers.common['xsrfHeaderName'] = 'X-CSRFToken';
})();
