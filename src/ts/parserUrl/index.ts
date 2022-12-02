import parserResponse from './parserResponse'

export default function parserUrl(urlDoc) {
  const {responses} = urlDoc

  parserResponse(responses)
}