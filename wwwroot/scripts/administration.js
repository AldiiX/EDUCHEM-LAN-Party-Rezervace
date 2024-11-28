const module = await import(`/scripts/functions.js?v=${new Date().getTime()}`);
const { addAnnouncement, scrollToElement, addPrefetchLink, copyToClipboard } = module;
export const vue = new Vue({
    el: "#app",
    mounted: function () {
        this.main();
    },
    data: {
        currentPage: null,
        vueLoaded: true,
        temp: {},
        announcements: [],
        users: [],
    },
    methods: {
        main: function () {
            const _this = this;
            fetch("/api/users/").then(response => response.json()).then(data => {
                _this.users = data;
            });
        },
        scrollToElement(elementId) {
            scrollToElement(elementId);
        },
        addAnnouncement: function (text, type = "info", timeout = 5000) {
            addAnnouncement(this, text, type, timeout);
        },
        addPrefetchLink: function (url) {
            addPrefetchLink(url);
        },
        copyToClipboard: function (text) {
            copyToClipboard(text);
        },
        generateRandomKey: function (length = 48) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let key = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                key += chars[randomIndex];
            }
            return key;
        },
    },
    computed: {},
});
