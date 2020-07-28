<template>
    <div class="read-area">
        <BackHeader :title="'Chapter:' + chapter_index" :with-left="true" :color="$color('$headerColor')"/>
        <van-loading v-if="loading"/>
        <van-button style="position: absolute; right: 2em; bottom: 2em; width: 48px; height: 48px;"
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    @click="showActionSheet = true"
                    icon="bookmark-o" type="info" round/>
        <iframe :src="iframe_src"
                class="read-frame"
                @click="showActionSheet = true" v-if="!loading"/>
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
    import {CODES, HOST, KEY_BOOKMARK_PREFIX} from "../config/config";
    import {GET_BOOK_DETAIL} from "../store/book/book";
    import {AppendItem} from "../utils/storage";
    import {FetchChapters} from "../api/action";

    export default {
        name: "Read",
        components: {BackHeader},
        props: {
            book_id: {type: String, required: true},
            chapter_index: {type: String, default: '1'},
        },
        created() {
            this.fetch();
            this.item = this.$store.getters[GET_BOOK_DETAIL](this.book_id);
        },
        mounted() {

        },
        data() {
            return {
                loading: true,
                item: {},
                iframe_src: '',
                showActionSheet: false,
                actions: [{name: 'AddBookMark'}, {name: 'Next Chapter'}, {name: 'Back Home'}],
            }
        },
        methods: {
            fetch() {
                this.loading = true;
                FetchChapters(this.book_id, this.chapter_index*1).then((resp) => {
                    if (resp.data.code === CODES.SUCCESS) {
                        console.log('FetchChapters', resp);
                        this.iframe_src = HOST + "/" + resp.data.data[0]['book_id'] +
                            "/" + resp.data.data[0]['chapter_index'] + "_" + resp.data.data[0]['token'] + ".txt";
                    }
                    this.loading = false;
                });
            },
            onSelect(item, index) {
                this.showActionSheet = false;
                if (index === 0) {
                    AppendItem(KEY_BOOKMARK_PREFIX, {
                        book_id: this.book_id,
                        chapter_id: this.chapter_index,
                        id: this.book_id,
                    })
                    this.$notify({type: 'primary', message: 'Add bookmark success'});
                } else if (index === 1) {
                    this.$router.push('/read/' + this.book_id + '/' + (this.chapter_index * 1 + 1));
                    window.location.reload();
                } else {
                    this.$router.push('/');
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .read-area {
        height: 100vh;
        padding: 1em;
    }

    .read-action {
        text-align: right;
        padding: 1em;
    }

    .read-frame {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>