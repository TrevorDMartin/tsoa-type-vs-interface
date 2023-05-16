type Threshold = 'HIGH' | 'MEDIUM' | 'LOW';

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
    type4: {
        count: number;
        threshold?: Threshold;
    };
    type5: {
        count: number;
        threshold?: Threshold;
    };
    type6: {
        count: number;
        threshold?: Threshold;
    };
    type9: {
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
    // QUESTION: do we want to send this data or do the division in the front?
    cubesPerLine: {
        count: number;
        threshold?: Threshold;
    };
    /*
        From the table E537A_RCV_HDR,
        Find the cube count ORD_CUB_QTY filter by PO status 4,
        where landed date is >1/1/1900
    */
    cubesOnHold: {
        count: number;
        threshold?: Threshold;
    };
}
interface PoAge extends Base {
    total: {
        count: number;
        threshold?: Threshold;
    };
    // Select count of PO's in Status 0 and Status 14 where date < 24 hrs
    lessThan24Hr: {
        count: number;
        threshold?: Threshold;
    };
    // Select count of PO's in Status 0 and Status 14 where date > 24 hrs
    greaterThan24Hr: {
        count: number;
        threshold?: Threshold;
    };
    // Select count of PO's in Status 0 and Status 14 where date > 48 hrs
    greaterThan48Hr: {
        count: number;
        threshold?: Threshold;
    };
    // Select count of PO's in Status 0 and Status 14 where date > 96 hrs
    greaterThan96Hr: {
        count: number;
        threshold?: Threshold;
    };
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RgmViewData = {
    yard: Yard;
    poAge: PoAge;
    poInfo: PoInfo;
}

const mockPoInfo: PoInfo = {
    type1: {
        count: 800,
        threshold: 'HIGH',
    },
    type2: {
        count: 990,
        threshold: 'HIGH',
    },
    type4: {
        count: 602,
        threshold: 'LOW',
    },
    type5: {
        count: 603,
        threshold: 'LOW',
    },
    type6: {
        count: 795,
        threshold: 'MEDIUM',
    },
    type9: {
        count: 802,
        threshold: 'HIGH',
    },
};

const mockYard: Yard = {
    cubes: {
        count: 1251947,
    },
    lines: {
        count: 9171,
    },
    cubesPerLine: {
        count: 136,
    },
    cubesOnHold: {
        count: 6020,
    },
};

const mockPoAge: PoAge = {
    total: {
        count: 1012,
    },
    lessThan24Hr: {
        count: 324,
    },
    greaterThan24Hr: {
        count: 260,
    },
    greaterThan48Hr: {
        count: 242,
    },
    greaterThan96Hr: {
        count: 186,
    },
};

const mockRgmViewData: RgmViewData = {
    yard: mockYard,
    poAge: mockPoAge,
    poInfo: mockPoInfo,
};

export {
    type RgmViewData,
    mockRgmViewData
};

// interface PutToStoreVolume {
//     // Paint Total under Cube in Receiving Schedule summary report
//     paintPtsPo: number
//     // Paint Total under Ship Units in Receiving Schedule summary report
//     paintPtsCtn: number
//     // PandA Total under Cube in Receiving Schedule summary report
//     pnaCube: number
//     // PandA Total under Ship Units in Receiving Schedule summary report
//     pnaCtn: number
//     // Same as "102's" below but would be class "110" (Ctn=Ship Unit)
//     pclnCtnsRecSch: number
//     // show Total Cartons
//     pclnCtnsBuildPick: number
// }

// interface ReceivingSchedule {
//     // Total Cube received (PO status 0 + PO Status 14) on MySCRV first page
//     cubeSchedule: number
//     // Total Cartons received (PO status 0 + PO Status 14) on MySCRV first page
//     cartonSchedule: number
//     // The dock group info will change depending upon the DC location
//     lowDockCtn: number
//     midDockCtn: number
//     highDockCtn: number
//     backDockCtn: number
// }

// interface Inbound {
//     landedYesterday: number
//     // See "Total Cube" logic to calculate PO Status 0 Cube units
//     status0: number
//     // See "Total Cube" logic to calculate PO Status 14 Cube units
//     status14: number
//     total: number
// }

// // Also referred to as Demand in Feature
// interface Outbound {
//     // Total Cube Demand for the given DC site
//     totalDemand: number
//     demandPerStore: number
//     unavailableDemand: number
//     trailerOnYard: number
//     totalOutbound: number
// }

// interface BuildingUpdate {
//     inventoryCube: number
//     inventoryDollar: number
//     totalAllocDemandCube: number
//     ctnsNotAllocInBuilding: number
//     wavesOver5Day: number
//     buildingUtilized: number
// }

// interface PutawayAndReplenishment {
//     totalPutaway: number
//     bulkPutaway: number
//     permRackPutaway: number
//     sdcPutaway: number
//     totalReplenishment: number
//     totalMoves: number
// }

// interface AllocatedBuildingPick {
//     totalPick: number
//     sdcPick: number
//     permRes: number
//     forwardPick: number
//     buildPick: number
//     ncRhtk: number
//     soeOrder: number
// }

// interface ShiftPerformance {
//     cubeRec: number
//     cubeShip: number
//     ctnsRec: number
//     ctnsShip: number
//     recCubePerCtn: number
//     shipCubePerCtn: number
// }

// interface WorkInProgress {
//     ctnsStage: number
//     cubeStage: number
//     vpcdStage: number
//     trailerMove: number
//     missingCtns: number
// }
