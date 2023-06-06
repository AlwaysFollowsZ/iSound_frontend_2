<template>
    <div v-if="visibility" ref="canvasContainer"></div>
</template>

<script>
import { watch } from 'vue'
import * as THREE from 'Three';
import { colorMode, globalThemeColor } from '/src/colorMode.js'

export default {
    mounted() {
        this.initThree();
        window.addEventListener('resize', this.handleWindowResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    },
    props: {
        elementColor: {
            type: String,
            default: 'rgb(123,123,221)'
        },
        visibility: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        initThree() {
            // 获取容器元素
            const container = this.$refs.canvasContainer;
            //获取props并监听变化
            let elementColor = this.elementColor
            setInterval(() => {
                elementColor = this.elementColor
            }, 1000)
            // 创建场景
            const scene = new THREE.Scene();
            // scene.add(new THREE.AxesHelper(10)); // 添加坐标轴辅助线
            // 创建相机
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.z = 5
            scene.add(camera);
            //创建聚光源1
            const spotLight1 = new THREE.SpotLight(elementColor, 1.0);// 1.0：光照强度intensity
            spotLight1.angle = Math.PI / 2;//发散角度,光锥角度的二分之一
            spotLight1.position.set(-2, 3, 0);// 设置聚光光源位置
            spotLight1.penumbra = 2; // 设置聚光灯的边缘柔化
            spotLight1.decay = 2; // 设置聚光灯的衰减
            spotLight1.target.position.set(0, 0, 0);// spotLight.target是一个模型对象Object3D，默认在坐标原点
            scene.add(spotLight1.target);//spotLight.target添加到场景中.target.position才会起作用
            scene.add(spotLight1);//光源添加到场景中
            //创建聚光源2
            const spotLight2 = new THREE.SpotLight(elementColor, 1);// 1.0：光照强度intensity
            spotLight2.angle = Math.PI / 2;//发散角度,光锥角度的二分之一
            spotLight2.position.set(2, 3, 0);// 设置聚光光源位置
            spotLight2.penumbra = 10; // 设置聚光灯的边缘柔化
            spotLight2.decay = 2000; // 设置聚光灯的衰减
            spotLight2.target.position.set(0, 0, 0);// spotLight.target是一个模型对象Object3D，默认在坐标原点
            scene.add(spotLight2.target);//spotLight.target添加到场景中.target.position才会起作用
            scene.add(spotLight2);//光源添加到场景中

            // 聚光源辅助对象，可视化聚光源
            // const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1, 0x123456)
            // const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 0x345612)
            // scene.add(spotLightHelper1, spotLightHelper2);

            // 创建渲染器
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setClearAlpha(0);//设置场景的背景为透明
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            // 保存相关对象以便后续更新
            this.scene = scene;
            this.camera = camera;
            this.renderer = renderer;


            //以下是渲染元素处理

            //渲染正四面体
            class animateTetrahedron {
                rand = Math.random()
                Size = this.rand * 0.3 + 0.3
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.TetrahedronGeometry(this.Size);
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.3
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry.size = this.Size
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染正方体
            class animateCube {
                rand = Math.random()
                Size = [this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3]
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size[0])))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.BoxGeometry(this.Size[0], this.Size[1], this.Size[2]);
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = [this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3]
                    this.Speed = (1 / (100 * (this.Size[0])))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry = new THREE.BoxGeometry(this.Size[0], this.Size[1], this.Size[2]);
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染正八面体.普通八面体太麻烦了
            class animateOctahedron {
                rand = Math.random()
                Size = this.rand * 0.3 + 0.3
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.OctahedronGeometry(this.Size)
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.3
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry.size = this.Size
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]

                }
            }
            //渲染正二十面体
            class animateIcosahedron {
                rand = Math.random()
                Size = this.rand * 0.3 + 0.2
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置形状
                geometry = new THREE.IcosahedronGeometry(this.Size)
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                element = new THREE.Mesh(this.geometry, this.material);
                constructor() {
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.01;
                    this.element.rotation.y += 0.01;
                    this.element.rotation.z += 0.01;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.2
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry.size = this.Size
                    this.material = new THREE.MeshLambertMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0.2
                    });
                    //更新方块
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染六芒星
            class animateHexagram {
                rand = Math.random()
                Scale = this.rand * 0.1 + 0.1
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //设置四棱锥形状.具体的scale不在这里设置
                geometry = new THREE.ConeGeometry(1, 2, 4, 1, true)
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2
                });
                //整个六芒星
                element = new THREE.Group()
                //单个四棱锥

                constructor() {
                    //首先生成六个六芒星并平移到正确的位置
                    for (let i = 0; i < 6; i++) {
                        const pyramid = new THREE.Mesh(this.geometry, this.material);
                        const container = new THREE.Group()
                        //统一先向上平移
                        pyramid.translateY(Math.sqrt(Math.E))
                        pyramid.rotateY(Math.PI / 4)
                        //然后加入容器
                        container.add(pyramid)
                        //然后对容器进行旋转(围绕原点)
                        switch (i) {
                            //六个面
                            case 0:
                                break
                            case 1:
                                container.rotateX(-Math.PI / 2)
                                break
                            case 2:
                                container.rotateX(Math.PI)
                                break
                            case 3:
                                container.rotateZ(Math.PI / 2)
                                break
                            case 4:
                                container.rotateZ(-Math.PI / 2)
                                break
                            case 5:
                                container.rotateX(Math.PI / 2)
                                break;
                            default:
                                break
                        }
                        //加入"group"
                        this.element.add(container)
                    }
                    //设置随机的缩放
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }
                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.02;
                    this.element.rotation.y += 0.02;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //移除旧方块
                    // scene.remove(this.element)
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Scale = this.rand * 0.1 + 0.1
                    this.Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状,材质就不更新了
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染音符。默认八分和四分
            class animateNote {
                rand = Math.random()
                Scale = this.rand * 0.3 + 0.2
                Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                    [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的线区域生成立方体
                    [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的线区域生成立方体
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                Direction = [
                    Math.sin(this.DirectionAngle) * this.Speed,
                    Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                ]
                //创建椭球体的方法。半径为x,y,z
                EllipsoidGeometry = (x, y, z) => {
                    const ellipsoidGeometry = new THREE.SphereGeometry(1, 7, 7);
                    const positionAttribute = ellipsoidGeometry.getAttribute('position');

                    for (let i = 0; i < positionAttribute.count; i++) {
                        const vertex = new THREE.Vector3();
                        vertex.fromBufferAttribute(positionAttribute, i);
                        vertex.x *= x;
                        vertex.y *= y;
                        vertex.z *= z;
                        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
                    }
                    return ellipsoidGeometry;
                }
                //设置音符的三种模型的形状.具体的scale不在这里设置
                geometries = [
                    this.EllipsoidGeometry(0.4, 0.2, 0.2),//底部椭球
                    new THREE.CylinderGeometry(0.08, 0.08, 1.5, 3, 1, true),//长杆
                    new THREE.CylinderGeometry(0.05, 0.12, 0.8, 8, 1, true)]//短杆
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2,
                });
                //整个音符
                element = new THREE.Group()

                // type为1是八分音符，否则为四分音符
                constructor(type) {
                    //生成椭球、长杆和短杆
                    const Ellipsoid = new THREE.Mesh(this.geometries[0], this.material)
                    const longCylinder = new THREE.Mesh(this.geometries[1], this.material)

                    //调节位置
                    Ellipsoid.translateY(-0.5)
                    longCylinder.translateX(0.3)
                    longCylinder.translateY(0.3)
                    if (type === 1) {
                        const shortCylinder = new THREE.Mesh(this.geometries[2], this.material)
                        shortCylinder.translateX(0.5)
                        shortCylinder.translateY(0.8)
                        shortCylinder.rotateZ(Math.PI / 5)
                        this.element.add(shortCylinder)
                    }
                    //加入"group"
                    this.element.add(Ellipsoid, longCylinder)

                    //设置随机的缩放
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }

                update = () => {
                    //以下是针对单个物体的操作
                    //在这里，旋转角速度是恒定的
                    this.element.rotation.x += 0.02;
                    this.element.rotation.y += 0.02;
                    this.element.position.x += this.Direction[0];
                    //白天和黑夜模式位移相反
                    if (colorMode.value === 'white') {
                        this.element.position.y -= this.Direction[1];
                    }
                    else {
                        this.element.position.y += this.Direction[1];
                    }
                    //检查是否超过底部
                    if (colorMode.value === 'white' && (this.element.position.y < -10 || this.element.position.y > 20)) {
                        this.reset()
                    }
                    else if (colorMode.value === 'black' && (this.element.position.y < -20 || this.element.position.y > 10)) {
                        this.reset()
                    }
                }
                reset = () => {
                    //必须按照以下顺序进行
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Scale = this.rand * 0.3 + 0.2
                    this.Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状,材质就不更新了
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设定新方块初始位置
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    //以下会在update时用到
                    // 更新运动方向角（-30 到 30 度）
                    this.DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                    // 更新运动方向向量
                    this.Direction = [
                        Math.sin(this.DirectionAngle) * this.Speed,
                        Math.cos(this.DirectionAngle) * this.Speed// 向下运动
                    ]
                }
            }
            //渲染夜间星星
            class animateStar {
                //屏幕上随机生成位置
                Position = [Math.random() * 12 - 6, Math.random() * 20 - 10]
                rand = Math.random()
                Size = this.rand / 5 + 0.1
                maxOpacity = Math.random() + 0.6//最大不透明度
                Opacity = []//透明度连续变化
                iterateCount = Math.random() * 200 + 100//随机化不透明度迭代次数
                Count = 0//遍历Opacity数组
                geometry = new THREE.CircleGeometry(this.Size, 3)
                //设置材质.就白色的吧，其他颜色不是很明显
                material = new THREE.MeshBasicMaterial({
                    color: 'rgb(240,240,240)',
                    transparent: true,
                    opacity: 0
                })
                element = new THREE.Mesh(this.geometry, this.material)
                constructor() {
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = 0
                    this.element.rotation.z = Math.random() * Math.PI / 3//随机化旋转角度
                    //设置透明度连续变化,可见时间:不可见时间=3:7
                    for (let i = 0; i < this.iterateCount; i++) {
                        if (i < this.iterateCount * 0.1) {
                            this.Opacity.push(i / this.iterateCount * 0.1) * this.maxOpacity;
                        }
                        else if (this.iterateCount * 0.1 <= i <= this.iterateCount * 0.3) {
                            this.Opacity.push((this.iterateCount * 0.3 - i) / this.iterateCount * 0.2) * this.maxOpacity;
                        }
                        else {
                            this.Opacity.push(0);
                        }
                    }
                    //随机化闪烁时间
                    setInterval(() => scene.add(this.element), Math.random() * 5000)
                }
                update = () => {
                    if (colorMode.value === 'white') {
                        scene.remove(this.element)
                        this.Count = 0;
                        this.element.opacity = 0;
                        return;
                    }
                    else {
                        scene.add(this.element)
                        //在update中进行不透明度循环
                        this.element.material.opacity = this.Opacity[this.Count];
                        this.Count++;
                        if (this.Count >= this.iterateCount) {
                            this.Count = 0
                            this.reset()
                        }
                    }
                }
                //重置方法，
                reset = () => {

                    scene.remove(this.element)
                    //更新位置和大小
                    this.Position = [Math.random() * 12 - 6, Math.random() * 20 - 10]
                    this.rand = Math.random()
                    this.Size = this.rand / 5 + 0.1
                    this.geometry = new THREE.CircleGeometry(this.Size, 3)
                    this.element.geometry = this.geometry
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = 0
                    this.element.rotation.z = Math.random() * Math.PI / 3//随机化旋转角度
                    //更新随机化不透明度和持续时间
                    this.maxOpacity = Math.random() + 0.6//最大不透明度
                    this.iterateCount = Math.random() * 200 + 100//随机化不透明度迭代次数
                    this.Opacity = []//清空不透明度变化数组
                    for (let i = 0; i < this.iterateCount; i++) {
                        if (i < this.iterateCount * 0.1) {
                            this.Opacity.push(i / this.iterateCount * 0.1) * this.maxOpacity;
                        }
                        else if (this.iterateCount * 0.1 <= i <= this.iterateCount * 0.3) {
                            this.Opacity.push((this.iterateCount * 0.3 - i) / this.iterateCount * 0.2) * this.maxOpacity;
                        }
                        else {
                            this.Opacity.push(0);
                        }
                    }
                    //随机化闪烁时间
                    setInterval(() => scene.add(this.element), Math.random() * 5000)
                }
            }
            //渲染rashinban.只有旋转运动
            class animateRashinban {
                Position = [0,0,0]//固定在屏幕中心位置
                DirectionAngle = Math.random() * Math.PI / 3 - Math.PI / 6;
                Speed = (1 / (200 * (this.Scale)))//根据物体大小决定物体速度

                //创建椭球体的方法。半径为x,y,z
                EllipsoidGeometry = (x, y, z) => {
                    const ellipsoidGeometry = new THREE.SphereGeometry(1, 7, 7);
                    const positionAttribute = ellipsoidGeometry.getAttribute('position');

                    for (let i = 0; i < positionAttribute.count; i++) {
                        const vertex = new THREE.Vector3();
                        vertex.fromBufferAttribute(positionAttribute, i);
                        vertex.x *= x;
                        vertex.y *= y;
                        vertex.z *= z;
                        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
                    }
                    return ellipsoidGeometry;
                }
                //设置音符的三种模型的形状.具体的scale不在这里设置
                geometries = [
                    this.EllipsoidGeometry(0.4, 0.2, 0.2),//底部椭球
                    new THREE.CylinderGeometry(0.08, 0.08, 1.5, 3, 1, true),//长杆
                    new THREE.CylinderGeometry(0.05, 0.12, 0.8, 8, 1, true)]//短杆
                //设置材质
                material = new THREE.MeshLambertMaterial({
                    color: elementColor,
                    transparent: true,
                    opacity: 0.2,
                });
                //整个音符
                element = new THREE.Group()

                // type为1是八分音符，否则为四分音符
                constructor(type) {
                    //生成椭球、长杆和短杆
                    const Ellipsoid = new THREE.Mesh(this.geometries[0], this.material)
                    const longCylinder = new THREE.Mesh(this.geometries[1], this.material)

                    //调节位置
                    Ellipsoid.translateY(-0.5)
                    longCylinder.translateX(0.3)
                    longCylinder.translateY(0.3)
                    if (type === 1) {
                        const shortCylinder = new THREE.Mesh(this.geometries[2], this.material)
                        shortCylinder.translateX(0.5)
                        shortCylinder.translateY(0.8)
                        shortCylinder.rotateZ(Math.PI / 5)
                        this.element.add(shortCylinder)
                    }
                    //加入"group"
                    this.element.add(Ellipsoid, longCylinder)

                    //设置随机的缩放
                    this.element.scale.set(this.Scale, this.Scale, this.Scale)
                    //设置初始位置并加入场景
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = this.Position[2]
                    scene.add(this.element);
                }

                update = () => {
                    //以下是针对单个物体的操作

                    //白天和黑夜模式旋转相反
                    if (colorMode.value === 'white') {
                        this.element.rotation.x += 0.02;
                        this.element.rotation.y += 0.02;
                    }
                    else {
                        this.element.rotation.x -= 0.02;
                        this.element.rotation.y -= 0.02;
                    }
                }
            }
            let Tetrahedrons = []//管理正四面体
            let Cubes = []//管理正方体
            let Octahedrons = []//管理正八面体
            let Icosahedrons = []//管理正二十面体
            let Stars = []//管理星星
            let Hexagrams = []//管理六芒星
            let Notes = []

            //添加组件
            for (let i = 0; i < 2; i++) {
                Tetrahedrons.push(new animateTetrahedron())
                Cubes.push(new animateCube())
                Octahedrons.push(new animateOctahedron())
                Icosahedrons.push(new animateIcosahedron())
                Hexagrams.push(new animateHexagram())
                Notes.push(new animateNote(1))
                Notes.push(new animateNote(0))
            }
            for (let i = 0; i < 200; i++) {
                Stars.push(new animateStar())
            }
            // 渲染循环
            function update() {
                Tetrahedrons.forEach((tetrahedron) => {
                    tetrahedron.update()
                })
                Cubes.forEach((cube) => {
                    cube.update()
                })
                Octahedrons.forEach((octahedron) => {
                    octahedron.update()
                })
                Icosahedrons.forEach((icosahedron) => {
                    icosahedron.update()
                })
                Hexagrams.forEach((hexagram) => {
                    hexagram.update()
                })
                if (colorMode.value === 'black') {
                    Stars.forEach((star) => {
                        star.update()
                    })
                }
                Notes.forEach((note) => {
                    note.update()
                })
                //渲染摄像机
                renderer.render(scene, camera);
                //请求渲染动画帧
                requestAnimationFrame(update);
            }
            update()
        },
        //处理视窗大小变化
        handleWindowResize() {
            const container = this.$refs.canvasContainer;
            this.updateCameraAspectRatio(this.camera, container.clientWidth / container.clientHeight);
            this.updateRendererSize(this.renderer, container.clientWidth, container.clientHeight);
        },
        updateCameraAspectRatio(camera, aspectRatio) {
            camera.aspect = aspectRatio;
            camera.updateProjectionMatrix();
        },
        updateRendererSize(renderer, width, height) {
            renderer.setSize(width, height);
        }
    }
};
</script>

<style scoped>
div {
    height: 100vh;
    width: 100vw;
}
</style>