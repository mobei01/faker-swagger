import parserSwagger from './swagger'
import parserUrl from './parserUrl';

parserSwagger('https://testgw.syounggroup.com/athena-service/v2/api-docs').then(apiDoc => {
  console.log(apiDoc);
  const url: string = '/api/brandManageBoard/todoList'
  const urlDoc = apiDoc[url]
  parserUrl(urlDoc)
})



// export default 