<template>
  <div class="row">
    <div class="column">
      <div class="cell">
        <bk-tree
          ref="refAutoSelect"
          :async="{
            callback: getRemoteData,
            cache: true,
          }"
          :intersection-observer="{
            enabled: true,
            callback: intersectionObserverFn,
          }"
          :auto-check-children="false"
          :data="treeData"
          :selected="selected"
          children="children"
          label="name"
          node-key="id"
          level-line
        />
      </div>
    </div>
    <!-- <div class="column">
      <bk-input
        v-model="selected2"
        placeholder="设置选中id"
      />
      <div class="cell">
        <bk-tree
          ref="refAutoSelect"
          :data="treeData2"
          :selected="selected2"
          node-key="id"
          level-line
          label="name"
          children="children"
          :auto-check-children="false"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  import { ASYNC_DATA, SINGLE_NODE_DATA } from './options';
  const id = new Date().getTime();
  export default defineComponent({
    components: {},
    data() {
      return {
        treeData: [...ASYNC_DATA].map(item => ({ ...item })),
        treeData2: [...SINGLE_NODE_DATA].map(item => ({ ...item })),
        selected: null,
        selected2: '/',
        rootId: Math.random() * id,
      };
    },
    methods: {
      intersectionObserverFn(...args) {
        console.log('intersectionObserverFn', ...args);
      },
      handleNodeExpand(item, data, schema) {
        console.log('handleNodeExpand', item, data, schema);
      },
      getRemoteData(_item, _callback, _schema) {
        this.rootId = this.rootId + Math.ceil(Math.random() * 1000);
        return new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                name: '开放平台',
                id: this.rootId + 1,
                content: '开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。',
                children: [
                  {
                    id: this.rootId + 2,
                    name: 'child-3-方案成熟',
                    content: '拥有支撑数百款腾讯业务的经验沉淀，兼容各种复杂的系统架构，生于运维 · 精于运维',
                    children: [],
                  },
                  {
                    id: this.rootId + 3,
                    name: 'child-3-覆盖全面',
                    content:
                      '从配置管理，到作业执行、任务调度和监控自愈，再通过运维大数据分析辅助运营决策，全方位覆盖业务运营的全周期保障管理。',
                    children: [],
                  },
                  {
                    id: this.rootId + 4,
                    name: 'child-3-开放平台',
                    content:
                      '开放的PaaS，具备强大的开发框架和调度引擎，以及完整的运维开发培训体系，助力运维快速转型升级。',
                    children: [],
                  },
                ],
              }),
            300,
          ),
        );
      },
      handleAutoSelect() {
        const treeData = this.$refs.refAutoSelect.getData();
        const { length } = treeData.data;
        const randomIndex = Math.floor(Math.random() * length);
        this.selected = treeData.data[randomIndex];
      },
    },
  });
</script>
<style scoped>
  @import './tree.less';
</style>
