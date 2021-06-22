/**
 * teacher模块接口列表
 */
import base from '../base'; // 导入接口域名列表
import axios from '../../axios'; // 导入http中创建的axios实例
const baseUrl=base.root+'/a/teacherRule'
const findUrl=base.root+'/a/basicSettingQuery'
const saveUrl=base.root+'/a/subjectTeacher'
const teacher = {
    //所有教师信息查询（已调）
    fetchAllTeacherList(params){
        return axios.get(`${findUrl}/getAllTeacherDataList.json`,{params});
    },
    //按级部、年级查询老师（已调）
    fetchTeacherList(params){
        return axios.get(`${findUrl}/getTeacherDataList.json`,{params});
    },
    //添加授课老师信息(已调）
    saveTeacherInfo(params){
        return axios.post(`${saveUrl}/saveTchGradeSubData.json`,params);
    },
    // 查询全部教师时间规则的(已调)
    fetchList(params){
        return axios.get(`${baseUrl}/getData.json`,{params});
    },
    // 查询指定教师时间规则(对一个教师规则查看）(已调）
    fetchRule(params){
        return axios.get(`${baseUrl}/searchData.json`,{params})
    },
    // 教师时间规则新增接口(已调)
    saveRule(params){
        return axios.post(`${baseUrl}/saveOneData.json`,params)
    },
    // 教师时间规则删除接口(已调)
    deleteRule(params){
        return axios.post(`${baseUrl}/deleteData.json`,params);
    },
    // 查询全部教师时间规则左侧树（已测）(已调)
    AdminGradeSubTec(params){
        return axios.get(`${findUrl}/getAdminGradeSubTecDataTree.json`,params);
    },
}

export default teacher;
