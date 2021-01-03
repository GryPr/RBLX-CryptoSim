import { client } from "shared/clientconnector";
const Players = game.GetService("Players");
const localPlayer = Players.LocalPlayer;
const localMouse = localPlayer.GetMouse();

// Detects clicks
localMouse.Button1Down.Connect(() => Click());

// TODO: Check that it doesnt' get stuck on mobile
function Click() {
  let running: boolean = true;
  spawn(() => {
    while (running) {
      client.playerClick();
      wait(0.2);
    }
  });
  localMouse.Button1Up.Connect(() => {
    running = false;
  });
}

spawn(() => {
  while (true) {
    wait(10);
    client.saveGame();
  }
});
