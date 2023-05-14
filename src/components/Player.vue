<template>
    <div ref="containerRef"></div>
</template>
  
<script setup>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
import ColorThief from 'colorthief';
import {onBeforeUnmount, getCurrentInstance, onMounted, ref} from 'vue';

const containerRef = ref();
const { proxy } = getCurrentInstance();

const props = defineProps({
    pk: Number,
    add: {
        type: Boolean,
        default: false,
    },
    playlist: {
        type: Boolean,
        default: false,
    },
});

onMounted(() => {
    const ap = new APlayer({
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
    });

    let url = '/index/';
    if (props.pk != undefined) {
        if (props.playlist) {
            url = `/playlist/detail/${props.pk}`;
        }
        else {
            url = `/music/detail/${props.pk}`;
        }
    }

    proxy.$http.get(url).then(
        (response) => {
            response.data.music_set.forEach((music) => {
                music.url = proxy.$http.defaults.baseURL + music.url;
                music.cover = proxy.$http.defaults.baseURL + music.cover;
                if (music.lrc != null) {
                    music.lrc = proxy.$http.defaults.baseURL + music.lrc;
                }
            });
            ap.list.add(response.data.music_set);
            setTheme(ap.list.index);
        }
    );

    const colorThief = new ColorThief();
    const image = new Image();
    const xhr = new XMLHttpRequest();
    const setTheme = (index) => {
        xhr.onload = function() {
            const coverUrl = URL.createObjectURL(this.response);
            image.onload = function() {
                const color = colorThief.getColor(image);
                ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
                URL.revokeObjectURL(coverUrl);
            };
            image.src = coverUrl;
        };
        xhr.open('GET', ap.list.audios[index].cover, true);
        xhr.responseType = 'blob';
        xhr.send();
    };
    ap.on('listswitch', (e) => {
        setTheme(e.index);
    });
});
</script>

<style scope>
/* .aplayer.aplayer-fixed {
    max-width: 100%;
    width: 100%;
} */
</style>