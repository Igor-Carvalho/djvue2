window.addEventListener('load', load);

function load() {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  Vue.use(VeeValidate);
}
