<template>
  <div>
    <bk-button
      style="display: block; margin-bottom: 10px"
      theme="primary"
      text
      @click="handleClick"
    >
      {{ `点击切换disabled(${disabled})状态` }}
    </bk-button>
    <bk-dropdown
      :disabled="disabled"
      placement="bottom-start"
    >
      <bk-button :disabled="disabled"> 下拉菜单 </bk-button>
      <template #content>
        <bk-dropdown-menu>
          <bk-dropdown-item
            v-for="item in dropdownList"
            :key="item"
          >
            {{ item }}
          </bk-dropdown-item>
        </bk-dropdown-menu>
      </template>
    </bk-dropdown>
  </div>
</template>
<script setup>
  import { ref } from 'vue';

  import BkDropdown from '@bkui-vue/dropdown';

  const disabled = ref(false);
  const dropdownList = ref(['生产环境', '预发布环境', '测试环境', '正式环境', '开发环境', '调试环境']);

  const handleClick = () => {
    disabled.value = !disabled.value;
  };
</script>
