window.addEventListener('load', load);

function load() {
  Vue.component('paginador', {
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
    },
    template: `<div>
  <span v-for="i in pageRange" v-on:click="carregar(i)" :key="i" class="pointer">[[ i ]] </span>
</div>`
  });
}
