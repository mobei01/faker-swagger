import { Spec } from "swagger-schema-official";
import { IOpenAPI } from './OpenAPI';
export interface ApiDoc {
    apis: object;
    errors: any[];
    originalSpec: any;
    spec: Spec | IOpenAPI;
    url: string;
}
