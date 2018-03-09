import Vue from 'vue';
import CalendarList from './@jwps/vue/CalendarList.vue'
import NewsList from './@jwps/vue/NewsList.vue'

document.addEventListener("DOMContentLoaded",  (e) => {
  
  new Vue({
    el:'#vue-body',
    components: {
      'calendar-list': CalendarList,
      'news-list': NewsList
    }
  });

});

