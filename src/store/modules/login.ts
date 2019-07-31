import {getSchoolList} from '@/api/api'
export default {
  namespaced: true,
  state: {
    schoolList: []
  },
  mutations: {
    updateSchoolList(state: any, payload: any) {
      state.schoolList = payload
    }
  },
  actions: {
    getSchool({commit}: any) {
      const schoolList: any = getSchoolList()
      schoolList.then((res: any) => {
        commit('updateSchoolList', res.data.schoolList)
      })

    }
  }
}
