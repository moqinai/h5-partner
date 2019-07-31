import {get, post} from './../services/axios.tools'

const ApiList = {
  getSchoolList: '/partnercollage/Login/getSchoolList'
}


export async function getSchoolList () {
    const schoolList = await post(ApiList.getSchoolList)
    return schoolList
}
