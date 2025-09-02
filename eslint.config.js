import vuetify from 'eslint-config-vuetify';
import pluginVue from 'eslint-plugin-vue';

export default [
  ...pluginVue.configs['flat/base'],
  ...vuetify.configs['flat/base'],
];
