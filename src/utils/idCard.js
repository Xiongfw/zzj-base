/** 根据身份证算出年龄 */
export function getAgeByIdCard(idCard) {
  if (!idCard) return "";
  idCard = idCard.toString()
  var len = idCard.length;
  if (len == 0) {
    return 1;
  } else if ((len != 15) && (len != 18)) { //身份证号码只能为15位或18位其它不合法
    return 1;
  }

  var strBirthday = "";
  if (len == 18) { //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday = idCard.substr(6, 4) + "/" + idCard.substr(10, 2) + "/" + idCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + idCard.substr(6, 2) + "/" + idCard.substr(8, 2) + "/" + idCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/* 根据身份证获取生日 */
export function getBirthByIdCard(idCard, separator = '/') {
  if (!idCard) return "";
  idCard = idCard.toString()
  var len = idCard.length;
  var strBirthday = "";
  if (len == 18) {//处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday = idCard.substr(6, 4) + separator + idCard.substr(10, 2) + separator + idCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + idCard.substr(6, 2) + separator + idCard.substr(8, 2) + separator + idCard.substr(10, 2);
  }
  return strBirthday
}