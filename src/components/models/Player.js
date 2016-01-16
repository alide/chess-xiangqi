import matrix from './coordinateMatrix';

export default class Player {
  constructor({faction} = {}) {
    this.faction = faction;
    this.avatars = [];
    this.selectedAvatar = null;
  }

  set addAvatar(avatar) {
    this.avatars.push(avatar);
    avatar.player = this;
  }

  set addAvatars(allPieces) {
    allPieces.forEach((avatar) => {
      this.addAvatar(avatar)
    })
  }

  set setSelectedAvatar(avatar) {
    matrix.all().map(coord =>  coord.hide());
    if (avatar === null) {
      this.selectedAvatar = avatar;
    }
    else if (this.selectedAvatar === avatar) {
      this.selectedAvatar = null;
    }
    else if (this.avatars.indexOf(avatar) !== -1) {
      this.selectedAvatar = avatar;
      
      this.selectedAvatar.getMoveOptions.map((coord) => {
        coord.highlight(this.player);
      });
    }
  }

  get getSelectedAvatar() { return this.selectedAvatar }

}