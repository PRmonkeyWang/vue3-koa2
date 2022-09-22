import { post, prefix } from "../requestDecorator";
import accountList from "../mockdb/accountList";
@prefix('/user')
export default class User {
  @post('/create')
  async userCreate(ctx: any): Promise<any> {
    const { mobile } = ctx.request.body
    if (mobile) {
      return {
        data: {},
        "code": "000000",
        "message": "请求成功"
      }
    }

  }
  @post('/list')
  async userList() {
    return {
      data: accountList,
      "code": "000000",
      "message": "请求成功"
    }
  }

}