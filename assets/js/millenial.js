function Millenial () {
  var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'game-frame')
  var cells = []
  var costs = []
  var xCells = 6
  var yCells = 4
  var ui

  var playState = {
    preload: function () {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    },

    create: function () {
      ui = game.add.graphics(0, 0)

      this.generateCells(ui)

      ui.beginFill(0x0000FF, 1)
      ui.drawRect(game.world.width - 400, 0, game.world.width, game.world.height)

      ui.beginFill()
    },

    generateCells: function (ui) {
      var xSlice = (game.world.width - 400) / xCells
      var ySlice = game.world.height / yCells
      var names = [
        'Artisanal Paradise', 'Dab Grange', 'Flat White St', 'Pumpkin Spice',
        'Selfie Close', 'Dog Street', 'Meme Valley', 'Brexit Row',
        'Moose', 'Duck', 'Pig', 'Horse',
        'Cow', 'Goat', 'Sheep', 'Bear'
      ]
      names = this.shuffle(names)

      for (var j = 0; j < yCells; j++) {
        for (var i = 0; i < xCells; i++) {
          ui.lineStyle(2, 0x00FFFF, 1)
          if (!(j === 0 || j === (yCells - 1)) && !(i === 0 || i === (xCells - 1))) {
            ui.beginFill(0x200000, 1)
            ui.drawRect(xSlice, ySlice, xSlice * (xCells - 2), ySlice * (yCells - 2))
          } else {
            cells.push(new Phaser.Rectangle(xSlice * i, ySlice * j, xSlice, ySlice))
          }
        }
      }

      cells = this.sortCells()
      this.generateCosts()

      for (i = 0; i < cells.length; i++) {
        var cell = cells[i]
        var text = game.add.text(cell.x + (cell.width / 2), cell.y + 30, names[i], { font: '18px Helvetica', fill: 'white', wordWrap: true, wordWrapWidth: game.world.width, align: 'center' })
        var price = game.add.text(cell.x + (cell.width / 2), cell.y + cell.height - 30, '£' + costs[i], { font: '18px Helvetica', fill: 'white', wordWrap: true, wordWrapWidth: game.world.width, align: 'center' })
        text.anchor.set(0.5)
        price.anchor.set(0.5)
      }
    },

    sortCells: function () {
      var length = cells.length
      var order = []
      var sorted = []
      var colours = ['FFFFFF', 'E8E8FF', 'D1D1FF', 'B9B9FF', 'A2A2FF', 'FFFFFF', '8B8BFF', '7474FF', 'FFFFFF', '5D5DFF', '4646FF', '2E2EFF', '1717FF', 'FFFFFF', '0000FF', '0000CC']

      for (var i = length - 1; i >= length - xCells; i--) { order.push(i) }
      for (i = length - xCells - 2; i >= xCells; i -= 2) { order.push(i) }
      for (i = 0; i < xCells; i++) { order.push(i) }
      for (i = xCells + 1; i <= length - xCells; i += 2) { order.push(i) }

      order.forEach(function (item, index) {
        var targetCell = cells[item]
        ui.beginFill('0x' + colours[index], 1)
        ui.drawRect(targetCell.x, targetCell.y, targetCell.width, targetCell.height)
        sorted.push(targetCell)
      })

      return sorted
    },

    generateCosts: function () {
      for (var i = 0; i < cells.length; i++) {
        costs.push(Math.floor((Math.random() * 2000000) + 1000000))
      }
      costs = costs.sort()
    },

    shuffle: function (values) {
      var currentIndex = values.length
      var temporaryValue
      var randomIndex

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = values[currentIndex]
        values[currentIndex] = values[randomIndex]
        values[randomIndex] = temporaryValue
      }

      return values
    }
  }

  game.state.add('play', playState)
  game.state.start('play')
}

Millenial()
