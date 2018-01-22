import {Component} from '../../lib/component';
console.log('yes');
class ImageItem extends Component {

  render(style = '') {
    this.props.elm.style = this.props.data.css;
    this.props.elm.style.transform = style;
    this.props.elm.addEventListener('click', () => this.props.onClick(this.props.data, this.render.bind(this)));
    return this.props.elm;
  }
}

export default ImageItem;