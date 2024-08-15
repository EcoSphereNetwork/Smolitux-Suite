export default class PluginInterface {
    constructor(name, component, initFunction) {
      this.name = name;
      this.component = component;
      this.initFunction = initFunction;
    }
  
    getMetadata() {
      return {
        name: this.name,
        component: this.component
      };
    }
  
    initialize() {
      if (typeof this.initFunction === 'function') {
        return this.initFunction();
      } else {
        console.error('Initialization function is not defined for this plugin.');
        return null;
      }
    }
  }
  