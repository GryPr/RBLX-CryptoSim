import { SoundService } from "@rbxts/services";

export function playButtonSound(id: string) {
  let sound = new Instance("Sound");
  sound.SoundId = `rbxassetid://${id}`;
  SoundService.PlayLocalSound(sound);
  sound.Destroy();
}

export function getOrderPrefix(n: number): string {
  let order: number = n;
  let prefix: string = ``;
  while (order >= 6) {
    order -= 6;
    prefix = `${prefix}M`;
  }
  while (order >= 3) {
    order -= 3;
    prefix = `k${prefix}`;
  }
  while (order >= 2) {
    order -= 2;
    prefix = `h${prefix}`;
  }
  while (order >= 1) {
    order -= 1;
    prefix = `d${prefix}`;
  }
  return prefix;
}
