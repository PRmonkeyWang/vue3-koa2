import { MiddleWare } from '../type'

export type ResultInfo = {
  code:number;
  msg?:string;
  data?:any;
  err?:any
}

/**
 * 执行结果 handler 用来给每个响应对象包装响应码等
 */
export const ResultHandler: MiddleWare = () => async (ctx, next) => {
  const data:any = await next();
  ctx.body = data;
};