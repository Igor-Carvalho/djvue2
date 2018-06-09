(function (global, factory) {
  global.Produtos = factory();
})(this, function () { 'use strict';
  return {
    install: install
  }

  function install(Vue, options) {
    Vue.prototype.$Produtos = {
      carregarProdutos: carregarProdutos,
      salvarProduto: salvarProduto,
      removerProduto: removerProduto
    }

    /**
     * Carrega produtos paginados especificando a página paginada.
     * 
     */
    function carregarProdutos(page, before) {
      return Vue.http.get('/api/v1/produtos/', {
        params: {page: page},
        before: before
      });
    }

    /**
     * Salva ou atualiza um produto.
     *  
     */
    function salvarProduto(produto) {
      var promise;
      if (produto.id) {
        promise = Vue.http.put(`/api/v1/produtos/${produto.id}/`, produto);
      } else {
        promise = Vue.http.post('/api/v1/produtos/', produto);
      }
      return promise;
    }

    /**
     * Deleta um produto.
     * 
     */
    function removerProduto(produto) {
      return Vue.http.delete(`/api/v1/produtos/${produto.id}/`);
    }
  }
});
