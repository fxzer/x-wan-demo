<script lang="ts" setup>
const activeTabName = ref('baseInfo')
const cellStyle: any = inject('cellStyle')
const headerCellStyle: any = inject('headerCellStyle')
const inselect = ref('拒绝')
const outselect = ref('接受')
const transformselect = ref('拒绝')
</script>

<template>
  <div
    class="detail-wrapper"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <el-tabs
      v-model="activeTabName"
      type="border-card"
    >
      <el-tab-pane label="基本信息" name="baseInfo">
        <!-- 头部操作选项 -->
        <div class="tab-header">
          <div class="opts">
            <el-dropdown>
              <el-button type="primary">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    移除
                  </el-dropdown-item>
                  <el-dropdown-item>
                    初始化
                  </el-dropdown-item>
                  <el-dropdown-item>
                    开启HUB
                  </el-dropdown-item>
                  <el-dropdown-item>
                    关闭HUB
                  </el-dropdown-item>

                  <el-dropdown-item>
                    切换主备链路
                  </el-dropdown-item>
                  <el-dropdown-item>
                    系统重启
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <img src="/cpe/cpe-detail.png">
        <img src="/cpe/lan.png">
      </el-tab-pane>

      <el-tab-pane label="网络信息" name="portConfig">
        <img src="/cpe/cpe-net.png">
      </el-tab-pane>
      <el-tab-pane label="QOS配置" name="qosConfig">
        <img src="/cpe/qos-alarm.png">
      </el-tab-pane>

      <el-tab-pane label="自定义监控" name="customMonitor">
        <img src="/cpe/custom-monitor.png">
      </el-tab-pane>
      <el-tab-pane label="流量分析" name="analysis">
        <img src="/analysis.png" alt="">
      </el-tab-pane>
      <el-tab-pane label="防火墙" name="firewall">
        <div ml-2 flex-1 px-2>
          <div>
            <h3 text-14px text-gray-700 font-semibold italic>
              常规设置
            </h3>
            <el-form size="small" m-3 label-position="right" label-width="80px">
              <el-form-item label="入站数据">
                <el-select v-model="inselect">
                  <el-option label="接受" value="接受" />
                  <el-option label="拒绝" value="拒绝" />
                </el-select>
              </el-form-item>
              <el-form-item label="出站数据">
                <el-select v-model="outselect">
                  <el-option label="接受" value="接受" />
                  <el-option label="拒绝" value="拒绝" />
                </el-select>
              </el-form-item>
              <el-form-item label="转发">
                <el-select v-model="transformselect">
                  <el-option label="接受" value="接受" />
                  <el-option label="拒绝" value="拒绝" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <h3 mt-3 text-14px text-gray-700 font-semibold italic>
              端口转发
            </h3>
            <p mb-4 text-sm text-gray-400>
              端口转发允许互联网上的远程计算机连接到内部网络中的特定计算机或服务。
            </p>
            <el-table
              size="small"
              :data="[]" stripe border
              :cell-style="cellStyle"
              :header-cell-style="headerCellStyle"
            >
              <el-table-column label="名称" />
              <el-table-column label="匹配规则" />
              <el-table-column label="操作" />
              <el-table-column label="启用" />
            </el-table>
          </div>
          <div>
            <h3 mt-4 text-14px text-gray-700 font-semibold italic>
              NAT规则
            </h3>
            <p mb-3 text-sm text-gray-400>
              NAT 规则允许对源IP进行精细控制，以用于出站或转发流量。
            </p>
            <el-table
              size="small"
              :data="[]" stripe border
              :cell-style="cellStyle"
              :header-cell-style="headerCellStyle"
            >
              <el-table-column label="名称" />
              <el-table-column label="匹配规则" />
              <el-table-column label="操作" />
              <el-table-column label="启用" />
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane

        label="端到端监控"
        name="businessMonitor"
      >
        <img src="/cpe/duan-duan.png">
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.tab-header {
  margin-bottom: 10px;
  &::after {
    display: table;
    content: ' ';
    clear: both;
  }
}
.cpe-name {
  padding-left: 20px;
  font-size: 16px;
  font-weight: 600;
}
.opts {
  float: right;
  display: flex;
  justify-content: flex-end;
  .el-button {
    margin-left: 5px;
    padding: 5px;
  }
}
h3 {
  height: 36px;
  line-height: 36px;
}
.link-container {
  display: flex !important;
}
.link-container .link-desc-item .link-info {
  margin-bottom: 10px;
}
.link-container .link-desc-main .link-desc-body {
  flex: 1 1 0;
}
.link-container .link-desc-main .link-desc-body:first-child {
  margin-right: 5px;
}
.link-container .link-desc-main .link-desc-body:last-child {
  margin-left: 5px;
}
.link-container .title-info {
  line-height: 28px;
  font-size: 14px;
}

.link-container .link-desc-item {
  margin-top: 15px;
  flex: 1 1 0;
}
.link-container .link-desc-item:first-child {
  margin-right: 10px;
}
.link-desc-item:nth-last-child(1) {
  margin-left: 20px;
}
::v-deep .el-descriptions__header {
  margin-bottom: 12px;
}
.el-tag {
  margin-right: 10px;
}
</style>
