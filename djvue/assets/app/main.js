axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

Vue.use(VeeValidate);

new Vue({
  el: '#app',
  delimiters: ['[[', ']]'],
  data: function () {
    return {
      produtos: [],
      produto: {
        nome: '',
        preco: ''
      }
    }
  },
  methods: {
    obterProdutos: function () {
      var self = this;
      axios.get('/api/v1/produtos/').then(sucesso);

      function sucesso(response) {
        self.produtos = response.data;
      }
    },
    salvarProduto: function () {
      var self = this;
      axios.post('/api/v1/produtos/', self.produto).then(sucesso);

      function sucesso(response) {
        self.produtos.results.push(response.data);
        self.produto = {};
        self.$refs.nome.focus();
      }
    },
    removerProdutoConfirmacao: function (produto) {
      var self = this;
      if (confirm('Remove?')) {
        self.removerProduto(produto);
      }
    },
    removerProduto: function (produto) {
      var self = this;

      axios.delete('/api/v1/produtos/' + produto.id + '/').then(sucesso);

      function sucesso() {
        var index = _.findIndex(self.produtos.results, function (p) {
          return p.id === produto.id;
        });

        Vue.delete(self.produtos.results, index);
        self.$refs.nome.focus();
      }
    },
    removerTodos: function () {
      var self = this;
      if (confirm('Remover todos?')) {
        self.produtos.results.forEach(function (produto) {
          self.removerProduto(produto);
        });
        self.obterProdutos();
      }
    }
  },
  mounted: function () {
    var self = this;
    self.obterProdutos();
  }
});
