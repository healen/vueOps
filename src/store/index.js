import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import globalConfig from './modules/globalConfig';
import tools from './modules/tools';
import drainage from './modules/drainage';
import release from './modules/release';
import list from './modules/list';


export default new Vuex.Store({
  modules : {
    globalConfig,
    list,
    tools,
    drainage,
    release,
  }
});
