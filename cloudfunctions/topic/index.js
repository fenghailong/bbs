// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'gwybbs-0gkv8q1q39862d8c'
});
const db = cloud.database();
const collection = db.collection('topics');

const getTopics = async () => {
  const topics = await collection.get()
  return topics;
}

const getTopicById = async (_id) => {
  const topic = await collection.doc(_id).get();
  return topic;
}

exports.main = async (event, context) => {
  const { func, data } = event;
  console.log(data)
  // const { OPENID, APPID, UNIONID } = cloud.getWXContext();
  let res;
  if (func === 'getTopics') {
    res = await getTopics();
  }
  else if (func === 'getTopicById') {
    res = await getTopicById(data);
  }
  return res;
}

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   let data = await db.collection('topics').get()

//   return {
//     event,
//     data,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID
//   }
// }
