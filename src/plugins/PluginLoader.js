export default class PluginLoader {
    constructor() {
      this.plugins = [];
    }
  
    registerPlugin(plugin) {
      if (plugin && typeof plugin.initialize === 'function') {
        const initialized = plugin.initialize();
        if (initialized) {
          this.plugins.push(plugin);
          console.log(`Plugin ${plugin.getMetadata().name} registered successfully.`);
        } else {
          console.error(`Failed to initialize plugin ${plugin.getMetadata().name}.`);
        }
      } else {
        console.error('Invalid plugin. Make sure it implements the PluginInterface.');
      }
    }
  
    getRegisteredPlugins() {
      return this.plugins;
    }
  }
  