import { ISchema, IOpenAPI } from "./OpenAPI";
import { Spec } from "swagger-schema-official";

export interface ApiDoc {
  apis: object,
  errors: any[],
  originalSpec: any,
  spec: Spec | IOpenAPI,
  url: string
}
export interface SchemaWithoutRef extends ISchema {
  not?: ISchema;
  allOf?: Array<ISchema>;
  oneOf?: Array<ISchema>;
  anyOf?: Array<ISchema>;
  items?: ISchema;
  properties?: {
    [k: string]: ISchema;
  };
  propertyNames?: ISchema;
  additionalProperties?: ISchema | boolean;
}

export interface FakeGenOutput {
  operationId: string;
  path: string;
  method: string;
  summary?: string;
  mocks?: SchemaWithoutRef;
}

export interface SwaggerFakerConfig {
  sourcePaths: string[];
  outputFolder: string;
  timeout: number;
  port: number;
}
