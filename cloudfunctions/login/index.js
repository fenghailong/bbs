// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env:'gwybbs-0gkv8q1q39862d8c'
});
const db = cloud.database();
const collection = db.collection('users');


const login = async (_openid) => {
  let user;
  const hasUser = await collection.where({ wechat_openid: _openid }).get();
  if (Array.isArray(hasUser.data) && hasUser.data.length === 0) {
    await collection.add({
      data: {
        wechat_openid: _openid,
        userInfo: {}
      }
    });
  } else {
    user = hasUser.data;
  }
  return user;
}


exports.main = async (event, context) => {
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();
  let res;
  res = await login(OPENID);
  return res;
}
