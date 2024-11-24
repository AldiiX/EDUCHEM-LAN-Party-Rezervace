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
        temp: {
            ownSetup: false,
            room: null,
        },
        static: {
            pcrooms: {
                vt3: {
                    label: "(tabule)",
                    pcs: [
                        [
                            ['04', '03'], ['02', '01']
                        ],
                        [
                            ['08', '07'], ['06', '05']
                        ],
                        [
                            ['12', '11'], ['10', '09']
                        ],
                        [
                            ['16', '15'], ['14', '13']
                        ],
                        [
                            ['20', '19'], ['18', '17']
                        ],
                        [
                            ['24', '23'], ['22', '21']
                        ],
                        [
                            ['29', '28'], ['27', '26']
                        ]
                    ],
                },
                vrr: {
                    label: "(okna)",
                    pcs: [
                        [
                            ['10', '01']
                        ],
                        [
                            ['09', '02']
                        ],
                        [
                            ['08', '03']
                        ],
                        [
                            ['07', '04']
                        ],
                        [
                            ['06', '05']
                        ]
                    ],
                },
            },
        },
        pcs: [],
        rooms: [],
        announcements: [],
    },
    methods: {
        main: function () {
            const _this = this;
            fetch("/api/computers/").then(response => response.json()).then(data => {
                _this.pcs = data;
            });
            fetch("/api/rooms/").then(response => response.json()).then(data => {
                _this.rooms = data;
            });
            _this.temp.room = localStorage.getItem("room");
        },
        scrollToElement(elementId) {
            scrollToElement(elementId);
        },
        addAnnouncement: function (text, type = "info", timeout = 5000) {
            addAnnouncement(this, text, type, timeout);
        },
        copyToClipboard: function (text) {
            copyToClipboard(text);
        },
        setPCStyle: function (pcID) {
            const _this = this;
            const obj = {};
            const selectedPC = _this.getComputer(pcID);
            if (selectedPC == null) {
                obj['--bg'] = "#dcdcdc";
                obj['--modal-pointer-events'] = "all";
            }
            else if (selectedPC?.reservedBy == null) {
                obj['--bg'] = "#a5d6a7";
                obj['--modal-pointer-events'] = "all";
            }
            else if (selectedPC?.reservedByMe === true) {
                obj['--bg'] = "#80e1ff";
                obj['--modal-pointer-events'] = "all";
            }
            else {
                obj['--bg'] = "#ff8a80";
                obj['--modal-pointer-events'] = "none";
            }
            return obj;
        },
        setRoomStyle: function (room) {
            const _this = this;
            const obj = {};
            if (room?.reservedByMe === true) {
                obj['--bg'] = "#80e1ff";
                obj['--modal-pointer-events'] = "all";
            }
            else if (room?.reservedBy?.length >= room?.limitOfSeats) {
                obj['--bg'] = "#ff8a80";
                obj['--modal-pointer-events'] = "all";
            }
            else {
                obj['--bg'] = "#a5d6a7";
                obj['--modal-pointer-events'] = "all";
            }
            return obj;
        },
        getComputer: function (pcID) {
            const _this = this;
            return _this.pcs.find((x) => x.id === pcID);
        },
        saveRoomToLocalStorage: function () {
            const _this = this;
            localStorage.setItem('room', _this.temp.room);
        },
        getRoomsMax: function () {
            let max = 0;
            const _this = this;
            for (const room of _this.rooms)
                max += room.limitOfSeats;
            return max;
        },
        getRoomsReserved: function () {
            let reserved = 0;
            const _this = this;
            for (const room of _this.rooms)
                reserved += room.reservedBy.length;
            return reserved;
        },
    },
    computed: {},
});