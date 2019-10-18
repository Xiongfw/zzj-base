import axios from '../request'
import Constants from '@/constants/index'

const baseUrl = Constants.service_window_url + '/cust/'

export default {
  /**
   * 自助机登录二维码获取ZZJ_GetLoginUrl
   */
  ZZJ_GetLoginUrl(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_GetLoginUrl', { params, options })
  },
  /**
   * 自助机登录查询ZZJ_LoginQuery
   */
  ZZJ_LoginQuery(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_LoginQuery', { params, options })
  },
  /**
   * 获取住院证数据IF_Guidance_Info
   */
  IF_Guidance_Info(params, options = {}) {
    return axios.get(baseUrl + 'IF_Guidance_Info', { params, options })
  },
  /**
   * 60.5 ZZJ_Get_ZhuYuan_List 通过就诊卡号获取住院信息
   */
  ZZJ_Get_ZhuYuan_List(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_ZhuYuan_List', { params, options })
  },
  /**
   * 53.1 确认住院号ZZJ_Confirm_AdmissionNumber 通过腕带（住院号）获取住院信息
   */
  ZZJ_Confirm_AdmissionNumber(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Confirm_AdmissionNumber', { params, options })
  },
  /**
   * 五官科扫码验证登录
   */
  IF_Get_BindCardPatInfo(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_BindCardPatInfo', { params, options })
  },
  /**
   * 50.1、获取挂号号源
   */
  IF_Get_Regist_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Regist_Resource', { params, options })
  },
  /**
   * 50.1、获取预约号源
   */
  IF_Get_Booking_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Booking_Resource', { params, options })
  },
  /**
   * 50.3、获取医生挂号号源
   */
  IF_Get_Regist_Doc_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Regist_Doc_Resource', { params, options })
  },
  /**
   * 50.3、获取医生预约号源
   */
  IF_Get_Booking_Doc_Resource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Booking_Doc_Resource', { params, options })
  },
  /**
   * 50.2、获取科室挂号号源
   */
  IF_Get_Regist_Dept_NoSource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Regist_Dept_NoSource', { params, options })
  },
  /**
   * 50.2、获取科室预约号源
   */
  IF_Get_Booking_Dept_NoSource(params, options = {}) {
    return axios.get(baseUrl + 'IF_Get_Booking_Dept_NoSource', { params, options })
  },
  /**
   * 51.1 查询未交费记录
   */
  ZZJ_Get_Uncharge_Trade_List(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_Uncharge_Trade_List', { params, options })
  },
  /**
   * 51.2 确认订单
   */
  ZZJ_Check_Hospital_Trade(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Check_Hospital_Trade', { params, options })
  },
  /**
   * 51.3交易查询
   */
  ZZJ_Barcode_Pay_State(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Barcode_Pay_State', { params, options })
  },
  /**
   * 51.4交易撤销
   */
  ZZJ_Barcode_Pay_Cancel(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Barcode_Pay_Cancel', { params, options })
  },
  /**
   * 51.5交易查询
   */
  ZZJ_Barcode_Pay_Query(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Barcode_Pay_Query', { params, options })
  },
  /**
   * 52.1确认就诊卡
   */
  ZZJ_Confirm_MedicalCard(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Confirm_MedicalCard', { params, options })
  },
  /**
   * 52.2 确认充值
   */
  ZZJ_Charge_MedicalCard(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Charge_MedicalCard', { params, options })
  },
  /**
   * 53.2 确认充值(住院)
   */
  ZZJ_Charge_AdmissionNumber(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Charge_AdmissionNumber', { params, options })
  },
  /**
   * 55.1 获取账单列表
   */
  ZZJ_Get_Bill(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_Bill', { params, options })
  },
  /**
   * 56.1 签到
   */
  ZZJ_SignIn(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_SignIn', { params, options })
  },
  /**
   * 50.6 获取患者挂号列表
   */
  ZZJ_Get_Patient_Regist_List(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_Patient_Regist_List', { params, options })
  },
  /**
   * 50.4确认挂号
   */
  ZZJ_Confirm_Regist(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Confirm_Regist', { params, options })
  },
  /**
   * 50.5取消挂号
   */
  ZZJ_Cancel_Regist(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Cancel_Regist', { params, options })
  },
  /**
   * 56.2 获取签到列表
   */
  ZZJ_Get_SignIn_List(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_SignIn_List', { params, options })
  },
  /**
   * 57.1校验是否建档
   */
  ZZJ_Check_IDCard(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Check_IDCard', { params, options })
  },
  /**
   * 57.2建档办卡
   */
  ZZJ_CreateMedicalCard(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_CreateMedicalCard', { params, options })
  },
  /**
   * 57.3获取病人类型
   */
  ZZJ_Get_BRLXDM(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_BRLXDM', { params, options })
  },
  /**
   * 非硬件模式住院充值登录
   */
  ZZJ_GetYhYzLogin(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_GetYhYzLogin', { params, options })
  },
  /**
   * 58.1扫码绑定卡号
   */
  IF_FWC_BindCardNoByQrCode(params, options = {}) {
    return axios.get(baseUrl + 'IF_FWC_BindCardNoByQrCode', { params, options })
  },
  /**
   * 获取住院日清单列表
   */
  ZZJ_Get_ZhuYuan_DailyCost_List(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_ZhuYuan_DailyCost_List', { params, options })
  },
  /**
   * 获取住院日清单详情
   */
  ZZJ_Get_ZhuYuan_DailyCost_Detail(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_ZhuYuan_DailyCost_Detail', { params, options })
  },
  /**
   * 获取住院总费用列表
   */
  ZZJ_Get_ZhuYuan_ToTalCost_List(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_ZhuYuan_ToTalCost_List', { params, options })
  },
  /**
   * 获取住院总费用详情
   */
  ZZJ_Get_ZhuYuan_ToTalCost_Detail(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_ZhuYuan_ToTalCost_Detail', { params, options })
  },
  /**
   * 获取门诊清单列表
   */
  ZZJ_Get_OutPatient_Charged_Trade_List(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_OutPatient_Charged_Trade_List', { params, options })
  },
  /**
   * 获取门诊清单详情
   */
  ZZJ_Get_OutPatient_Charged_Trade_Detail(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_OutPatient_Charged_Trade_Detail', { params, options })
  },
  /**
   * 获取患者挂号费
   */
  ZZJ_Get_Patient_RegistFee(params, options = {}) {
    return axios.get(baseUrl + 'ZZJ_Get_Patient_RegistFee', { params, options })
  },
}