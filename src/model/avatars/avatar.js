class Avatar {
  constructor ({name, faction, point}) {
    this.faction = faction;
    this.point = point;
  }

  get location() {
    return {
      cx: this.point.spacing * this.point.xPoint,
      cy: this.point.spacing * this.point.yPoint
    }
  }
}

export default Avatar