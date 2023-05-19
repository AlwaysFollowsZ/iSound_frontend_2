<template>
        <div class="message-page-header">
            <div>
                <n-grid>
                    <n-gi :span="1">
                        <div v-if="isSearchPage" >
                            <n-button class="go-message-button" strong secondary circle type="info" @click="gotoMessage()">
                                <template #icon>
                                  <n-icon><BellOutlined style="color:lightsteelblue"/></n-icon>
                                </template>
                              </n-button>
                        </div>
                        <div v-else>
                            <n-button class="go-message-button" strong secondary circle type="info" @click="back()">
                                <template #icon>
                                  <n-icon><menu-outlined style="color:lightsteelblue"/></n-icon>
                                </template>
                              </n-button>
                        </div> 
                    </n-gi>
                    <n-gi :span="4">
                        <div class="isound-admin-style">
                            iSound管理平台
                        </div>
                    </n-gi>
                    <n-gi :span="18"></n-gi>
                    <n-gi :span="1">
                        <n-dropdown trigger="hover" :options="options">
                            <div class="admin-avatar" >
                                <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                            </div>
                         </n-dropdown>
                    </n-gi>
                </n-grid>
                
            </div>
            
            <!-- <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>   -->
        </div>
</template>

<script>
import { MenuOutlined } from '@ant-design/icons-vue'
import { BellOutlined } from '@ant-design/icons-vue'
import { SearchOutline } from '@vicons/ionicons5'
import { CashOutline as CashIcon } from "@vicons/ionicons5"
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'AdminTopNav',
    components: {
        MenuOutlined,
        BellOutlined,
        SearchOutline,
        CashIcon,
    },
    computed: {
        ...mapState(['isAdmin']),
    },
    props: {
        isSearchPage: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            options: [
                {
                    label: "登出",
                    props: {
                        onClick: () => {
                            this.$router.push('/')
                            // this.setIsAdmin(false),
                            console.log('管理员登出')
                        }
                    }
                }
            ]
        }
    },
    methods: {
        ...mapMutations(['setIsAdmin']),
        gotoMessage() {
            console.log('func gotomessage')
            // this.isSearchPage = false
            this.$router.push({path:'/message'})
        },
        back() {
            // this.isSearchPage = true
            console.log('func back')
            this.$router.push({path:'/admin'})
        },
    }
}
</script>

<style>
.message-page-header {
    width: 100vw;
    border: 3px solid rgb(235, 237, 240)
}
.isound-admin-style {
    padding-top: 3%;
    font-size: 26px;
    font-weight: 450;
}

.back-button {
    /*position: fixed;*/
    top: 20px;
    left: 20px;
    background-color: lightgray;
    border-color: lightgray;
}
.admin-avatar {
    /*position: fixed;*/
    padding-top: 13%;
}
.default-admin-avatar {
    width: 35px;
}
.go-message-button {
    /*position: fixed;*/
    top: 10px;
    left: 10px;
    /*background-color: lightgray;
    border-color: lightgray;*/
}
.go-message-button :hover {
    /*position: fixed;
    top: 10px;
    left: 10px;*/
    /*background-color: lightsteelblue !important;
    border-color: lightsteelblue !important;*/
}
/*.ant-btn :hover {
    color: lightsteelblue !important;
    background-color: lightsteelblue !important;
    border-color: lightsteelblue !important;
}*/
/*.ant-btn-primary :hover {
    
    background-color: lightsteelblue !important;
    border-color: lightsteelblue !important;
}
.ant-btn-circle :hover {
    
    background-color: lightsteelblue !important;
    border-color: lightsteelblue !important;
}*/
.message-page-search {
   /* position: fixed;*/
    top: 58px;
    width: 60vw;
    margin: 0 20vw;
}
</style>
