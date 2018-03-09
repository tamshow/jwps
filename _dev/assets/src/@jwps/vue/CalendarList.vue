<template>
  <div class="calendar">
    <div class="calendar__controll">
      <!--  前月 -->
      <div class="calendar__prev" v-on:click="prev">&lt;</div>
      <!--  今月 -->
      <div class="calendar__now">{{caldata.dYear}}年{{caldata.dMonth + 1}}月</div>
      <!--  来月 -->
      <div class="calendar__next" v-on:click="next">&gt;</div>
    </div>

    <div class="calendar__body">
      <!-- 曜日 -->
      <div v-for="date in caldata.weeklist" class="calendar__week">{{date}}</div>

      <!-- 日付 -->
      <div v-for="date in calevents">
        <p class="calendar__date">
          {{date.day}}<br>{{date.state}}<br>
          <span v-for="event in listevents[date.date]">
          {{event.title}}<br>
        </span>

        </p>
      </div>
    </div>

  </div>

</template>


<script>

  import axios from 'axios';
  import _ from 'lodash';

  const nowDay = new Date().getDate();
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();

  module.exports = {

    data: function () {
      return {
        url: 'http://localhost:3000/calendarDummy',
        caldata: {
          firstweek: 0,
          weeklist: ['日', '月', '火', '水', '木', '金', '土'],
          day: nowDay,
          month: nowMonth,
          year: nowYear,
          dDay: nowDay,
          dMonth: nowMonth,
          dYear: nowYear
        },
        calevents: [],


        listevents : {
        "2018/03/01" : {
          "001" : {
            "date" : "2018/03/01",
            "title" : "title0",
            "url" : "/html/entry.html"
          },
          "003" : {
            "date" : "2018/03/01",
            "title" : "title1",
            "url" : "/html/entry.html"
          }
        },
        "2018/03/10" : {
          "002" : {
            "date" : "2018/03/10",
            "title" : "title10",
            "url" : "/html/entry.html"
          }
        }
      }
      }
    },

    computed: {},

    methods: {

      buildAjax: function () {
        axios.get(this.url).then( _.bind(function(response) {

          let arrNum = [],
              arr = [],
              arrSort = [];

          //id順にソート
          _.forEach(response.data, function(item,i) {
            arrSort.push(item)
          });
          arrSort.sort(function(a, b) {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
          });

          //データ作成
          _.forEach(arrSort, function(item,i) {
            if (arrNum.indexOf(item.date) >= 0){
              arr[item.date][item.id] = {
                  'date': item.date,
                  'title': item.title,
                  'url': item.url
              }
            } else {
              arrNum.push(item.date);
              arr[item.date] = {
                [item.id] : {
                  'date': item.date,
                  'title': item.title,
                  'url': item.url
                }
              }
            }
          });

          this.listevents = arr;

        },this)).catch(function(error) {
          console.log(error);
        });
      },

      print: function () {

        //前月の末日
        var prevMonthStart = new Date(this.caldata.dYear, this.caldata.dMonth, 1).getDay() - this.caldata.firstweek;
        if (prevMonthStart < 0) {
          prevMonthStart = 6 - ((prevMonthStart + 1) * -1);
        }

        //当月の最終日
        var lastDay = new Date(this.caldata.dYear, this.caldata.dMonth + 1, 0).getDate();

        //日付の初期化設定
        var dayOfPrevMonth = new Date(this.caldata.dYear, this.caldata.dMonth + 1, 0).getDate() - prevMonthStart + 1;
        var day = 1;
        var dayOfNextMonth = 1;

        // 日付リストを生成
        for (let i = 0; i < 42; i++) {
          let calEventDay = '';
          let calEventDate = '';
          let calEventState = '';

          if (i < prevMonthStart) {
            //前月処理
            calEventDay = dayOfPrevMonth++;
            calEventState = 'prev';
            // calEventDay = '';
            // calEventState = ''

          } else if (day <= lastDay) {


            calEventState = 'day';
            //当月処理
            if (day === this.caldata.dDay && this.caldata.month === this.caldata.dMonth && this.caldata.year === this.caldata.dYear) {
              //本日
              calEventState = 'today';
            }

            calEventDay = day;
            calEventDate = this.caldata.dYear + '/' + ('00' + (this.caldata.dMonth + 1)).slice(-2) + '/' + ('00' + day++).slice(-2);

          } else {
            //来月処理
            calEventDay = dayOfNextMonth++;
            calEventState = 'next';
            // calEventDay = '';
            // calEventState = ''
          }

          //日付データ格納
          this.calevents.push({
            day: calEventDay,
            date: calEventDate,
            state: calEventState
          });

        }
      },

      prev: function () {
        this.calevents = [];
        //this.listevents = [];
        //this.url = 'http://localhost:3000/calendarDummy';

        if (this.caldata.dMonth > 0) {
          this.caldata.dMonth--;
        } else {
          this.caldata.dMonth = 11;
          this.caldata.dYear--;
        }

        this.print();
        this.buildAjax();

      },

      next: function () {

        this.calevents = [];
        //this.listevents = [];
        //this.url = 'http://localhost:3000/calendarDummy';

        if (this.caldata.dMonth < 11) {
          this.caldata.dMonth++;
        } else {
          this.caldata.dMonth = 0;
          this.caldata.dYear++;
        }

        this.print();
        this.buildAjax();
      }

    },

    mounted () {
      this.print();
      this.buildAjax();
    }
  }

</script>

