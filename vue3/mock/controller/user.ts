import { post, prefix } from "../requestDecorator";
import userList from "../mockdb/userList";
@prefix('/login')
export default class User {
  @post('/captcha')
  async getCode(ctx: any): Promise<any> {
    const { mobile } = ctx.request.body
    if (mobile) {
      return {
        data: {},
        "code": "000000",
        "message": "请求成功"
      }
    }

  }
  @post('/by-pwd')
  async login(ctx: any) {
    const { mobile } = ctx.request.body
    for (const user of userList) {
      if (user.user_info.mobile === mobile) {
        return {
          data: user,
          "code": "000000",
          "message": "请求成功"
        }
      }
    }
    return {
      data: {},
      "code": "400000",
      "message": "账户不存在"
    }
  }
  @post('/by-mobile')
  async loginByMobile(ctx: any) {
    const { mobile } = ctx.request.body
    for (const user of userList) {
      if (user.user_info.mobile === mobile) {
        return {
          data: user,
          "code": "000000",
          "message": "请求成功"
        }
      }
    }
    return {
      data: {},
      "code": "400000",
      "message": "账户不存在"
    }
  }

}