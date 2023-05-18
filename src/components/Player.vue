<template>
    <div ref="containerRef"></div>
    <div class="footer"></div>
</template>
  
<script setup>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
import ColorThief from 'colorthief';
import {onBeforeUnmount, getCurrentInstance, onMounted, ref} from 'vue';

const containerRef = ref();
const theme = ref('#b7daff');
const footerHeight = ref('130px');
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
        listMaxHeight: '600px',
        storageName: 'aplayer-setting',
    });

    let url = '/api/index/';
    if (props.pk != undefined) {
        if (props.playlist) {
            url = `/api/playlist/detail/${props.pk}`;
        }
        else {
            url = `/api/music/detail/${props.pk}`;
        }
    }

    proxy.$http.get(url).then(
        (response) => {
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
    ap.on('loadstart', () => {
        let author = document.getElementsByClassName('aplayer-author')[0];
        author.innerText = author.innerText.substr(2);
    });
    ap.on('lrcshow', (e) => {
        footerHeight.value = '130px';
    });
    ap.on('lrchide', (e) => {
        footerHeight.value = '82px';
    });
});
</script>

<style scope>
.aplayer-fixed {
    position: fixed !important;
    width: 400px !important;
    bottom: 0 !important;
    left: calc(100% - 400px) !important;
}

.aplayer-body {
    max-width: calc(100% - 18px) !important;
    width: calc(100% - 18px) !important;
}

.aplayer-pic {
    width: 46px !important;
    height: 46px !important;
    position: fixed !important;
    bottom: 10px !important;
    left: 10px !important;
    border-radius: 6px !important;
}

.aplayer-fixed:not(.aplayer-narrow) > .aplayer-body > .aplayer-pic > .aplayer-button {
    display: none !important;
}

.aplayer-title {
    position: fixed !important;
    top: 15px !important;
    left: 10px !important;
}

.aplayer-author {
    position: fixed !important;
    bottom: 15px !important;
    left: 10px !important;
}

.aplayer-controller {
    width: 360px !important;
    left: calc(50% - 204px) !important;
    z-index: 100 !important;
}

.aplayer-bar-wrap {
    margin: 0 !important;
}

.aplayer-time-inner {
    position: fixed !important;
    width: 426px !important;
    bottom: 6px !important;
    left: calc(50% - 237px) !important;
    display: inline-block !important;
    visibility: hidden !important;
}

.aplayer-ptime {
    position: absolute !important;
    left: 0 !important;
    visibility: visible !important;
}

.aplayer-dtime {
    position: absolute !important;
    right: -3px !important;
    visibility: visible !important;
}

.aplayer-time {
    position: absolute !important;
    width: 100% !important;
    bottom: 0 !important;
    left: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    z-index: -100 !important;
}

.aplayer-volume-wrap {
    margin: 0 !important;
    bottom: 21px !important;
    left: calc(50% - 112.5px) !important;
}

.aplayer-icon-back {
    position: fixed !important;
    left: calc(50% - 84px) !important;
}

.aplayer-icon-play {
    position: fixed !important;
    left: calc(50% - 34px) !important;
}

.aplayer-icon-forward {
    position: fixed !important;
    left: calc(50% + 16px) !important;
}

.aplayer-icon-lrc {
    position: fixed !important;
    bottom: 29.5px !important;
    left: calc(50% + 68.5px) !important;
}

.aplayer-lrc {
    position: fixed !important;
    bottom: 82px !important;
    height: 32px !important;
}

.aplayer-lrc-contents > p {
    font-size: 16px !important;
}

.aplayer-icon-order {
    position: fixed !important;
    display: inline !important;
    bottom: 25.5px !important;
    right: 102.5px !important;
}

.aplayer-icon-loop {
    position: fixed !important;
    display: inline !important;
    bottom: 25.5px !important;
    right: 60px !important;
}

.aplayer-icon-menu {
    position: fixed !important;
    bottom: 23px !important;
    right: 20px !important;
}

.footer {
    position: relative !important;
    width: 100% !important;
    height: v-bind('footerHeight');
}
</style>
