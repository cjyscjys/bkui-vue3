<template>
  <div style="display: flex">
    <div>
      <bk-date-picker
        :open="open"
        :value="dateValue"
        @change="handleChange"
        @clear="handleClear"
        @open-change="handleOpenChange"
        @pick-success="handleOk"
      >
        <template #trigger>
          <a
            href="javascript:void(0)"
            @click="handleClick"
          >
            <template v-if="dateValue === ''"> Select date </template>
            <template v-else>
              {{ dateValue }}
            </template>
          </a>
        </template>
      </bk-date-picker>
    </div>
    <div style="margin-left: 40px">
      <bk-date-picker
        v-model="dateValue2"
        :open="open2"
        :shortcuts="shortcutsRange"
        format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        use-shortcut-text
        @change="handleChange2"
        @clear="handleClear2"
        @open-change="handleOpenChange2"
        @pick-success="handleOk2"
      >
        <template #trigger="displayName">
          <a
            href="javascript:void(0)"
            @click="handleClick2"
          >
            displayName:{{ displayName }}
          </a>
        </template>
      </bk-date-picker>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';

  const dateValue = ref(''); // new Date();

  const open = ref(false);

  const handleChange = date => {
    console.log('handleChange', date);
    dateValue.value = date;
  };
  const handleClick = () => {
    console.log('handleClick');
    open.value = !open.value;
  };
  const handleOpenChange = isOpen => {
    console.error('handleOpenChange');
    console.log(isOpen);
  };
  const handleClear = () => {
    console.log('handleClear');
    open.value = false;
  };
  const handleOk = () => {
    console.log('handleOK');
    open.value = false;
  };
  const dateValue2 = reactive(['2022-07-21 12:02:26', '2022-08-20 12:02:26']);
  const open2 = ref(false);
  const shortcutsRange = reactive([
    {
      text: '今天',
      value() {
        const end = new Date();
        const start = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        return [start, end];
      },
      onClick: picker => {
        console.log(picker);
      },
    },
    {
      text: '近7天',
      value() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      },
      onClick: picker => {
        console.log(picker);
      },
    },
    {
      text: '近15天',
      value() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
        return [start, end];
      },
      onClick: picker => {
        console.log(picker);
      },
    },
    {
      text: '近30天',
      value() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      },
      onClick: picker => {
        console.log(picker);
      },
    },
  ]);
  const handleChange2 = date => {
    console.log('handleChange', date);
    dateValue2.value = date;
  };
  const handleClick2 = () => {
    console.log('handleClick');
    open2.value = !open.value;
  };
  const handleOpenChange2 = isOpen => {
    console.error('handleOpenChange');
    console.log(isOpen);
  };
  const handleClear2 = () => {
    console.log('handleClear');
    open2.value = false;
  };
  const handleOk2 = () => {
    console.log('handleOK');
    open2.value = false;
  };
</script>
