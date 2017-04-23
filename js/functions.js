function setBuff(target, person, value, time) {
    let obj = {
        target: target,
        person: person,
        value: value,
        time: time,
    };
    battle.buff.buffList.push(obj);
}

function getRandom(percent) { //percent为小数
    let ranNum = Math.random();
    console.log(ranNum, percent);
    return (percent >= ranNum);
}

function causeDemage(attcker, attcken) {


}