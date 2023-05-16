<template>
    <div ref="containerRef"></div>
</template>
  
<script setup>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
import ColorThief from 'colorthief';
import {onBeforeUnmount, getCurrentInstance, onMounted, ref} from 'vue';

const containerRef = ref();
const theme = ref('#b7daff');
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
        theme: theme.value,
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
                theme.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                ap.theme(theme.value, index);
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
.aplayer-fixed {
    max-width: 100% !important;
    width: 100% !important;
}

.aplayer-body {
    max-width: calc(100% - 18px) !important;
    width: calc(100% - 18px) !important;
}

.aplayer-pic {
    width: 52.8px !important;
    height: 52.8px !important;
    position: fixed !important;
    bottom: 6.6px !important;
    left: 6.6px !important;
    border-radius: 6.6px !important;
}

.aplayer-bar-wrap {
    position: fixed !important;
    margin: 0 !important;
    width: calc(25% + 21px) !important;
    left: calc(37.5% - 34.5px) !important;
}

.aplayer-time-inner {
    visibility: hidden !important;
}

.aplayer-ptime {
    position: fixed !important;
    left: calc(37.5% - 71.54px) !important;
    visibility: visible !important;
}

.aplayer-dtime {
    position: fixed !important;
    left: calc(62.5% - 6.5px) !important;
    visibility: visible !important;
}

.aplayer-icon-loop {
    position: fixed !important;
    left: calc(50% - 109px) !important;
}

.aplayer-icon-back {
    position: fixed !important;
    left: calc(50% - 74px) !important;
}

.aplayer-icon-play {
    position: fixed !important;
    left: calc(50% - 34px) !important;
}

.aplayer-icon-forward {
    position: fixed !important;
    left: calc(50% + 6px) !important;
}

.aplayer-icon-menu {
    position: fixed !important;
    left: calc(50% + 46px) !important;
}

.aplayer-lrc {
    position: fixed !important;
    bottom: 82px !important;
    height: 32px !important;
}

.aplayer-lrc-contents > p {
    font-size: 16px !important;
}
</style>
