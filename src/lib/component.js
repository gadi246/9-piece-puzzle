console.log('yes');


export class Component {
  constructor({elm, ...props}) {
    this.props = {
      elm: elm || document.createElement('div'),
      ...props
    };
    this.render = this.render.bind(this);
  }

  render() {
    return this.props.elm;
  }
}
// simple components
export const createEl = (props) => new Component(props).render();
