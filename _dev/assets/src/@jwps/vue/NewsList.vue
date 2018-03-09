<template>
 <ul class="l-grid-assy-4to2to2">
  <li v-for="result in results" class="l-grid c-card">
    <a :href="result.url">
      <div class="c-card__img"><img :src="result.image_path" alt=""></div>
      <div class="c-card__body">
        <p class="c-card__text is-text-week"> {{result.date}}</p>
        <div class="c-card__label">
          <span v-for="(tag, key) in result.tags" :class="'e-label e-label--pink e-label--' + key">{{tag}}</span>
        </div>
        <p class="c-card__title">{{result.title}}</p>
      </div>
    </a>
  </li>
</ul>
</template>

<script>

  import axios from 'axios';
  import _ from 'lodash';

  module.exports = {

    data: function () {
      return {
        url: 'http://localhost:3000/newsDummy1',
        results: []
      }
    },

    methods: {
      buildAjax: function () {
        axios.get(this.url).then( _.bind(function(response) {
          let arr = [];
          _.forEach(response.data, function(elem) {
            arr.push(elem)
          });
          this.results = arr;

        },this)).catch(function(error) {
          console.log(error);
      });
      }
    },

    mounted () {
      this.buildAjax();
    }
  }
</script>