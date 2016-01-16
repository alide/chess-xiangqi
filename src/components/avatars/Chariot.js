import Avatar from './Avatar'
import Straight from '../movesets/Straight'

export default class Chariot extends Avatar {
  constructor (params) {
    super(params)
    this.name = '車'
    this.moveset = new Straight(this);
  }
}