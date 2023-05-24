<template>
    <div class="recommend-outer">
        <n-grid>
            <n-gi :span="1"></n-gi>
            <n-gi :span="9">
                <div class="recommend-left-img-container animate__animated animate__zoomIn">
                    <img
                        class="recommend-left-img" 
                        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"/>
                </div>
            </n-gi>
            <n-gi :span="14">
                <div class="recommend-right-songlists-container">
                    <n-grid>
                        <n-gi :span="12" v-for="(e, idx) in arr" :key="idx">
                            <div class="recommend-right-songlists-img-container">
                                <img
                                    class="recommend-right-songlists-img animate__animated animate__fadeInRight"
                                    :style="{'animation-delay': `${2 + idx * 0.5}s`}"
                                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
                                    />
                            </div>
                        </n-gi>
                    </n-grid>

                </div>
            </n-gi>            
        </n-grid>        
    </div>
</template>

<script>
import 'animate.css'
export default {
    name: 'RecommendForYou',
    data() {
        return {
            arr: [1, 2, 3, 4],
        }
    }
}
</script>

<style>
.recommend-left-img-container {
    height: 500px;
    width: 500px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-left: 10%;
    border-radius: 25px;
    animation-delay: 1s;
    animation-duration: 1.5s;
}
.recommend-left-img {
    height: 100%;
    border-radius: 25px;
}
.recommend-left-img:hover {
    cursor: pointer;
}
.recommend-right-songlists-container {
    margin-right: 10%;
}
.recommend-right-songlists-img-container {
    height: 240px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    border-radius: 20px;
    margin-top: 2%;
    margin-bottom: 2%;
    
}
.recommend-right-songlists-img {
    height: 100%;
    border-radius: 20px;

}
.recommend-right-songlists-img:hover {
    cursor: pointer;
}
/*.recommend-right-songlists-img-container::before {
    content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg);
  background-size: cover;
    调整模糊程度，单位为像素 
  opacity: 0.7;  调整遮罩层的透明度，可以根据需要进行调整 
}*/
</style>