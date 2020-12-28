import { makeHello } from "shared/module";
import { CollectionService } from "@rbxts/services"

for (const obj of CollectionService.GetTagged("Kill")) {
    if (obj.IsA("Part")){
        obj.Touched.Connect((part) => part.Parent?.FindFirstChildOfClass("Humanoid")?.TakeDamage(5));
    }
}

print(makeHello("Test"));

