// Vue.jsの記述
new Vue({
  el: '#app',
  data: {
    name: "",
    activities: [{date: "12/20", section: "定例", time: "5", detail: "ほげほげ"}, {date: "12/25", section: "コアMTG", time: "5", detail: "ほげほげ"}]
  },
  methods: {
    addName: function() {
      // ref で名前を付けておいた要素を参照
      this.name = this.$refs.name.value;
      // フォーム要素を空にする
      this.$refs.name.value = "";
    },
    addActivity: function() {
      // ref で名前を付けておいた要素を参照
      var date = this.$refs.date;
      var section = this.$refs.section;
      var time = this.$refs.time;
      var detail = this.$refs.detail;

      this.activities.push({
        date: date.value,
        section: section.value,
        time: time.value,
        detail: detail.value,
      });
      // フォーム要素を空にする
      date.value = "";
      section.value = "";
      time.value = "";
      detail.value = "";      
    }
  },
});

