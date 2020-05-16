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
      this.activities.push({
        date: this.$refs.date.value,
        section: this.$refs.section.value,
        time: this.$refs.time.value,
        detail: this.$refs.detail.value,
      });
      // フォーム要素を空にする
      this.$refs.date.value = "";
      this.$refs.section.value = "";
      this.$refs.time.value = "";
      this.$refs.detail.value = "";      
    }
  },
});

