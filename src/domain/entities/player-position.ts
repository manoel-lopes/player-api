export class PlayerPosition {
    private _value: string
    constructor(value: string) {
      if (!this.validate(value)) throw new Error('Invalid player position')
      this._value = value
    }
  
    get value() {
      return this._value
    }
  
    private validate(value: string) {
      if (!value) return false
      const playerPositions = ['atacante','zagueiro','goleiro','lateral',
      'meio de campo']
      return !!playerPositions.find(brazilianState => brazilianState === value)
    }
  }
  