<template>
    <n-button @click="showModal = true">注册</n-button>
    <n-modal v-model:show="showModal">
        <n-card style="width: 600px" title="欢迎来到 iSound，请先完成注册！" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <n-grid x-gap="12" :cols="2">
                <n-gi>
                    <img class="register-image"
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </n-gi>
                <n-gi>
                    <span>用户名</span>
                    <n-input type="text" placeholder="请输入用户名" clearable />
                    <span>密码</span>
                    <n-input type="password" show-password-on="mousedown" placeholder="请输入密码" :minlength="8" />
                    <n-grid class="register-button-top" x-gap="12" :cols="2">
                        <br/>
                        <n-gi>
                            <n-button strong secondary type="success">
                                注册
                            </n-button>
                        </n-gi>
                        <n-gi>
                            <n-button strong secondary type="Warning">
                                取消
                            </n-button>
                        </n-gi>
                    </n-grid>
                </n-gi>
            </n-grid>
            <div class="register-notice-text">
                注册账号并登录表示用户承诺遵守网站公约，同时网站承诺将保护用户隐私信息。
            </div>
        </n-card>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    setup() {
        return {
            showModal: ref(false)
        }
    }
})
</script>

<style>
.register-image {
    width: 80%;
}

.register-notice-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.register-button-top {
    margin-top: 20px;
}
</style>