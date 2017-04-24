function setBuff(target, type, value, time) {
    // let obj = {
    //     target: target,
    //     value: value,
    //     time: time,
    // };
    target.buff[type] = {
        value: value,
        time: time,
    }
    //battle.buff.buffList.push(obj);
}
function setWorkFix(self) {
    switch (self) {
        // case 'saber':
        // case 'rider':
        // case 'shelder':
        //     return 1;
        case 'lancer': 
            return 1.05;
        case 'archer':
            return 0.95;
        case 'caster':
        case 'assassin':
            return 0.9;
        case 'berserk':
        case 'ruler':
        case 'avenger':
            return 1.1;
        default:
            return 1;
    }
}
function setCampDemage(self, target) {
    if ((self === target) || 
        (self == 'star' && target != 'beast')) {
        return 1;
    }else if ((self == 'sky' && target == 'earth') || 
        (self == 'earth' && target == 'human') || 
        (self == 'human' && target == 'sky') ||
        (self == 'star' && target == 'beast')) {
        return 1.1;
    }else {
        return 0.9;
    }
}
function setWorkEffect(self, target) {
    let upThree = ['saber', 'lancer', 'archer'],
        downThree = ['rider', 'caster', 'assassin'];
    if ((self == 'saber' && target == 'lancer') || 
        (self == 'lancer' && target == 'archer') || 
        (self == 'archer' && target == 'saber') ||
        (self == 'rider' && target == 'caster') ||
        (self == 'caster' && target == 'assassin') ||
        (self == 'assassin' && target == 'rider') || 
        (self == 'avenger' && target == 'ruler') ||
        (self != 'shelter' && target == 'berserk')){
        return 2;
    } else if (self == 'berserk' && target != 'shelder'){
        return 1.5;
    } else if ((self == 'archer' && target == 'lancer') || 
        (self == 'saber' && target == 'archer') || 
        (self == 'lancer' && target == 'saber') ||
        (self == 'assassin' && target == 'caster') ||
        (self == 'rider' && target == 'assassin') ||
        (self == 'caster' && target == 'rider') || 
        (self != 'avenger' && self != 'berserk' && target == 'ruler')) {
            return 0.5
    } else {
        return 1;
    }
}
function isMatchInRandom(percent) { //percent为小数
    let ranNum = Math.random();
    //console.log(ranNum, percent);
    return (percent >= ranNum);
}
function getRandomInRate(rate) {
    return 1 + Math.random()*rate-rate/2;
}

function causeDemage(cardType, attacker, attacken, isAce, criPer ,firstCardFix, nth) {
    let demageTimes = {
        'buster': 1.5 * (1.5 + 0.3 * (nth-1)),
        'quick': 0.8 * (0.8 + 0.16 * (nth-1)),
        'art': 1 * (1 + 0.2 * (nth-1)),
    };
    let atk = attacker.attrbute.atk,//面板攻击
        workFix = setWorkFix(attacker.attrbute.work),//职介补正
        workEffect = setWorkEffect(attacker.attrbute.work, attacken.attrbute.work),//职介克制
        campDemage = setCampDemage(attacker.attrbute.hiddenCamp, attacken.attrbute.hiddenCamp),//隐藏阵营补正
        cardExplode = attacker.buff.cardExplode[cardType].value,//魔放加成
        addDemage = attacker.buff.addDemage.value,//增伤buff
        addDefence = attacken.buff.addDefence.value,//增防buff
        criFix = 1,// 暴击发生，提供20掉落星星补正
        exAttackFix = nth === 4 ? 1 : 1,//ex攻击加成
        specialAtkBuff = attacker.buff.specialAtkBuff.value,//特攻加成
        criAddDemage = 1 + attacker.buff.criAddDemage.value,//爆伤加成
        isCri = isMatchInRandom(criPer) === true ? 1 : 0,//是否暴击
        demageNum = 0 + attacker.buff.demageNum.value,//固定加伤
        defenceNum = 0 + attacken.buff.defenceNum.value,//固定减防
        redChain = 0;//红chain
    
    if (!isAce) {
        let demage = atk * 0.23 * (firstCardFix + (demageTimes[cardType] * (1 + cardExplode))) * workFix * workEffect * campDemage * (1 + addDemage - addDefence ) * criFix * exAttackFix * (1 + specialAtkBuff + criAddDemage * isCri) * getRandomInRate(0.1) + demageNum - defenceNum + redChain;
        //console.log(`atk${atk} * 0.23 * (首卡补正(${firstCardFix} + 卡类型(${demageTimes[cardType]} * (1 + 魔放${cardExplode}))) * 职介补正${workFix} * 职介克制${workEffect} * 阵营克制${campDemage} * (1 + 增伤buff${addDemage} - 增防buff${addDefence} ) * 暴击修正${criFix} * ex攻击修正${exAttackFix} * (1 +特攻buff ${specialAtkBuff} + 暴击增伤${criAddDemage} * 是否暴击${isCri}) * 随机波动${getRandomInRate(0.1)} + 固定增伤${demageNum} - 固定加防${defenceNum} + 红chain增伤${redChain}`);
        return demage;
    } else {
        let acePercent = attacker.ace.percent,
            specialAtk = attacker.ace.specialAtk,
            aceAtkBuff = attacker.buff.aceAtkBuff.value;
        let demage = atk * 0.23 * acePercent * (demageTimes[cardType] * (1 + cardExplode)) * workFix * workEffect * campDemage * (1 + addDemage - addDefence ) * (1 + specialAtkBuff + aceAtkBuff)*specialAtk * getRandomInRate(0.1) + demageNum - defenceNum;
        return demage;
    }
    
}
//一张指令卡的伤害：面板ATK*0.23*（首位BUFF+（卡牌伤害倍率*（1+卡牌加成BUFF）））*职阶补正*职阶克制*隐藏阵营克制*（1+攻击力BUFF-防御力BUFF）*暴击补正*EX攻击加成*（1+特攻BUFF加成+暴击伤害加成*是否暴击）*随机数 + 固定伤害+固定伤害减免+红Chain加成面板ATK
//宝具的伤害：面板ATK)* 宝具伤害系数 * (卡牌伤害倍率*（1+卡牌加成BUFF）) *（1+攻击力BUFF-防御力BUFF）* 职阶加成倍率* 职阶克制倍率* 天地人属性的克制倍率 * （1+特攻BUFF倍率+宝具威力加成）*宝具特攻倍率*0.23*随机数）+固定伤害+固定伤害减免