// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'gwybbs-0gkv8q1q39862d8c'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let data = await db.collection('topics').get()

  return {
    event,
    data,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
}
