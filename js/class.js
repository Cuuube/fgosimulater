class Hero {
    constructor(obj) {
        this.name = obj.name;
        this.attrbute = obj.attrbute;
        this.skills = obj.skills;
        this.cards = [new Card(obj.cards[0], this),
            new Card(obj.cards[1], this),
            new Card(obj.cards[2], this),
            new Card(obj.cards[3], this),
            new Card(obj.cards[4], this)
        ],
        this.ace = obj.ace;
        this.info = obj.info;
        this.buff = $.extend(true, {}, {
            specialAtkBuff: new Buff(0),
            criAddDemage: new Buff(0),
            demageNum: new Buff(0),
            defenceNum: new Buff(0),
            addDemage: new Buff(0),
            addDefence: new Buff(0),
            aceAtkBuff: new Buff(0),
            cardExplode: {
                'buster': new Buff(0),
                'quick': new Buff(0),
                'art': new Buff(0),
            }
        }, obj.buff);
    }

}
class Skill {
    constructor(obj) {
        this.lv = 1;
        this.name = obj.name;
        this.effect = obj.effect;
    }
}
class Card {
    constructor(type, owner) {
        this.type = type;
        this.owner = owner;
    }
}
class Battle {
    constructor(ourHeroList, army) {
        this.ourHeroList = ourHeroList,
            this.army = army,
            this.round = 1,
            this.buff = {
                getStars: 0,
                buffList: [],
            }
    }
}
class Buff {
    constructor(value, time) {
        this.value = value;
        this.time = time || 0;
    }
}