import { HttpStatusCode } from "@src/utility/HttpStatusCode";
import { Controller, Get, Route } from "tsoa";
import { ComplexSchemaType, complexTestObject } from "./ComplexTypes";
import { SimpleSchemaType, simpleTestObject } from "./SimpleTypes";
import { CollisionSchema, collisionObject } from "./CollisionTypes";

@Route()
class SchemaTestController extends Controller {
    /**
     * Returns an object containing 3 nested objects.
     * The nested objects all extend the same base type.
     * When the parent object is an interface, the first child object type gets added to the other two.
     * When he parent object is a type there's no issue
     */
    @Get("/complex-schema")
    public getComplexSchema(): ComplexSchemaType {
        return complexTestObject;
    }
    /**
     * Returns an object containing 3 nested objects.
     * The nested objects DO NOT extend anything and are simple objects containing some fields with number values
     * No issue on this schema
     */
    @Get("/simple-schema")
    public getSimpleSchema(): SimpleSchemaType {
        return simpleTestObject;
    }
    /**
     * Returns an object containing 3 nested objects.
     * The return object is identical to the one from "/simple-schema" with one difference.
     * The Types of the nested objects, although the same as "/simple-schema" are given the same variable names as "/complex-schema"
     * The schema is overridden by the schema from "/complex-schema"
     */
    @Get("/collision-schema")
    public getCollisionSchema(): CollisionSchema {
        return collisionObject;
    }
}

export { SchemaTestController };
