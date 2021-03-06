import axios from "../request";
import Constants from "@/constants/index";

const baseUrl = Constants.service_window_url;

export default {
  /**
   * 22.1、获取预约资源
   */
  IF_Get_Booking_Resource(params, options = {}) {
    return axios({
      method: "get",
      url: baseUrl + "IF_Get_Booking_Resource",
      params,
      options: { log: false, ...options }
    });
  },
  /**
   * 22.2、获取科室预约号源
   */
  IF_Get_Booking_Dept_NoSource(params, options = {}) {
    return axios({
      method: "get",
      url: baseUrl + "IF_Get_Booking_Dept_NoSource",
      params,
      options: { log: false, ...options }
    });
  },
  /**
   * 22.3、获取医生预约号源
   */
  IF_Get_Booking_Doc_Resource(params, options = {}) {
    return axios({
      method: "get",
      url: baseUrl + "IF_Get_Booking_Doc_Resource",
      params,
      options: { log: false, ...options }
    });
  },
  /**
   * 22.6、确认预约
   */
  IF_Confirm_Booking(data, options = {}) {
    return axios({
      method: "post",
      url: baseUrl + "IF_Confirm_Booking",
      data,
      options
    });
  },
  /**
   * 22.7、取消预约
   */
  IF_Cancel_Booking(params, options = {}) {
    return axios({
      method: "get",
      url: baseUrl + "IF_Cancel_Booking",
      params,
      options
    });
  },
  /**
   * 22.8、预约转挂号
   */
  IF_Booking_To_Regist(data, options = {}) {
    return axios({
      method: "post",
      url: baseUrl + "IF_Booking_To_Regist",
      data,
      options
    });
  },
  /**
   * 22.9、获取患者预约列表
   */
  IF_Get_Patient_Booking_List(params, options = {}) {
    return axios({
      method: "get",
      url: baseUrl + "IF_Get_Patient_Booking_List",
      params,
      options
    });
  },
  /**
   * 22.10、获取患者预约详细
   */
  IF_Get_Patient_Booking_Detail(params, options = {}) {
    return axios({
      method: "get",
      url: baseUrl + "IF_Get_Patient_Booking_Detail",
      params,
      options
    });
  },
  /**
   * 22.12、确认签到
   */
  IF_Confirm_Check(data, options = {}) {
    return axios({
      method: "post",
      url: baseUrl + "IF_Confirm_Check",
      data,
      options
    });
  },
  /**
   * 22.14、患者预约挂号列表
   */
  IF_Get_BookingRegist_List(data, options = {}) {
    return axios({
      method: "post",
      url: baseUrl + "IF_Get_BookingRegist_List",
      data,
      options
    });
  }
};
