import Avatar from './Avatar'
import Straight from '../movesets/Straight'
import StraightKill from '../movesets/StraightKill'

export default class Chariot extends Avatar {
  constructor (params) {
    super(params)
    this.name = '車'
    this.moveset = new Straight(this);
    this.killMoveset = new StraightKill(this);
  }
}