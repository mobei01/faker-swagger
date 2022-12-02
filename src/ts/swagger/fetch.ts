
import SwaggerClient from 'swagger-client';
import {inferSchema} from '../utils'
import { cloneDeep } from 'lodash';

function getSampleSchema(schema) {
  return cloneDeep(schema)
}

function parserParams(params) {
  const apiParams = params.map(param => {
    const schema = inferSchema(param)
    return {
      // ...param,
      example: schema ? getSampleSchema(schema) : null
    }
  })
  return apiParams
}
function parserResponsesV2(res) {
  const responses = cloneDeep(res)
  const codes = Object.keys(responses)
  codes.map(code => {
    const response = responses[code]
    const schema = inferSchema(response)
    response.example = schema ? getSampleSchema(schema) : null
  })
  return responses
}

function parserResponsesV3(res) {
  // TODO:
  // const responses = cloneDeep(res)
  // const codes = Object.keys(responses)
  // codes.forEach(code => {
  //   const response = responses[code]
  //   const schema = response.content?.['application/json'] && inferSchema(response.content['application/json'])
  //   response.example = schema ? getSampleSchema(schema) : null
  // })
  // return responses
}

function parserSpecV2V3(specV2v3) {
  const spec = cloneDeep(specV2v3)
  const {paths, openapi, basePath} = spec
  const isV3 = openapi === '3.0.0'
  const apiList = Object.keys(paths)

  const apiDoc = {
    basePath
  }
  apiList.forEach(url => {
    const method = Object.keys(paths[url])[0]
    const others = paths[url][method]

    const item = {
      apiUrl: url,
      method,
      // ...others,
      parameters: parserParams(others.parameters),
      responses: isV3 ? parserResponsesV3(others.responses) : parserResponsesV2(others.responses),
    }
    apiDoc[url] = item
  })
  return apiDoc
}

function parserSpecV1() {
  // TODO:
}

export default async function fetchUrl(url: string) {
  const res = await SwaggerClient(url)
  const spec = res.spec
  let apiDoc
  if(spec.swaggerVersion) {
    parserSpecV1()
  } else {
    apiDoc = parserSpecV2V3(spec)
  }
  return apiDoc
}