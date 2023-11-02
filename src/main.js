import {createApp, ref} from 'vue'
import App from './App.vue'
import UpdateNotifyPlugin from "@/plugins/update-notify/update-notify-plugin";

const DEPLOYMENT_URL = ref(window.location.href);

createApp(App).use(UpdateNotifyPlugin, { deploymentUrl: DEPLOYMENT_URL })
              .mount('#app');
