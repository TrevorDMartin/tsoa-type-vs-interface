interface Yard {
    cubes: number;
    lines: number;
}
interface PoInfo {
    type1: number;
    type2: number;
}
interface PoAge {
    lessThan24Hr: number;
    greaterThan24Hr: number;
}

const yard: Yard = {
    cubes: 123,
    lines: 321,
};
const poInfo: PoInfo = {
    type1: 600,
    type2: 800,
};
const poAge: PoAge = {
    lessThan24Hr: 567,
    greaterThan24Hr: 764,
};

interface CollisionSchema {
    yard: Yard;
    poAge: PoAge;
    poInfo: PoInfo;
}
const collisionObject: CollisionSchema = {
    yard,
    poAge,
    poInfo,
};

export { type CollisionSchema, collisionObject };
