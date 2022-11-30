import fetchUrl from "./fetch";


/**
 * @description: 
 * @return {*}
 * @param {string} url swagger文档地址
 */
export default async function parserSwagger(url: string) {
  if(!url) throw Error('swagger doc url is required');

  const apiList = await fetchUrl(url)
  console.log(apiList);
  return apiList
}