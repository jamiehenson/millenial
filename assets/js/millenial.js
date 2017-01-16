function Millenial () {
  var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-frame')

  var menuState = {
    create: function () {
      // if (!Phaser.Device.ie) {
      //   game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      //   game.scale.aspectRatio = 1.6
      // }
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT

      var title = game.add.text(game.world.centerX, game.world.centerY, 'Mandem',
        { font: '40px Arial', fill: 'white', wordWrap: true, wordWrapWidth: game.world.width, align: 'center' }
      )
      title.anchor.set(0.5)
    }
  }

  var playState = {
  }

  game.state.add('menu', menuState)
  game.state.add('play', playState)
  game.state.start('menu')
}

Millenial()
