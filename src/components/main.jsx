require('normalize.css');
require('styles/App.css.scss');

import React from 'react';
import Chessboard from './landscapes/Chessboard';
import ChessGame from './models/ChessGame'
import Timer from './widgets/Timer';
import Toggler from './commons/Toggler'
// import TransformersApp from './experiments/TransformersApp';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.chessgame = window.chessgame = new ChessGame(this);
  }

  render() {

    return (
      <div>
        <div className="inline">  
          <Chessboard chessgame = {this.chessgame} />
        </div>
        <div className="inline menu"> 
          <Toggler className='inline'
            label="Graphic Avatars"
            model={this.chessgame.config}
            attr={'svgAvatar'}
            callback={this.forceUpdate.bind(this)}/>

          <label className="activePlayer block">
            <p className='lbl'>Turn of:</p>
            <p className='output' style={{color: this.chessgame.activePlayer.faction}}>
              {this.chessgame.activePlayer.faction === 'red' ? 'Player 1' : 'Player 2'}
            </p>
          </label>

          <Timer stat={this.chessgame.stat}/>

          <div className="menu-options">
            <button className="clickable" onClick={this.chessgame.reset.bind(this.chessgame, this)}>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
