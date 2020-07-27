<template>
    <div>
        <BackHeader :title="'Chapter:' + chapter_index" :with-left="true" :color="$color('$headerColor')"/>
        <van-loading v-if="loading"/>
        <van-grid :border="false" :column-num="1" v-if="!loading">
            <van-grid-item v-for="item in items"
                           :key="item.chapter_part_index" @click="showActionSheet = true">
                <van-image :src="item.img" lazy-load/>
            </van-grid-item>
        </van-grid>
        <van-action-sheet v-model="showActionSheet"
                          cancel-text="Close"
                          :close-icon="null"
                          @select="onSelect"
                          @close="showActionSheet = false" :actions="actions">
        </van-action-sheet>
    </div>
</template>

<script>
    import BackHeader from "../components/BackHeader";
    import {FetchChapter} from "../api/action";
    import {HOST, KEY_BOOKMARK_PREFIX} from "../config/config";
    import {GET_COMIC_DETAIL} from "../store/comic/comic";
    import {AppendItem} from "../utils/storage";

    export default {
        name: "Read",
        components: {BackHeader},
        props: {
            comic_id: {type: String, required: true},
            chapter_index: {type: String, default: '1'},
        },
        created() {
            this.fetch();
            this.item = this.$store.getters[GET_COMIC_DETAIL](this.comic_id);
        },
        data() {
            return {
                loading: true,
                items: [],
                item: {},
                showActionSheet: false,
                actions: [{name: 'AddBookMark'}, {name: 'Next Chapter'}, {name: 'Back Home'}],
            }
        },
        methods: {
            fetch() {
                this.loading = true;
                FetchChapter(this.comic_id, this.chapter_index).then((resp) => {
                    if (resp.code === 200) {
                        this.items = [];
                        this.items = resp.data.sort((a, b) => {
                            return a.chapter_part_index - b.chapter_part_index;
                        }).map((item) => {
                            item['img'] = HOST + "/" + item['comic_id'] + "/" + item['chapter_index'] + "_" + item['chapter_part_index'] + "_" + item['token'] + ".jpg"
                            return item;
                        });
                    }
                    this.loading = false;
                });
            },
            onSelect(item, index) {
                this.showActionSheet = false;
                if (index === 0) {
                    AppendItem(KEY_BOOKMARK_PREFIX, {
                        comic_id: this.comic_id,
                        chapter_id: this.chapter_index,
                        id: this.comic_id,
                    })
                    this.$notify({type: 'primary', message: 'Add bookmark success'});
                } else if (index === 1) {
                    this.$router.push('/read/' + this.comic_id + '/' + (this.chapter_index * 1 + 1));
                    window.location.reload();
                } else {
                    this.$router.push('/');
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .read-action {
        text-align: right;
        padding: 1em;
    }
</style>