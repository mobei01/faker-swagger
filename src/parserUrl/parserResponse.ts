import {fakeData} from '../faker/index'

type StringRes = {
  description: string,
  example: {
    type: 'string',
    description?: string
  }
}
type ObjRes = {
  description: string,
  example: {
    type: 'object',
    properties: object // TODO:
  }
}
type ArrRes = {
  description: string,
  example: {
    type: 'array',
    items: [] // TODO:
  }
}
type Codes = '200' | '201' | '401' | '403' | '404'
type Response = {
  description: string,
  example: StringRes | ObjRes | ArrRes
}

function parser200(responses: Response) {
  const result = fakeData(responses.example)
  console.log(result);
  
  return result
}

export default function parserResponse(responses: Record<Codes, Response>) {
  console.log(responses);
  const codes = Object.keys(responses)

  let response: Record<Codes, any> = {
    200: {},
    201: {},
    401: {},
    403: {},
    404: {}
  }
  codes.forEach((code: Codes) => {
    if(code === '200') {
      response[code] = parser200(responses[code])
    } else {
      response[code] = responses[code].example
    }
  })
  
}