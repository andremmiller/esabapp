import Vue from 'vue';
import moment from 'moment';

Vue.filter('displayDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
});