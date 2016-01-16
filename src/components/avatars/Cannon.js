import Avatar from './Avatar'
import Straight from '../movesets/Straight'

export default class Cannon extends Avatar {
  constructor (params) {
    super(params)
    this.name = '炮';
    this.moveset = new Straight(this);
  }
}