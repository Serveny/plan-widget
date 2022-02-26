export class FocusChangedEvent {
  constructor(
    public readonly focusStart: Date,
    public readonly focusEnd: Date,
    public readonly focusHorizonSec: number,
    public readonly isChangedHorizon: boolean
  ) {}
}
