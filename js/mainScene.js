import button from './button.js'

var goblin
let skins = ['goblin', 'goblingirl']
let attachments = ['spear', 'dagger', null]
let animations = ['walk', 'idle']

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.load.image('skin', 'btn/skin.png')
    this.load.image('animation', 'btn/animation.png')
    this.load.image('attachment', 'btn/attachment.png')

    this.load.setPath('spine/')
    this.load.spine('goblin', 'goblins.json', 'goblins.atlas')
  }

  create() {
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

    // add buttons
    button(this, 120, 50, 'skin', () => {
      let index = (goblin.customParams.skin += 1)
      let skin = skins[index % skins.length]
      setSkin(skin)
    })
    button(this, 360, 50, 'animation', () => {
      let index = (goblin.customParams.animation += 1)
      let animation = animations[index % animations.length]
      setAnimation(animation, true)
    })
    button(this, 600, 50, 'attachment', () => {
      let index = (goblin.customParams.attachment += 1)
      let slot = 'left hand item'
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

    // remove dagger in right hand
    setAttachment('right hand item', null)

    console.log('Attachments: ', getAttachments())
    console.log('Slots: ', getSlots())
  }
}

export default MainScene
