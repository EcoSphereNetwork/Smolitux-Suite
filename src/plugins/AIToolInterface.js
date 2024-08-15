export default class AIToolInterface {
    constructor(name, component, executeFunction) {
      this.name = name;
      this.component = component;
      this.executeFunction = executeFunction;
    }
  
    getMetadata() {
      return {
        name: this.name,
        component: this.component
      };
    }
  
    execute(input) {
      if (typeof this.executeFunction === 'function') {
        return this.executeFunction(input);
      } else {
        console.error('Execute function is not defined for this AI tool.');
        return null;
      }
    }
  }
  