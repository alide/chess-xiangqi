class Avatar {
  constructor ({name, faction, point, player} = {}) {
    this.faction = faction;
    this.point = point;
    this.player = player;
  }

  get location() {
    return {
      cx: this.point.spacing * this.point.xPoint,
      cy: this.point.spacing * this.point.yPoint
    }
  }

}

export default Avatar;