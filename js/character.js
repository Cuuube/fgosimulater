let zhendeAlter = new Hero({
    name: "贞德(alter)",
    attrbute: {
        work: "avenger",
        hiddenCamp: 'human',
        hp: 9352,
        atk: 10556,
        createStarsRate: 0.06,
        suddenDeadRate: 0.57,
        starsGetRate: 29,
        npGetRate: 0.0083,
        hurtNpGetRate: 0.05,
    },
    skills: {
        0: new Skill({
            name: "自我改造",
            effect: function(target) {
                setBuff(target.buff.critDemage, 0.2, 3);
                setBuff(target.buff.focusStar, 4, 3);
            }
        }),
        1: new Skill({
            name: "龙之魔女",
            effect: function(target) {
                target.forEach((Ying, index) => {
                    setBuff(Ying.buff.addDemage, Ying.buff.addDemage, 0.1, 3);
                    if (Ying.info.type.includes('dragon')) {
                        setBuff(Ying.buff.addDemage, Ying.buff.addDemage, Ying.buff.addDemage + 0.1, 3);
                    }
                })
            }
        }),
        2: new Skill({
            name: "泡沫般的梦幻",
            effect: function(target) {
                setBuff(target.buff.mofangR, target.buff.mofangR, 0.3, 1);
                setBuff(target.buff.wudi, target.buff.wudi, true, 1);
                target.buff.focusStar = 4;
            }
        })
    },
    cards: ['buster', 'buster', 'quick', 'art', 'art'],
    ace: {
        name: "燃烧吧，我的愤怒",
        type: "buster",
        lv: 1,
        effect: function(armys) {

        }
    },
    info: {
        star: 5,
        height: 159,
        weight: 44,
        camp: ['chaos', 'evil'],
        from: 'history',
        growing: 'up'
    },
    buff: {
        specialAtkBuff: {
            value: 0,
            round: 0,
        },
        criAddDemage: {
            value: 0,
            round: 0,
        },
        demageNum: {
            value: 0,
            round: 0,
        },
        defenceNum: {
            value: 0,
            round: 0,
        },
        addDemage: {
            value: 0,
            round: 0
        }
    }
});
let zhende = new Hero({
    name: "贞德",
    attrbute: {
        work: "ruler",
        hiddenCamp: 'human',
        hp: 10361,
        atk: 6056,
        createStarsRate: 0.11,
        suddenDeadRate: 0.21,
        starsGetRate: 100,
        npGetRate: 0.0076,
        hurtNpGetRate: 0.03,
    },
    skills: {
        0: new Skill({
            name: "启示",
            effect: function(battle) {
                setBuff(battle.buff.getStars, battle.buff.getStars, 3, 3);
            }
        }),
        1: new Skill({
            name: "真名看破",
            effect: function(army) {
                setBuff(army.buff.addDemage, army.buff.addDemage, -0.15, 3);

            }
        }),
        2: new Skill({
            name: "神明裁决",
            effect: function(target) {
                if (getRandom(0.7)) {
                    setBuff(target.buff.buzhundong, target.buff.buzhundong, true, 1);
                }
            }
        })
    },
    cards: ['quick', 'buster', 'art', 'art', 'art'],
    ace: {
        name: "吾主在此",
        type: "art",
        effect: function(armys) {

        }
    },
    info: {
        star: 5,
        height: 159,
        weight: 44,
        camp: ['order', 'kindness'],
        from: 'history',
        growing: 'down'
    },
    buff: {
        specialAtkBuff: {
            value: 0,
            round: 0,
        },
        criAddDemage: {
            value: 0,
            round: 0,
        },
        demageNum: {
            value: 0,
            round: 0,
        },
        defenceNum: {
            value: 0,
            round: 0,
        },
        addDemage: {
            value: 0,
            round: 0,
        },
        addDefence: {
            value: 0,
            round: 0,
        }
    }
});
console.log(zhendeAlter);