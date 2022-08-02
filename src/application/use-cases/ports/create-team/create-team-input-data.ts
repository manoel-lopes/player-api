export class CreateTeamInputData {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly startDate: Date,
    readonly state: string
  ) {}
}
