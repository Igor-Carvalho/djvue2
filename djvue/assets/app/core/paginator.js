(function () { 'use strict';
  Vue.component('paginador', {
    template: `<div>
  <span v-for="i in pageRange" v-on:click="carregar(i)" :key="i" class="pointer">[[ i ]] </span>
</div>`,
    delimiters: ['[[', ']]'],
    props: ['pageRange'],
    data: function () {
      return {
      }
    },
    methods: {
      carregar: function (page) {
        var self = this;
        self.$emit('carregar', page)
      }
    }
  });
})();
