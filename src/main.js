import plugin from '../plugin.json';
const selectionMenu = acode.require("selectionMenu");
const toast = acode.require("toast")
//oi

const supportedLangs = [
  "c",
  "cpp",
  "hpp",
  "hxx",
  "cc",
  "cxx",
  "inl",
  "ipp"
  ]

class ClangFix {

    async init() {
        // your plugin codes goes here
        selectionMenu.add(this.action.bind(this), "C", "selected");
        
    }
    
    async action(){
      const { editor, activeFile } = editorManager
      let extname = activeFile.name.split(".")[1];
      
      if (this.extNotSupported(extname)) {
        // Show a toast message if the file extension is not supported
        toast("file not supported", 3000);
        return;
      }
      let content = editor.getSession().getValue();
      let regex = /([^;a-z0-9])$/g;
      content = content.replace(regex,"$1;")
      console.log(content)
      editor.getSession().setValue(content)
      this.extensions = [];
      toast("Success", 2000);
    }
    async destroy() {
      
    }
    extNotSupported(ext) {
        return !this.extensions.includes(ext);
    }
}

if (window.acode) {
    const acodePlugin = new ClangFix();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init();
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
