Vue.component('weather-app', {
  template: '#weather-app',
  data: function () {
      return {
          weather: null
      };
  },
  created() {
    this.fetchCoordinates();
  },
  methods: {
      fetchCoordinates() {
        if (navigator.geolocation) {
          coordinates = navigator
            .geolocation
            .getCurrentPosition(position => this.fetchWeather(position.coords)
            );
        }
      },
      async fetchWeather(coordinates) {
        if(coordinates) {
          const key = `a6ae0da911fe3ca20f571e7e7b102d9e`;
          const apiURL= `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${key}`
          const results = (await axios.get(apiURL)).data;
          this.weather = `${results.main.temp}`;
        }
      },
      handleClick() {

      }
  }
});
var app = new Vue({
  el: '#vue-app'
});