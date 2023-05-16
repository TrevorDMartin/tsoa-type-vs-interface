type Threshold = "HIGH" | "MEDIUM" | "LOW";

type Base = Record<
    string,
    {
        count: number;
        threshold?: Threshold;
    }
>;

interface PoInfo extends Base {
    type1: {
        count: number;
        threshold?: Threshold;
    };
    type2: {
        count: number;
        threshold?: Threshold;
    };
}

interface Yard extends Base {
    cubes: {
        count: number;
        threshold?: Threshold;
    };
    lines: {
        count: number;
        threshold?: Threshold;
    };
}
interface PoAge extends Base {
    lessThan24Hr: {
        count: number;
        threshold?: Threshold;
    };
    greaterThan24Hr: {
        count: number;
        threshold?: Threshold;
    };
}

const poInfo: PoInfo = {
    type1: {
        count: 600,
        threshold: "MEDIUM",
    },
    type2: {
        count: 800,
        threshold: "HIGH",
    },
};

const yard: Yard = {
    cubes: { count: 123 },
    lines: { count: 321 },
};

const poAge: PoAge = {
    lessThan24Hr: { count: 567 },
    greaterThan24Hr: { count: 765 },
};

interface ComplexSchemaType {
    yard: Yard;
    poAge: PoAge;
    poInfo: PoInfo;
}

const complexTestObject: ComplexSchemaType = {
    yard,
    poAge,
    poInfo,
};

export { type ComplexSchemaType, complexTestObject };
