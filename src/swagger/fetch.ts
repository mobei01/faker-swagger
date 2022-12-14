import { IOpenAPI, IOperation, IResponses } from '../_types_/OpenAPI'
import {SchemaWithoutRef, FakeGenOutput, ApiDoc} from '../_types_/common'
import { Spec } from "swagger-schema-official";

import SwaggerClient from 'swagger-client';
import {inferSchema} from '../utils'
import { cloneDeep, mapValues, upperCase } from 'lodash';

type Codes = '200' | '201' | '401' | '403' | '404'

function parserResponsesV3(res: Record<Codes, SchemaWithoutRef>): SchemaWithoutRef {
  // TODO:
  let responses
  const codes = Object.keys(res)
  codes.forEach((code: Codes) => {
    if(code === '200') {
      const response = res[code]
      const schema = response.content?.['application/json'] && inferSchema(response.content['application/json'])
      responses = schema ? cloneDeep(schema) : null
      // response.example = schema ? cloneDeep(schema) : null
    }
  })
  return responses
}

function parserSpecV3(spec): Record<string, FakeGenOutput> {
  return
}

function parserResponsesV2(res: IResponses): SchemaWithoutRef {
  let responses: SchemaWithoutRef
  const codes = Object.keys(res)
  codes.forEach((code: Codes) => {
    if(code === '200') {
      const schema: SchemaWithoutRef = inferSchema(res[code])
      responses = schema ? cloneDeep(schema) : {}
    }
  })
  return responses
}

function parserSpecV2(spec: Spec): Record<string, FakeGenOutput> {
  const {paths, basePath} = spec

  const outputs: Record<string, FakeGenOutput> = {}
  mapValues(paths, (pathItem, pathName) => {
    mapValues(pathItem, (schema: IOperation, method) => {
      const url = `${basePath}${pathName}`
      outputs[url] = {
        operationId: schema.operationId,
        path: url,
        method: upperCase(method),
        summary: schema.summary,
        mocks: parserResponsesV2(schema.responses),
      }
    });
  });
  return outputs
}

function parserSpecV1() {
  // TODO:
}

export default async function fetchUrl(url: string) {
  const res: ApiDoc = await SwaggerClient(url)
  console.log(res);
  
  const spec: Spec | IOpenAPI = res.spec
  const {openapi} = spec as IOpenAPI
  let apiDoc: Record<string, FakeGenOutput>
  // if(spec?.swaggerVersion) {
  //   parserSpecV1()
  // } else {
    
  // }
  if(openapi) {
    apiDoc = parserSpecV3(spec as IOpenAPI)
  } else {
    apiDoc = parserSpecV2(spec as Spec)
  }
  return apiDoc
}