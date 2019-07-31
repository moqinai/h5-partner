import Mock from 'mockjs'
var Random = Mock.Random

const url = {
  initParams: 'init/api',
  tableDataOne: '/partnercollage/Index/indexList',
  tableDataTwo: 'init/about', // 得获取微信头像等信息
  listDetails: '/partnercollage/Index/classDetail',
  schoolList: '/api/getSchoolList',
  groupHistory:'/partnercollage/History/groupHistoryList',//拼团历史
  getHasPayList:'/partnercollage/Order/reportedOrderData', // 已报名页面
  unPaid:'/partnercollage/Pay/unPaid', //待支付列表
  userInfo:'/partnercollage/Personalcenter/indexInfo',  // 个人中心页面
  wheelPay: '/partnercollage/order/wheelTrainingPay',
  groupType: '/partnercollage/order/doOpenGroup' // 开团页
}

const initParams = () => {
  let dataSource =  {
    'status': 1,
    'data': {
      'students': 0, // 1是老生， 0 是新生
      'islogin': false, // 是否有登录过
      'type': 'link' // link链接进入，posters海报进入
    }
  }
  return dataSource
}

const tableIndex = () => { // 首页
  let dataSource =  Mock.mock({
    
    'data|5': [{
      'classCode|+1': 1,
      'subjectName|1': ['语文', '数学', '英语', '政治', '历史'], // 科目
      'gradeName|1': ['小一', '小二', '小三', '小四', '小五'], // 班级
      'year': '2019',
      'quarterName|1': ['春季', '夏季', '秋季', '冬季'], // 学期
      'price|1': [500, 230, 250, 780, 100], // 班级价格
      'twoStudentPrice|1':['', 115, 125, 78, 50], // 二人成团价格
      'threeStudentPrice|1':['', 75, '', 78, 33], // 三人成团价格
      'beginDate': Random.date('yyyy-MM-dd'), // 开课日期
      'endDate': Random.date('yyyy-MM-dd'),
      'totalClass|1': [10, 20, 30, 15, 50],
      'areaName|1': ['山西省运城市运城一中', '北京市海淀区南中大厦大街一号110海淀一中', '北京市海淀区南中大厦大街一号110海淀一中', '南昌'], // 上课校区
      'itemCount|1': [1, 2, 3, 4, 5], // 课次数
      'remaining|1': [0, 0, 0, 2, 1], // 剩余名额
      'isFull|1': [0, 0, 0, 1, 1], // 是否满班 不用到这个字段
      'color|1': Random.dataImage()
    }]
  })
  return dataSource
}
const listDetails = () => {
  let dataSource =  Mock.mock({
    'data|1': [{
      'classCode|+1': 1,
      'subjectName|1': ['语文'], // 科目名称
      'gradeName|1': ['小一'], // 年级
      'year': '2019',
      'quarterName|1': ['春季'], // 学期
      'price|1': [1500],
      'twoStudentPrice|1':[750], // 二人成团价格
      'threeStudentPrice|1':[500], // 三人成团价格
      'beginDate': '2019-08-30',
      'endDate': '2019-10-30',
      'areaName|1': ['北京北京北京市校考一区语文数学联考强强联考北京市校考一区语文数学联考强强联考强强上课校区'], // 上课校区
      'className|1': ['北京市校考一区语文数学联考强强联手班级'], // 班级名称
      'itemCount|1': [1], // 课次
      'remaining|1': [1], // 剩余名额
      'color|1': ['#e5f3c7'],
      'studentType':1, // "新生1 老生2"
      'openState|1':[1], // "活动开放状态0:未开放；1:已开放",
      'join_num|1': [3], // 第几拼团人
      'surplus_num|1': [1], // 拼团剩余名额
      'group_id': 1, // 开团id  order_type=2时必传
      "erp_order_code": 'erp123123', // erp订单编码
      "order_code": 'dingdan123123', // 网报订单编码
      "is_school": 2, // 是否是同一个学校，1不是同一个学校 2是同一个学校
      "is_join": 1 // "1同季度已参加过拼团2同季度未参加过拼团"
    }]
  })
  return dataSource
}

const tableDataOne = () => { // 个人中心
  let dataSource =  Mock.mock({
    'dataSource|5': [{
      'key|+1': 1,
      'mockTitle|1': ['哑巴', 'Butter-fly', '肆无忌惮', '摩天大楼', '初学者'],
      'mockContent|1': ['你翻译不了我的声响', '数码宝贝主题曲', '摩天大楼太稀有', '像海浪撞破了山丘'],
      'mockAction|1': ['下载', '试听', '喜欢']
    }]
  })
  return dataSource
}
const groupHistory = () => { // 拼团历史
  let dataSource =  Mock.mock({
    'data|5': [{
      'id|+1': 1,
      'registerTimer|1': ['2019.07.14 11:52', '2019.07.13 15:52', '2019.07.11 18:54', '2019.07.15 18:52', '2019.07.14 14:54'],
      'subjectName|1': ['初三化学', '初三英语', '初三数学', '初三历史', '初三语文'],
      'year': '2019',
      'className|1': ['初三化学全能班A', '初三英语全能班A', '初三数学全能班A', '初三历史全能班A','初三语文全能班A'],
      'areaName|1': ['未来校区', '啄木鸟校区', '朴新校区'],
      'beginDate': '2019.08.30',
      'endDate': '2019.10.30',
      'payMoney|1': ['1600.00', '1660.00', '1670.00', '1700.00', '1640.00'],
      'classPrice|1':['1600.00', '1660.00', '1670.00', '1700.00', '1640.00'],
      'activityTimeStatus|1': ['02', '00', '00','00'],
      'itemCount|1': [1, 2, 3, 4, 5],
      'num|1':[2,3],
      'color|1': ['#e5f3c7', '#cc66ff', '#66ff66', '#cc99ff', '#00cc00'],
      'return_cash|1':['恭喜您又获得助学金0元,您已累计获得助学金0.03元,班级开课*节后请到校区前台领取','恭喜您获得助学金0元,班级开课*节后请到校区前台领取']
    }]
  })
  return dataSource
}
const unPaid = () => { // 待支付列表
  let dataSource =  Mock.mock({
    'data|5': [{
      'id|+1': 1,
      'create_time|1': ['2019.07.14 11:52', '2019.07.13 15:52', '2019.07.11 18:54', '2019.07.15 18:52', '2019.07.14 14:54'],
      'subjectName|1': ['初三化学', '初三英语', '初三数学', '初三历史', '初三语文'],
      'year': '2019',
      'className|1': ['初三化学全能班A', '初三英语全能班A', '初三数学全能班A', '初三历史全能班A','初三语文全能班A'],
      'areaName|1': ['未来校区', '啄木鸟校区', '朴新校区'],
      'beginDate': '2019.08.30',
      'endDate': '2019.10.30',
      'order_price|1': ['1600.00', '1660.00', '1670.00', '1700.00', '1640.00'],
      'classPrice|1':['1600.00', '1660.00', '1670.00', '1700.00', '1640.00'],
      'activityTimeStatus|1': ['01', '02', '00', '00','00'],
      'itemCount|1': [1, 2, 3, 4, 5],
      'color|1': ['#e5f3c7', '#cc66ff', '#66ff66', '#cc99ff', '#00cc00']
    }]
  })
  return dataSource
}

Mock.mock(url.initParams, initParams)
Mock.mock(url.tableDataOne, tableIndex)
Mock.mock(url.tableDataTwo, tableIndex)
Mock.mock(url.listDetails, listDetails)
Mock.mock(url.schoolList,{
  "status":1,
  "msg":"操作成功",
  "data":[
      {
          "schoolId":"01",
          "schoolName":"北京啄木鸟"
      },
      {
          "schoolId":"02",
          "schoolName":"武汉啄木鸟"
      },
      {
          "schoolId":"03",
          "schoolName":"深圳啄木鸟"
      },
      {
          "schoolId":"04",
          "schoolName":"成都啄木鸟"
      }
  ],
  "is_auth":1
})
Mock.mock(url.groupHistory,groupHistory)
Mock.mock(url.unPaid,unPaid)
Mock.mock('/partnercollage/Login/doLogin',()=>{
  return {
    "status":1,
    "msg":"登录成功",
    "data":[],
    "is_auth":1
}
})
Mock.mock('/partnercollage/Login/SendVerify',()=>{
  return {
    status:1
  }
})
Mock.mock(url.wheelPay, () => {
  return {
    "status": 0,
    "msg": "未支付",
    "data":   [],
    "is_auth": 0
  }
})

// 已报名订单
const getHasPayList = () => {
  let dataSource = Mock.mock({
    result: "1",
    errorCode: "",
    data: {
      "orderList|5": [
        {
          "classCode|1": [
            "TEST07220001",
            "TEST07220002",
            "TEST07220003",
            "TEST07220004",
            "TEST07220005"
          ],
          "gradeName|1": ["小三", "小4", "小6"],
          "endDate|1": "20190831",
          "registerTime|1": "2019-07-22 18:19",
          "appOrderCode|1": "123", // 网报订单编码 使用时和 erp订单互斥如果一方为null则传另一个
          "className|1": "小学三年级语文阅读写作秋季课程",
          "classPrice|1": "1200.00",
          "itemCount|1": "15",
          "beginDate|1": "20190803",
          "payMoney|1": "1040.00",
          "areaName|1": "小白楼校区",
          "threeStudentPrice|1": "600.00",
          "twoStudentPrice|1": "900.00",
          "gradeCode|1": "03",
          "schoolName|1": "天津市南开区晟嘉培训中心",
          "studentRegisterCode|1": "02190722181910D8", // erp订单编码
          "subjectCode|1": "SUBJ02002",
          "isQuit|1": ['0', '1'], // 是否退费
          "activityTimeStatus|1": '00', // ['00', '02', '01'], // 活动时间状态01未开始02已结束00在范围内
          "subjectName|1": "语文",
          "sg_id": "tuanbaoid", // 已开团id
          "count|1": [1, 2, 3] // 已参团人数
        }
      ]
    },
    message: "查询成功",
    isShowErr: "0"
  });
  return dataSource
}
Mock.mock(url.getHasPayList,getHasPayList)

// 个人中心页面
const userInfo = ()=> {
  let dataSource = Mock.mock({
    "status": "1",
    "msg": "请求成功!",
    "data": [{
      "wx_headimgurl":"/myavator",
      "wx_nickname":"Silence",
      "pay_status":1,//(是否有代付款数据1是0否),
      "join_status":1,//(我要开团是否有数据1是0否),
      "index_status":1//(我的拼团是否数据1是0否)
    }]
  });
  return dataSource
}
Mock.mock(url.userInfo, userInfo)

// 开团页数据
const groupType = ()=> {
  let dataSource = Mock.mock({
    "status": "1",
    "msg": "请求成功!",
    "data": {
      "erp_order_code": "",
      "order_code": "wp201907231055",
      "order_ori_price": 0,
      "twoStudentPrice": 0,
      "threeStudentPrice": 0,
      "shareUrl": "http://www.baidu.com",
      "posterUrl": "D:/phpStudys/PHPTutorial/WWW/px_jvhe/public/upload/qrcode/15640418936a59d8221247e42ad292189f5fdbfa0b.png",
      "sg_id": 5,
      "info": [
        {
          "wx_headimgurl|1": Random.dataImage(),
          "stu_id": 1,
          "stu_name": "卢美月"
        },
        // {
        //   "wx_headimgurl|1": Random.dataImage(),
        //   "stu_id": 2,
        //   "stu_name": "王小黑"
        // },
        // {
        //   "wx_headimgurl|1": Random.dataImage(),
        //   "stu_id": 3,
        //   "stu_name": "赵美月"
        // }
      ],
      "join_count": 1 // 参团人数
    },
    "is_auth": 0
  })
  return dataSource
}
Mock.mock(url.groupType, groupType)
