import {getCurrentInstance, ref} from "vue";
import emitter from "@/plugins/emitter";

export default {
  install(app, options) {
    const { deploymentUrl } = options;
    const isNewVersion = ref(false);

    const compareVersions = async() => {
      // new - get index.html file
      let fetchPage;
      try {
        fetchPage = await fetch(deploymentUrl, { method: 'get', mode: 'cors' });

        // new
        // get text from index.html
        const loadedText = await fetchPage.text();
        // get app.js script
        const matchResponses = loadedText.match(/.*(app.*\.js)/);
        let remoteMainScript = matchResponses !== null && matchResponses.length > 0 ? matchResponses[1] : undefined;
        if (remoteMainScript === undefined) {
          console.log("Couldn't find app.js script in index.html file");
          isNewVersion.value = false;
          return;
        }

        // old
        // get hash
        let currentMainScript = undefined;
        // get text from index.html
        const scriptTags = document.head.getElementsByTagName('script');
        for (let i = 0; i < scriptTags.length; i++) {
          const scriptTag = scriptTags[i];
          currentMainScript = /^.*\/(app.*\.js).*$/gim.exec(scriptTag.src) === null ? undefined : /^.*\/(app.*\.js).*$/gim.exec(scriptTag.src)[1];
        }

        // if new & old hashes are there, compare
        isNewVersion.value = (currentMainScript && remoteMainScript) && (currentMainScript !== remoteMainScript);
        console.log("Current: ", currentMainScript)
        console.log("New: ", remoteMainScript)
        console.log("New version available: ", isNewVersion.value)

        if (isNewVersion.value === true) emitter.emit("emitNewVersion");

      } catch(e) {
        console.log("Error: ", e.message)
      }
    }

    setInterval(compareVersions, 5000);
  }

}