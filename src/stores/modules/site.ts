export const useSiteStore = defineStore('store-site', () => {
  const sites = reactive([{ uuid: 'cbb30c04984f4dac8ba014a42c5f8cba', number: 1009, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '34b2216de1974311b1c17b90bdd7893c', hybridwanNetworkName: '拨测测试', hybridwanNetworkType: 'ACCEL', vid: 43, areaUuid: '97cec90d9d0c4e82b6f59d274a884149', areaName: '华东', name: '宁波', accessType: 'Stick', bandwidth: 491, country: '中国香港', province: '中国香港', city: '中国香港', address: 'xx', ha: false, hub: true, hubTemplate: true, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 25, 2023 10:07:00 AM', createDate: 'Dec 7, 2023 3:18:46 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: '7a6f965c348a429a8518ced1bd7d13ba', number: 1005, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '34b2216de1974311b1c17b90bdd7893c', hybridwanNetworkName: '拨测测试', hybridwanNetworkType: 'ACCEL', vid: 43, areaUuid: '97cec90d9d0c4e82b6f59d274a884149', areaName: '华东', name: '杭州', accessType: 'Stick', bandwidth: 100, country: '中国', province: '浙江省', city: '杭州', address: 'xxx', ha: false, hub: true, hubTemplate: false, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 25, 2023 9:59:10 AM', createDate: 'Dec 4, 2023 11:10:40 AM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: 'bc5078c282b946ac904075d7fc3f5ecb', number: 1000, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '321befc1ba074e50827c9c7ee102763d', hybridwanNetworkName: '组网测试', hybridwanNetworkType: 'Networking', vid: 46, areaUuid: '97cec90d9d0c4e82b6f59d274a884149', areaName: '华东', name: '带宽测试站点', accessType: 'Gateway', bandwidth: 754, country: '中国台湾', province: '中国台湾', city: '中国台湾', address: '台湾的某个犄角旮旯里', ha: false, hub: false, hubTemplate: false, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 14, 2023 4:16:21 PM', createDate: 'Nov 30, 2023 1:56:44 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: 'cbf87ab3e97e48f392b6d9bbd14072a3', number: 993, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '321befc1ba074e50827c9c7ee102763d', hybridwanNetworkName: '组网测试', hybridwanNetworkType: 'Networking', vid: 46, areaUuid: '97cec90d9d0c4e82b6f59d274a884149', areaName: '华东', name: '带宽配额测试站带你', accessType: 'Gateway', bandwidth: 530, country: '中国', province: '内蒙古', city: '呼伦贝尔盟', address: '断点123', ha: false, hub: false, hubTemplate: true, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 14, 2023 4:17:09 PM', createDate: 'Nov 27, 2023 3:48:34 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: '564eb9abeb0f4d79b7efd2b1f038cc7a', number: 974, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '34b2216de1974311b1c17b90bdd7893c', hybridwanNetworkName: '拨测测试', hybridwanNetworkType: 'ACCEL', vid: 43, areaUuid: '99fc180630464b61866d0e77945688ba', areaName: '东北', name: '太仓', accessType: 'Stick', bandwidth: 2, country: '中国澳门', province: '中国澳门', city: '中国澳门', address: 'xxx', ha: false, hub: true, hubTemplate: true, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 22, 2023 3:48:31 PM', createDate: 'Sep 18, 2023 5:57:39 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: 'c148abf5724a41dc83ab757d4d0bf982', number: 971, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '34b2216de1974311b1c17b90bdd7893c', hybridwanNetworkName: '拨测测试', hybridwanNetworkType: 'ACCEL', vid: 43, areaUuid: '6e33620b33754e2780dd973ddbd437dc', areaName: '北京', name: '昆山拨测', accessType: 'Gateway', bandwidth: 10, country: '中国', province: '河北省', city: '秦皇岛', address: 'xx', ha: false, hub: false, hubTemplate: true, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 19, 2023 3:05:44 PM', createDate: 'Sep 6, 2023 9:11:46 AM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: '1e1dafaf075c4327ad2bfac04f96f20d', number: 970, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '34b2216de1974311b1c17b90bdd7893c', hybridwanNetworkName: '拨测测试', hybridwanNetworkType: 'ACCEL', vid: 43, areaUuid: '97cec90d9d0c4e82b6f59d274a884149', areaName: '华东', name: '南京拨测', accessType: 'Gateway', bandwidth: 10, country: '中国', province: '江苏省', city: '南京', address: 'xx', ha: false, hub: false, hubTemplate: true, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 19, 2023 5:43:52 PM', createDate: 'Sep 5, 2023 5:07:10 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: '860c5d4dac7e4b948d84919e0c2e3149', number: 960, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '321befc1ba074e50827c9c7ee102763d', hybridwanNetworkName: '组网测试', hybridwanNetworkType: 'Networking', vid: 46, areaUuid: 'f3d65dbacdfa4da594f0043ea7c164a6', areaName: '上海', name: '南京组网1', accessType: 'Gateway', bandwidth: 10, country: '中国', province: '山西省', city: '太原', address: 'xxx666', ha: false, hub: false, hubTemplate: true, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Dec 15, 2023 2:46:48 PM', createDate: 'Aug 18, 2023 3:30:12 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: '4544e831dfed4c57b4b692ef03c5bf7b', number: 959, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '321befc1ba074e50827c9c7ee102763d', hybridwanNetworkName: '组网测试', hybridwanNetworkType: 'Networking', vid: 46, areaUuid: 'f3d65dbacdfa4da594f0043ea7c164a6', areaName: '上海', name: '上海组网', accessType: 'Gateway', bandwidth: 2, country: '中国', province: '上海', city: '上海', address: 'xx', ha: false, hub: false, hubTemplate: false, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Aug 18, 2023 3:29:41 PM', createDate: 'Aug 18, 2023 3:29:41 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }, { uuid: 'f080cadb733b4224bec16dde80deb043', number: 958, accountUuid: 'de3f247b7720430f8d339c688071f817', hybridwanNetworkUuid: '321befc1ba074e50827c9c7ee102763d', hybridwanNetworkName: '组网测试', hybridwanNetworkType: 'Networking', vid: 46, areaUuid: '6e33620b33754e2780dd973ddbd437dc', areaName: '北京', name: '北京组网', accessType: 'Gateway', bandwidth: 2, country: '中国', province: '北京', city: '北京', address: 'xx', ha: false, hub: false, hubTemplate: false, autoDetect: true, collectSite: false, clientAccess: false, lastOpDate: 'Aug 21, 2023 10:08:00 AM', createDate: 'Aug 18, 2023 3:29:18 PM', onlineAlarm: true, accountName: 'zhangy', company: 'zy-test123' }])
  const currentSite = ref({})
  const setCurrentSite = (site: any) => {
    if (typeof site !== 'object') {
      const current = sites.find(item => item.uuid === site)
      currentSite.value = current || {}
    }
    else {
      currentSite.value = site
    }
  }
  return { sites, currentSite, setCurrentSite }
})
