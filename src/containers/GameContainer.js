import { connect } from 'react-redux';
import Game from '../components/Game';
import { placeMove, resetGame } from '../actions/actions';

const mapStateToProps = state => state;

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    placeMove: position => dispatch(placeMove(position)),
    resetGame: () => dispatch(resetGame())
  };
};

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
