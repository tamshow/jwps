import Vue from 'vue';
import CalendarList from './@JWPS/vue/CalendarList.vue'
import NewsList from './@JWPS/vue/NewsList.vue'

document.addEventListener("DOMContentLoaded",  (e) => {
  
  new Vue({
    el:'#vue-body',
    components: {
      'calendar-list': CalendarList,
      'news-list': NewsList
    }
  });

});

