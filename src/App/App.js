import * as styles from './App.scss';
import {Component, createEl} from '../lib/component';
import ImageItem from './Components/ImageItem';
import {flat} from '../services/gameService';

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleClickItem = this.handleClickItem.bind(this);
    this.getTransition = this.getTransition.bind(this);
    this.blank = null;
    this.winnerSequence = 123456789;
    this.isWinner = false;
    this.winnerMsg = '';
  }

  handleClickItem(data, cb) {
    if ((data.y === this.blank.y && (Math.abs(data.x - this.blank.x) < 2)) ||
      (data.x === this.blank.x && (Math.abs(data.y - this.blank.y) < 2))) {
      const cbAnswer = (this.getTransition(data, this.blank));
      const temp = {...data};
      const {x, y} = this.blank;
      data.y = y;
      data.x = x;
      this.props.data[y][x] = data;
      const {x: x1, y: y1} = temp;
      this.blank.x = x1;
      this.blank.y = y1;
      this.props.data[y1][x1] = this.blank;
      this.compare();
      setTimeout(() => this.render(this.props.data), 400);
      return cb(cbAnswer);
    }
  }

  compare() {
    const current = flat(this.props.data).map(el => el.id).join('');
    console.log(current, this.props.data, 'somestuff');
    if (current.toString() === this.winnerSequence.toString()) {
      this.isWinner = true;
    }
    return this.isWinner;
  }

  getTransition(data, blank) {
    const style = (xy, sign = '', pxs) => (`translate${xy}(${sign}${pxs}px)`);
    if (data.x === blank.x) {
      return data.y - blank.y < 0 ? style('Y', '', 300) : style('Y', '-', 300);
    } else {
      return data.x - blank.x < 0 ? style('X', '', 300) : style('X', '-', 300);
    }
  }
  renderGame(board) {
    this.props.data.map((col, y) => {
      const row = createEl({});
      row.style = 'display: flex';
      return col.map((fig, x) => {
        let imageItem = null;
        fig.y = y;
        fig.x = x;
        this.props.data[y][x] = fig;
        if (fig.id === 1) {
          imageItem = createEl({});
          imageItem.classList.add(styles.blank);
          this.blank = fig;
        } else {
          imageItem = new ImageItem({elm: null, onClick: this.handleClickItem, data: fig}).render();
          imageItem.classList.add(styles.img);
        }
        row.appendChild(imageItem);
        return board.appendChild(row);
      });
    });
  }

  render() {
    const board = createEl({});
    board.classList.add(styles.board);
    if (this.isWinner) {
      this.winnerMsg = `<h1 class=${styles.winner}>Winner!</h1>`;
      board.classList.add(styles['winner-board']);
    } else {
      this.renderGame(board);
    }
    this.props.elm.innerHTML = this.winnerMsg;
    this.props.elm.appendChild(board);
  }
}


