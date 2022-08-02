export class BrazilianState {
  private _value: string
  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid brazilian sate')
    this._value = value
  }

  get value() {
    return this._value
  }

  private validate(value: string) {
    if (!value) return false
    const brazilianStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
    'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP',
    'SE','TO']
    return !!brazilianStates.find(brazilianState => brazilianState === value)
  }
}
