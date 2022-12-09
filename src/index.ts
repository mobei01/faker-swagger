import parserSwagger from './swagger'
import parserUrl from './parserUrl';

parserSwagger('https://testgw.syounggroup.com/athena-service/v2/api-docs').then(apiDoc => {
  const url = '/api/selfLiveMonthEffect/listDayEffect'
  const urlDoc = apiDoc[url]
  parserUrl(urlDoc)
})

// module.exports = {
//   name:"西瓜"
// }

// export const a = () => {}

// export default 