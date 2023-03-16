const appname = "代码生成器";
const data = {
  appname,
  title: "ZH-"+appname,
  keywords: 'ZH代码生成器',
  description: 'KOA TS NUXT3.0 VITE PINIA ELEMENT PLUS'
};
const buildMeta = ( params)=>{
  const metaArray = [];
  if( params.title){
    metaArray.push({ property: 'og:title', content: params.title});
  }
  if( params.keywords){
    metaArray.push({ name: 'keywords', content: params.keywords});
    metaArray.push({ property: 'og:keywords', content: params.keywords});
  }
  if( params.description){
    metaArray.push({ name: 'description', content: params.description});
    metaArray.push({ property: 'og:description', content: params.description});
  }
  return metaArray;
}
export default {
  data,
  buildMeta
}