interface SimplePoInfo {
    type1: number;
    type2: number;
}

interface SimpleYard {
    cubes: number;
    lines: number;
}
interface SimplePoAge {
    lessThan24Hr: number;
    greaterThan24Hr: number;
}

const poInfo: SimplePoInfo = {
    type1: 600,
    type2: 800,
};

const yard: SimpleYard = {
    cubes: 123,
    lines: 321,
};

const poAge: SimplePoAge = {
    lessThan24Hr: 567,
    greaterThan24Hr: 764,
};

interface SimpleSchemaType {
    simpleYard: SimpleYard;
    simplePoAge: SimplePoAge;
    simplePoInfo: SimplePoInfo;
}

const simpleTestObject: SimpleSchemaType = {
    simpleYard: yard,
    simplePoAge: poAge,
    simplePoInfo: poInfo,
};

export { type SimpleSchemaType, simpleTestObject };
