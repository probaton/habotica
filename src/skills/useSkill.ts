import { callHabApi } from "../requests/HabiticaRequest";
import { getUserData } from "../userData/userData";


function useSkill(skill: SkillId, habitId?: string): Promise<any> {
    let apiSuffix = `/api/v3/user/class/cast/${skill}`;
    apiSuffix += habitId ? `?targetId=${habitId}` : "";
    return callHabApi(apiSuffix, "POST").catch(e => { throw new Error(e); });
}

/**
 * Spams a skill a given number of times or until mana runs out.
 * @param skill The skill to be used.
 * @param count The number of times to perform the skill. Will run until out of mana if set to -1, which is the default.
 * @param habitRank Determines whether to use the skill on the highest or lowest ranked task.
 * Skill will be used without task parameter if left empty.
 */
export async function spamSkill(skillId: SkillId, count = -1): Promise<any> {
    const skill = getSkill(skillId);
    let habitId = "";
    if (skill.habit !== "none") {
        const habits = (await getUserData()).tasks.habits.sort((a, b) => a.value - b.value);
        habitId = skill.habit === "lowest" ? habits[0].id : habits[habits.length - 1].id;
    }
    return new Promise<any> (async (resolve, reject) => {
        while (count !== 0) {
            await useSkill(skillId, habitId).catch(e => { reject(e); });
            count--;
        }
        resolve(true);
    });
}

type SkillId =
    "fireball" |
    "mpHeal" |
    "earth" |
    "frost" |
    "smash" |
    "defensiveStance" |
    "valorousPresence" |
    "intimidate" |
    "pickPocket" |
    "backStab" |
    "toolsOfTrade" |
    "stealth" |
    "heal" |
    "protectAura" |
    "brightness" |
    "healAll";

interface ISkill {
    id: SkillId;
    name: string;
    habit: "lowest" | "highest" | "none";
}

function getSkill(skillId: SkillId): ISkill {
    switch (skillId) {
        case "fireball": {
            return { id: skillId, name: "Burst of Flames", habit: "highest" };
        }
        case "mpHeal": {
            return { id: skillId, name: "Ethereal Surge", habit: "none" };
        }
        case "earth": {
            return { id: skillId, name: "Earthquake", habit: "none" };
        }
        case "frost": {
            return { id: skillId, name: "Chilling Frost", habit: "none" };
        }
        case "smash": {
            return { id: skillId, name: "Brutal Smash", habit: "lowest" };
        }
        case "defensiveStance": {
            return { id: skillId, name: "Defensive Stance", habit: "none" };
        }
        case "valorousPresence": {
            return { id: skillId, name: "Valorous Presence", habit: "none" };
        }
        case "intimidate": {
            return { id: skillId, name: "Intimidating Gaze", habit: "none" };
        }
        case "pickPocket": {
            return { id: skillId, name: "Pickpocket", habit: "highest" };
        }
        case "backStab": {
            return { id: skillId, name: "Backstab", habit: "highest" };
        }
        case "toolsOfTrade": {
            return { id: skillId, name: "Tools of the Trade", habit: "none" };
        }
        case "stealth": {
            return { id: skillId, name: "Stealth", habit: "none" };
        }
        case "heal": {
            return { id: skillId, name: "Healing Light", habit: "none" };
        }
        case "protectAura": {
            return { id: skillId, name: "Protective Aura", habit: "none" };
        }
        case "brightness": {
            return { id: skillId, name: "Searing Brightness", habit: "none" };
        }
        case "healAll": {
            return { id: skillId, name: "Blessing", habit: "none" };
        }
    }
}
