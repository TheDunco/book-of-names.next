import firebase from "../../../firebase/clientApp";
import { v4 as uuidv4 } from "uuid";
import { AppConfig } from "@/utils/AppConfig";

export const newBlankCharacter = (
    userId: string | undefined,
    playerName: string | null | undefined
) => {
    const cid = uuidv4();
    if (!userId) {
        throw new Error("User ID is required to create a new character");
    }
    if (playerName === undefined) {
        throw new Error("Player name is required to create a new character");
    }
    firebase
        .firestore()
        .collection("characters")
        .doc(cid)
        .set({
            name: "Blank",
            class: "",
            xp: 0,
            level: 1,
            spellcastingAbility: "Intelligence",
            proficiencyAblility: "Intelligence",
            languages: "Common",
            miscProfs: "",
            health: {
                hpMax: 10,
                hpCurrent: 10,
                hitDiceCurrent: 0,
                hitDiceMax: 1,
                deathSaveFails: 0,
                deathSaveSuccesses: 0,
                hitDiceType: 8,
                hpTemp: 0,
            },
            abilityScores: {
                charisma: 10,
                constitution: 10,
                dexterity: 10,
                intelligence: 10,
                strength: 10,
                wisdom: 10,
            },
            summary: {
                age: "",
                alignment: "",
                background: "",
                class: "",
                eyes: "",
                hair: "",
                height: "",
                race: "",
                skin: "",
                weight: "",
                speed: 30,
            },
            defenses: {
                armorBonus: 0,
                armorName: "",
                miscBonus: 0,
                miscName: "",
                shieldBonus: 0,
                shieldName: "",
            },
            initiative: 0,
            ac: 10,
            proficiencies: [""],
            proficiencyBonus: 2,
            abilityList: [],
            notesList: [
                {
                    title: "Greetings!",
                    description:
                        "Thank you so much for using our character sheet",
                },
            ],
            featsList: [],
            equipmentList: [],
            money: {
                copperAmount: 0,
                silverAmount: 0,
                goldAmount: 0,
                platinumAmount: 0,
            },
            //TODO: no action list
            tracklist: [
                {
                    name: "Inspiration",
                    type: "checkboxes",
                    description:
                        "Inspiration is given out by the DM for good role playing. It allows you to re-roll one d20 roll",
                    max: 1,
                    current: 0,
                },
            ],
            round: {
                action: false,
                bonusAction: false,
                reaction: false,
                initiative: [""],
            },
            spellList: [],
            highestLevelSpell: 0,
            preppedSpells: 0,
            id: cid,
            imageLink:
                "https://m.mythcreants.com/wp-content/uploads/2013/10/mysterman-180x135.png",
            currentVersion: AppConfig.version,
            createdVersion: AppConfig.version,
            createdByUser: userId,
            allowedUsers: [userId],
            accordionSortOrder: [],
            campaigns: [],
            pc: playerName,
            gameVersion: "5e",
        });

    firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
            characters: firebase.firestore.FieldValue.arrayUnion(cid),
        });
};
