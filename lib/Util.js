const normalizeAngle = angle => {
  while (angle < 0) {
    
    angle += Math.PI * 2
  }
  return angle % (Math.PI * 2)
}

const inBound = (val, min, max) => {
  if (min > max) {
    return val >= max && val <= min
  }
  return val >= min && val <= max
}

const bound = (val, min, max) => {
  if (min > max) {
    return Math.min(Math.max(val, max), min)
  }
  return Math.min(Math.max(val, min), max)
}


const randRange = (min, max) => {
  if (min >= max) {
    return Math.random() * (min - max) + max
  }
  return Math.random() * (max - min) + min
}

const randRangeInt = (min, max) => {
  if (min > max) {
    return Math.floor(Math.random() * (min - max)) + max
  }
  return Math.floor(Math.random() * (max - min)) + min
}

const choiceArray = array => {
  return array[randRangeInt(0, array.length)]
}

module.exports = {
  normalizeAngle,
  inBound,
  bound,
  randRange,
  randRangeInt,
  choiceArray
}
