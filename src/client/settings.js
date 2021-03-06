'use strict';
import Vue from 'vue/dist/vue.min.js';

const Promise = TrelloPowerUp.Promise;
const t = TrelloPowerUp.iframe();

const mainComponent = {
  data() {
    return {
      bxLink: '',
    };
  },

  created() {
    t.get('board', 'private', 'bxLink')
      .then(val => this.bxLink = val)
      .then(() => {
        t.sizeTo('#content');
      });
  },

  methods: {
    saveData: function () {
      t.set('board', 'private', 'bxLink', this.bxLink)
        .then(() => t.closePopup());
    }
  },

  template: `
      <div id="content">
          <label for="bxlink">Bitrix24 webhook</label>
          <input id="bxlink" v-model="bxLink" type="text" placeholder="https://bx.company.ru/rest/123/fgjaslkjqeyourcode/">
          <button id="save" @click="saveData" style="float:right" class="mod-primary">Save</button>
      </div>
  `,
};

new Vue({
  el: '#app',
  components: {
    'main-component': mainComponent
  },
  template: `
      <main-component />`,
});
