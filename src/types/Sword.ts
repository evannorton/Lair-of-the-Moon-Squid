export interface Sword {
  readonly entityID: string;
  monstersHitAt: Map<string, number | null>;
  readonly swungAt: number;
  readonly spriteInstanceID: string;
}
