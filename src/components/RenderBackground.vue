<template>
    <div ref="canvasContainer"></div>
</template>

<script>
import * as THREE from 'Three';
import { mapState } from 'vuex'

export default {
    mounted() {
        this.initThree();
    },
    computed: { ...mapState['colorMode'] },
    methods: {
        initThree() {
            // 获取容器元素
            const container = this.$refs.canvasContainer;

            // 创建场景
            const scene = new THREE.Scene();
            scene.add(new THREE.AxesHelper(10)); // 添加坐标轴辅助线
            // 创建相机
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 5;

            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            //设置场景的背景为透明
            renderer.setClearAlpha(0);

            //渲染元素类
            class animateCube {
                Position = new THREE.Vector3(
                    Math.random() * container.clientWidth - container.clientWidth / 2,
                    Math.random() * container.clientHeight + container.clientHeight * 500,
                    0);
                DirectionAngle = Math.random() * Math.PI / 6 - Math.PI / 12;
                Direction = new THREE.Vector3(
                    Math.sin(this.initialDirectionAngle),
                    -1,  // 向下运动
                    Math.cos(this.initialDirectionAngle)
                );
                //设置形状
                geometry = new THREE.BoxGeometry();
                //设置材质
                material = new THREE.MeshBasicMaterial({
                    color: 'rgb(123,123,221)',
                    transparent: true,
                    opacity:0.5
                });
                cube= new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    // this.cube.position.copy(this.Position);
                    scene.add(this.cube);
                }
                updateCube() {
                    // alert('update,position=',this.cube.position.clone())
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.cube.rotation.x += 0.01;
                    this.cube.rotation.y += 0.01;
                    // 计算位移
                    const displacement = this.Direction.clone().multiplyScalar(0.1);  // 控制位移幅度
                    // 更新位置
                    // this.cube.position.add(displacement);
                    // this.cube.position.add(new THREE.Vector3(0,0,0))
                    // 检查是否超出可视区域底部
                    // alert(JSON.stringify(this.cube))
                    if (this.cube.position.y < -container.clientHeight / 2) {
                        this.resetCube();
                    }
                }
                resetCube() {
                    // 更新随机初始位置
                    this.cube.position.set(
                        Math.random() * container.clientWidth - container.clientWidth / 2,
                        Math.random() * container.clientHeight + container.clientHeight * 500,
                        0
                    );
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;

                    // 更新运动方向向量
                    this.Direction.set(
                        Math.sin(newDirectionAngle),
                        -1,  // 向下运动
                        Math.cos(newDirectionAngle)
                    );
                }
            }
            let testCube = new animateCube()//此时已经加入场景


            
            // 渲染循环
            function update() {
                testCube.updateCube()
                //渲染摄像机
                renderer.render(scene, camera);
                //请求渲染动画帧
                requestAnimationFrame(update);
            }
            update();

        }
    }
};
</script>

<style scoped>
div {
    height: 100vh;
    background-color: transparent;
}
</style>