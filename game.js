var config = {
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
        key: 'SpineWebGLPlugin',
        plugin: SpineWebGLPlugin,
        start: true,
        sceneKey: 'spine'
      }
    ]
  },
  scene: {
    preload: preload,
    create: create
  }
}

var goblin
let skins = ['goblin', 'goblingirl']
let attachments = ['spear', 'dagger', null]
let animations = ['walk', 'idle']

window.addEventListener('load', () => {
  var game = new Phaser.Game(config)
})

function preload() {
  this.load.image('skin', 'btn/skin.png')
  this.load.image('animation', 'btn/animation.png')
  this.load.image('attachment', 'btn/attachment.png')

  this.load.setPath('spine/')
  this.load.spine('goblin', 'goblins-ess.json', 'goblins-ess.atlas')
}

function create() {
  const getAttachments = () => {
    return goblin.skeleton.skin.attachments
  }

  const getSlots = () => {
    return goblin.skeleton.slots
  }

  const setAttachment = (slotName, attachmentName) => {
    goblin.skeleton.setAttachment(slotName, attachmentName)
  }

  const setSkin = skinName => {
    goblin.setSkin(null)
    goblin.setSkinByName(skinName)
  }

  const setAnimation = (animation, loop = false) => {
    goblin.play(animation, loop)
  }

  // add change skin button
  this.add
    .image(120, 50, 'skin')
    .setInteractive()
    .on('pointerdown', () => {
      let index = (goblin.customParams.skin += 1)
      let skin = skins[index % skins.length]
      setSkin(skin)
    })

  // add change animation button
  this.add
    .image(360, 50, 'animation')
    .setInteractive()
    .on('pointerdown', () => {
      let index = (goblin.customParams.animation += 1)
      let animation = animations[index % animations.length]
      setAnimation(animation, true)
    })

  // add change attachment button
  this.add
    .image(600, 50, 'attachment')
    .setInteractive()
    .on('pointerdown', () => {
      let index = (goblin.customParams.attachment += 1)
      let slot = 'left-hand-item'
      let attachment = attachments[index % attachments.length]
      setAttachment(slot, attachment)
    })

  // add the goblin
  goblin = this.add.spine(400, 600, 'goblin', 'walk', true)
  goblin.customParams = {
    skin: 0,
    animation: 0,
    attachment: 0
  }
  setSkin('goblin')
  goblin.setMix('walk', 'idle', 0.3)
  goblin.setMix('idle', 'walk', 0.3)

  console.log('Attachments: ', getAttachments())
  console.log('Slots: ', getSlots())
}
