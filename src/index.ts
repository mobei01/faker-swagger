import parserSwagger from './swagger'
import {fakeData} from './faker/index'

parserSwagger('https://testgw.syounggroup.com/athena-service/v2/api-docs').then(apiDoc => {
  const url = '/athena-service//api/selfLiveMonthEffect/listDayEffect'
  const urlDoc = apiDoc[url]
  console.log(urlDoc);
  const result = fakeData(urlDoc.mocks)
  console.log(result);  
})
