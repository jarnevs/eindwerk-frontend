import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import nl from 'vuetify/src/locale/nl';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#496ddb',
        secondary: '#00a9a5',
        cta: '#f93943',
        black: '#1c2321',
        white: '#f7f7ff',
      }
    }
  },
  icons: {
    iconfont: 'fa',
  },
});
