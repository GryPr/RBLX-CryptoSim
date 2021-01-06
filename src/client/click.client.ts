import { client } from "shared/clientconnector";
import { UserInputService } from "@rbxts/services";
const Players = game.GetService("Players");
const localPlayer = Players.LocalPlayer;
const localMouse = localPlayer.GetMouse();

// Detects clicks
localMouse.Button1Down.Connect(() => Click());

let running: boolean = false;

// TODO: Check that it doesnt' get stuck on mobile
function Click() {
  if (running === true) {
    running = false;
  } else {
    running = true;
    spawn(() => {
      while (running) {
        client.playerClick();
        wait(0.2);
        let stillRunning: boolean = false;
        for (const element of UserInputService.GetMouseButtonsPressed()) {
          if (element.UserInputType.Name === "MouseButton1") {
            stillRunning = true;
          }
        }
        if (stillRunning === false) {
          running = false;
        }
      }
    });
  }
}

spawn(() => {
  while (true) {
    wait(10);
    client.saveGame();
  }
});
