
Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class rqgSpeedProvider extends SpeedProvider {
        get colors() {
            return [
                {id: "attack", default: 0x00FF00, name: "rqg.speeds.attack"},
                {id: "walk", default: 0xFFFF00, name: "rqg.speeds.walk"},
                {id: "sprint", default: 0xFF8000, name: "rqg.speeds.run"}
            ];
        };

        getRanges(token) {
            const baseSpeed = 3 * (token.actor.data.data.attributes.move.walk.value + Math.min(token.actor.data.data.attributes.encumbrance.max - token.actor.data.data.attributes.encumbrance.equipped, 0));
            const attackSpeed = baseSpeed / 2;
            const sprintSpeed = baseSpeed * 3;

            // movement: characters MOV, 1MOV = 3 meters
			// attack: you can move and attack if you move MOV/2
			// sprint: out of combat context, you can sprint up to MOV*5
			
            const ranges = [
                {range: attackSpeed, color: "attack"},
                {range: baseSpeed, color: "walk"},
                {range: sprintSpeed, color: "sprint"}
            ];

            return ranges;
        };
    }
    dragRuler.registerModule("drag-ruler-integration-for-rqg", rqgSpeedProvider);
})
