<template>
    <div class="container" ref="containerRef"></div>
</template>
  
<script setup>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
import ColorThief from 'colorthief';
import {nextTick, onBeforeUnmount, getCurrentInstance, onMounted, ref} from 'vue';

const containerRef = ref();
const { proxy } = getCurrentInstance();

onMounted(() => {
    instance = new APlayer({
        container: containerRef.value,
        fixed: true,
        mini: true,
        autoplay: false,
        theme: '#b7daff',
        loop: 'all', // 'all' | 'one' | 'none',
        order: 'list', // 'list' | 'random'
        preload: 'auto', // 'auto' | 'metadata' | 'none'
        volume: 0.7,
        mutex: true,
        lrcType: 3,
        listFolded: true,
        listMaxHeight: '100px',
        storageName: 'aplayer-setting',
        audio: [{
            name: 'The Loneliest Girl',
            artist: 'Vo.Nai Br.XX&Celeina Ann',
            url: 'http://localhost:8000/api/music/play/1/',
            cover: 'http://localhost:8000/media/default/music_cover.jpg',
        }, {
            name: 'Hey Jude (Remastered 2009)',
            artist: 'The Beatles',
            url: 'http://localhost:8000/api/music/play/2/',
            cover: 'http://localhost:8000/media/cover/Hey_Jude_Remastered_2009.jpg',
        }],
    });
    const colorThief = new ColorThief();
    const image = new Image();
    const xhr = new XMLHttpRequest();
    const setTheme = (index) => {
        if (!instance.list.audios[index].theme) {
            xhr.onload = function() {
                let coverUrl = URL.createObjectURL(this.response);
                image.onload = function() {
                    let color = colorThief.getColor(image);
                    instance.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
                    URL.revokeObjectURL(coverUrl);
                };
                image.src = coverUrl;
            }
            xhr.open('GET', instance.list.audios[index].cover, true);
            xhr.responseType = 'blob';
            xhr.send();
        }
    };
    setTheme(instance.list.index);
    instance.on('listswitch', (index) => {
        setTheme(index);
    });
});

onBeforeUnmount(() => {
    instance.destroy();
});


</script>