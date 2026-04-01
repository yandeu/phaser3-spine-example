import MainScene from './mainScene.js'

const config = {
  type: Phaser.WEBGL,
  backgroundColor: '#cdcdcd',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    width: 800,
    height: 600,
    parent: 'phaser-example'
  },
  plugins: {
    scene: [
      {
        key: 'SpinePlugin',
        plugin: window.SpinePlugin,
        sceneKey: 'spine'
      }
    ]
  },
  scene: [MainScene]
}

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
