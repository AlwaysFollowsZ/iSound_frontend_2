<template>
        <div class="message-page-header">
            <div>
                <n-grid>
                    <!-- <n-gi :span="1">
                        <div>
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
                    </n-gi> -->
                    <n-gi :span="5">
                        <div class="isound-admin-style">
                            <img src="/src/assets/iSound.png" style="padding-left: 10px; height:40px" :preview-disabled="true" @click="back"/>
                        </div>
                    </n-gi>
                    <n-gi :span="17"></n-gi>
                    <n-gi :span="2">
                        <n-grid>
                        
                        <n-gi :span="10">
                            <div class="mail-icon-container">
                        <n-icon size="27px" class="mail-icon" @click="gotoMessage"><MailOutline/></n-icon>
                        </div></n-gi>
                        <n-gi :span="14">
                            <n-dropdown trigger="hover" :options="options">
                            <div class="admin-avatar" >
                                <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="large"></n-avatar>
                            </div>
                         </n-dropdown>
                        </n-gi>
                    
                        
                        </n-grid>
                    </n-gi>
                </n-grid>
                
            </div>
        </div>
</template>

<script>
import { MenuOutlined } from '@ant-design/icons-vue'
import { BellOutlined } from '@ant-design/icons-vue'
import { SearchOutline, MailOutline } from '@vicons/ionicons5'
import { CashOutline as CashIcon } from "@vicons/ionicons5"
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'AdminTopNav',
    components: {
        MenuOutlined,
        BellOutlined,
        SearchOutline,
        CashIcon,
        MailOutline
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
                            this.$http.post("/api/accounts/logout/");
                            this.$cookies.remove("userid");
                            this.$cookies.remove("is_superuser");
                            this.$router.push("/");
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
    padding-top: 7px;
    padding-bottom: 7px;
    min-width: 1400px;
}

.isound-admin-style:hover {
    cursor: pointer;
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
    padding-left: 10%
}
.default-admin-avatar {
    width: 35px;
}
.go-message-button {
    
    top: 10px;
    left: 10px;
}


.message-page-search {
   /* position: fixed;*/
    top: 58px;
    width: 60vw;
    margin: 0 20vw;
}

.mail-icon:hover {
  cursor: pointer;
}

.mail-icon-container{
    display: flex;
    justify-content: left;
    padding-top: 14px;
    padding-left: 10px;
}
</style>
