import {Component} from '../../lib/component';

class ImageItem extends Component {

  render(style = '') {
    console.log('image item');
    this.props.elm.style = this.props.data.css;
    this.props.elm.style.transform = style;
    this.props.elm.addEventListener('click', () => this.props.onClick(this.props.data, this.render.bind(this)));
    return this.props.elm;
  }
}

export default ImageItem;