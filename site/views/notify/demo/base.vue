<template>
  <bk-button
    type="primary"
    @click="handleDefault"
  >
    默认配置的通知提示 </bk-button
  >&nbsp;&nbsp;
  <bk-button
    type="primary"
    @click="handleHideTitle"
  >
    默认没有标题
  </bk-button>
</template>

<script setup>
  import { ref } from 'vue';

  import { Notify } from 'bkui-vue';

  const title = ref('你好！欢迎你使用蓝鲸智云产品');
  const message = ref(
    '你好，你申请的功能权限现已开通，请及时登录查询。如有疑问，请与蓝鲸智云管理人员联系或关注微信公众账号。',
  );

  function handleDefault() {
    Notify({
      title: title.value,
      message: message.value,
    });
  }
  function handleHideTitle() {
    Notify({
      message: message.value,
    });
  }
</script>
