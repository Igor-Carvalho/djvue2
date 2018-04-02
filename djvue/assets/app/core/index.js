window.addEventListener('load', load);

function load() {
  Vue.component('index', {
    template: `<div>
  <h3>Total de produtos: <span v-if="produtos.results">[[ produtos.results.length ]]</span> <button @click="removerTodos()">remover todos</button></h3>
  <form style="width: 30%" novalidate>
    <div>
      <input type="text" ref="nome" name="nome" v-model="produto.nome" v-validate.initial="'required'" placeholder="Nome do produto" autofocus="autofocus">
    </div>
    <div>
      <input type="text" name="preço" v-model="produto.preco" v-validate.initial="'required'" placeholder="Preço do produto">
      <p v-if="serverErrors.preco">[[ serverErrors.preco[0] ]]</p>
    </div>
    <hr>
    <button @click.prevent="salvarProduto" :disabled="errors.any()">Salvar produto</button>
  </form>

  <table style="margin-top: 20px;">
    <tbody>
      <tr v-for="p in produtos.results" :key="p.id">
        <td>[[ p.nome ]]</td>
        <td>[[ p.preco ]]</td>
        <td><button @click="removerProdutoConfirmacao(p)">remover</button></td>
      </tr>
    </tbody>
  </table>

  <paginador :page-range="produtos.page_range" v-on:carregar="obterProdutos"></paginator>
</div>`,
    delimiters: ['[[', ']]'],
    data: function () {
      return {
        produtos: [],
        produto: {
          nome: '',
          preco: ''
        },
        serverErrors: {},
        page: 1
      }
    },
    methods: {
      obterProdutos: function (page) {
        var self = this;
        self.page = page;
        axios.get('/api/v1/produtos/', {params: {page: self.page}}).then(sucesso);

        function sucesso(response) {
          self.produtos = response.data;
        }
      },
      salvarProduto: function () {
        var self = this;
        self.serverErrors = {};
        
        axios.post('/api/v1/produtos/', self.produto).then(sucesso).catch(erro);

        function sucesso(response) {
          self.produtos.results.push(response.data);
          self.produto = {};
          self.$refs.nome.focus();
        }

        function erro(error) {
          self.serverErrors = error.response.data;
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

          self.obterProdutos(self.page);
          self.$refs.nome.focus();
        }
      },
      removerTodos: function () {
        var self = this;
        if (confirm('Remover todos?')) {
          self.produtos.results.forEach(function (produto) {
            self.removerProduto(produto);
          });
        }
      }
    },
    mounted: function () {
      var self = this;
      self.obterProdutos(1);
      self.$refs.nome.focus();
    }
  });
}
