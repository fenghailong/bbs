const cloud = require('wx-server-sdk');
cloud.init({
  env:'gwybbs-0gkv8q1q39862d8c'
});
const db = cloud.database();
const collection = db.collection('topics');

const addReply = async (data) => {
  console.log(data, '=============')
  const hasTopic = await collection.where({ _id: topic_id }).get();
  if (Array.isArray(hasTopic.data) && hasTopic.data.length === 0) {
    return "未找到话题"
  } else {
    console.log(hasTopic.data)
    // await collection.doc(data._id).update({
    //   data: {
    //     userInfo: data.userInfo
    //   }
    // });
  }
  return data.userInfo;
}


exports.main = async (event, context) => {
  const { func, data } = event;
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();
  let res;
  if (func === 'addReply') {
    res = await addReply(data);
  }
  return res;
}
