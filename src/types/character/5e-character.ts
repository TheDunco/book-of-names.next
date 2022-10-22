export interface Character {
    livingState: LivingStateEnum;
    name: string;
    class: string;
    unconscious: boolean;
    dead: boolean;
    xp: number;
    level: number;
    spellcastingAbility: string;
    languages: string;
    miscProfs: string;
    health: Health;
    abilityScores: AbilityScores;
    skills: Skills;
    summary: Summary;
    defenses: Defense;
    initiative: number;
    ac: number;
    proficiencies: string[];
    proficiencyBonus: number;
    abilityList: Ability[];
    notesList: Note[];
    featsList: Feat[];
    equipmentList: Equipment[];
    money: Money;
    actionList: Action[];
    tracklist: Trackable[];
    spellList: Spell[];
    highestLevelSpell: number;
    preppedSpells: number;
    id: string;
    imageLink: string;
    round: Round;
    currentVersion: string;
    createdVersion: string;
    createdByUser: string;
    allowedUsers: [string];
    accordionSortOrder: [string];
    campaigns: [string];
    pc: string;
    gameVersion: string;
}

export enum Accordions {
    HEALTH = "health",
    HIT_DICE = "hitDice",
    DEATH_SAVES = "deathSaves",
    SUMMARY = "summary",
    TRACKABLES = "trackables",
    ABILITY_SCORES = "abilityScores",
    DEFENSES = "defenses",
    EQUIPMENT = "equipment",
    NOTES = "notes",
    ROUND_TRACKER = "roundTracker",
    SPELLS = "spells",
    ABILITIES = "abilities",
    FEATS = "feats",
    SKILLS = "skills",
    PROFICIENCY = "proficiency",
}

export enum LivingStateEnum {
    ALIVE = "Alive",
    DEAD = "Dead",
    UNDEAD = "Undead",
    UNKNOWN = "Unknown",
}

export interface Defense {
    armorName: string;
    armorBonus: number;
    shieldName: string;
    shieldBonus: number;
    miscName: string;
    miscBonus: number;
}

export enum SpellSchoolEnum {
    ABJURATION = "Abjuration",
    CONJURATION = "Conjuration",
    DIVINATION = "Divination",
    DUNAMANCY = "Dunmancy",
    ENCHANTMENT = "Enchantment",
    EVOCATION = "Evocation",
    ILLUSION = "Illusion",
    NECROMANCY = "Necromancy",
    TRANSMUTATION = "Transmutation",
}

export interface Spell {
    name: string;
    summary: string;
    description: string;
    level: number;
    prepared: boolean;
    school: SpellSchoolEnum;
    apiUrl: string;
}

export enum AbilityScoresEnum {
    STRENGTH = "Strength",
    DEXTERITY = "Dexterity",
    CONSTITUTION = "Constitution",
    INTELLIGENCE = "Intelligence",
    WISDOM = "Wisdom",
    CHARISMA = "Charisma",
}

export interface AbilityScore {
    name: AbilityScoresEnum;
    value: number;
    proficient: boolean;
}

export interface AbilityScores {
    scores: Record<AbilityScoresEnum, AbilityScore>;
}

export enum SkillsEnum {
    ACROBATICS = "Acrobatics (Dex)",
    ANIMAL_HANDLING = "Animal Handling (Wis)",
    ARCANA = "Arcana (Int)",
    ATHLETICS = "Athletics (Str)",
    DECEPTION = "Deception (Cha)",
    HISTORY = "History (Int)",
    INSIGHT = "Insight (Wis)",
    INTIMIDATION = "Intimidation (Cha)",
    INVESTIGATION = "Investigation (Int)",
    MEDICINE = "Medicine (Wis)",
    NATURE = "Nature (Int)",
    PERCEPTION = "Perception (Wis)",
    PERFORMANCE = "Performance (Cha)",
    PERSUASION = "Persuasion (Cha)",
    RELIGION = "Religion (Int)",
    SLEIGHT_OF_HAND = "Sleight of Hand (Dex)",
    STEALTH = "Stealth (Dex)",
    SURVIVAL = "Survival (Wis)",
}

export interface Skill {
    name: SkillsEnum;
    value: number;
    proficient: boolean;
    halfProficient: boolean;
    expertise: boolean;
}

export interface Skills {
    scores: Record<SkillsEnum, Skill>;
}

export interface NSD {
    name: string;
    summary: string;
    description: string;
}

export interface Ability {
    words: NSD;
}

export interface Health {
    hpCurrent: number;
    hpMax: number;
    hpTemp: number;
    hitDiceCurrent: number;
    hitDiceType: number;
    deathSaveFails: number;
    deathSaveSuccesses: number;
}

export interface CurrencyValue {
    name: string;
    value: number;
    currentAmount: number;
}

export interface Money {
    CurrencyValues: CurrencyValue[];
}

export enum EquipmentTypeEnum {
    ARMOR = "Armor",
    WEAPON = "Weapon",
    CONSUMABLE = "Consumable",
    OTHER = "Other",
    GEAR = "Gear",
    TOOL = "Tool",
    NONE = "None",
    MISC = "Misc",
}

export interface Equipment {
    name: string;
    description: string;
    quantity: number;
    carried: boolean;
    weight: number;
    equipType: EquipmentTypeEnum;
    equipped: boolean;
}

export enum AlignmentEnum {
    LAWFUL_GOOD = "Lawful Good",
    NEUTRAL_GOOD = "Neutral Good",
    CHAOTIC_GOOD = "Chaotic Good",
    LAWFUL_NEUTRAL = "Lawful Neutral",
    TRUE_NEUTRAL = "True Neutral",
    CHAOTIC_NEUTRAL = "Chaotic Neutral",
    LAWFUL_EVIL = "Lawful Evil",
    NEUTRAL_EVIL = "Neutral Evil",
    CHAOTIC_EVIL = "Chaotic Evil",
}

export interface Summary {
    age: string;
    height: string;
    weight: string;
    eyes: string;
    hair: string;
    skin: string;
    race: string;
    class: string;
    alignment: AlignmentEnum | string;
    background: string;
    speed: number;
    other?: string;
}

export interface Level {
    xp: number;
    level: number;
    class: number;
}

export interface Note {
    words: NSD;
}

export interface Feat {
    words: NSD;
    detail: string;
}

export enum ActionTypesEnum {
    POWER = "Power",
    SPELL = "Spell",
    MELEE = "Melee",
    RANGED = "Ranged",
    PASSIVE = "Passive",
    MAGIC_ITEM = "Magic Item",
    MAGIC = "Magic",
    POTION = "Potion",
    SPECIAL = "Special",
    OTHER = "Other",
}

export interface Action {
    words: NSD;
    actionType: ActionTypesEnum;
    damage: string;
    damageType: string;
    toHit: number;
    abilityScore: AbilityScoresEnum;
    damageMisc: number;
    hitMisc: number;
}

export interface Trackable {
    name: string;
    type: "checkboxes" | "number";
    description: string;
    max: number;
    current: number;
}

export interface Round {
    action: boolean;
    bonusAction: boolean;
    reaction: boolean;
    initiative: string[];
}
