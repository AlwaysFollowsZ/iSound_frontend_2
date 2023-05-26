<template>
    <div ref="canvasContainer"></div>
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
                console.log(elementColor);
            }, 500)
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
            const spotLight2 = new THREE.SpotLight(elementColor, 1.0);// 1.0：光照强度intensity
            spotLight2.angle = Math.PI / 2;//发散角度,光锥角度的二分之一
            spotLight2.position.set(2, 3, 0);// 设置聚光光源位置
            spotLight2.penumbra = 2; // 设置聚光灯的边缘柔化
            spotLight2.decay = 2; // 设置聚光灯的衰减
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
                    //移除旧方块
                    scene.remove(this.element)
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.3
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry = new THREE.TetrahedronGeometry(this.Size);
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
                    scene.add(this.element)

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
                geometry = new THREE.BoxBufferGeometry(this.Size[0], this.Size[1], this.Size[2]);
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
                    //移除旧方块
                    scene.remove(this.element)
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = [this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3, this.rand * 0.3 + 0.3]
                    this.Speed = (1 / (100 * (this.Size[0])))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry = new THREE.BoxBufferGeometry(this.Size[0], this.Size[1], this.Size[2]);
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
                    scene.add(this.element)

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
                geometry = new THREE.OctahedronBufferGeometry(this.Size)
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
                    //移除旧方块
                    scene.remove(this.element)
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.3
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry = new THREE.OctahedronBufferGeometry(this.Size);
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
                    scene.add(this.element)

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
                    //移除旧方块
                    scene.remove(this.element)
                    //更新物体大小及速度
                    this.rand = Math.random()
                    this.Size = this.rand * 0.3 + 0.2
                    this.Speed = (1 / (100 * (this.Size)))//根据物体大小决定物体速度
                    // 更新随机初始位置
                    this.Position = (colorMode.value === 'white') ?//根据白天黑夜模式不同选择不同初始位置
                        [Math.random() * 10 - 5, Math.random() * 15 + 5, 0] ://在(-5,5),(5,20)的区域生成立方体
                        [Math.random() * 10 - 5, -Math.random() * 15 - 5, 0]//在(-5,5),(-20,-5)的区域生成立方体
                    //更新物体形状及材质
                    this.geometry = new THREE.IcosahedronGeometry(this.Size);
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
                    scene.add(this.element)

                }
            }
            //渲染夜间星星
            class animateStar {
                //屏幕上随机生成位置
                Position = [Math.random() * 12 - 6, Math.random() * 20 - 10]
                rand = Math.random()
                Size = this.rand / 10 + 0.1
                maxOpacity = Math.random() * 0.5 + 0.5//最大不透明度
                Opacity = []//透明度连续变化
                iterateCount = Math.random() * 200 + 100//随机化不透明度迭代次数
                Count = 0//遍历Opacity数组
                geometry = new THREE.CircleBufferGeometry(this.Size, 3)
                //设置材质
                material = new THREE.MeshBasicMaterial({
                    color: elementColor,
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
                    this.Size = this.rand / 10 + 0.1
                    this.geometry = new THREE.CircleGeometry(this.Size, 3)
                    this.material = new THREE.MeshBasicMaterial({
                        color: elementColor,
                        transparent: true,
                        opacity: 0
                    })
                    this.element.geometry = this.geometry
                    this.element.material = this.material
                    this.element.position.x = this.Position[0]
                    this.element.position.y = this.Position[1]
                    this.element.position.z = 0
                    this.element.rotation.z = Math.random() * Math.PI / 3//随机化旋转角度
                    //更新随机化不透明度和持续时间
                    this.maxOpacity = Math.random() * 0.5 + 0.5//最大不透明度
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


            let Tetrahedrons = []//管理正四面体
            let Cubes = []//管理正方体
            let Octahedrons = []//管理正八面体
            let Icosahedrons = []//管理正二十面体
            let Stars = []//管理星星
            for (let i = 0; i < 3; i++) {
                Tetrahedrons.push(new animateTetrahedron())
                Cubes.push(new animateCube())
                Octahedrons.push(new animateOctahedron())
                Icosahedrons.push(new animateIcosahedron())
            }
            for (let i = 0; i < 50; i++) {
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
                if (colorMode.value === 'black') {
                    Stars.forEach((star) => {
                        star.update()
                    })
                }

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