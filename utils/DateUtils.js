var dateUtils = {
    // name: 'app',
    // version: '1.0.0',
    showCurrentTime: function () {
        // 获取当前时间
        var nowdate = new Date();

        var year = nowdate.getFullYear(),

            month = nowdate.getMonth() + 1,

            date = nowdate.getDate(),

            // day = nowdate.getDay(),

            // week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],

            h = nowdate.getHours(),

            m = nowdate.getMinutes(),

            s = nowdate.getSeconds();

            // h = checkTime(h),
            //
            // m = checkTime(m),
            //
            // s = checkTime(s);

        return year + "-" + month + "-" + date;

    },
    getHour: function (s1, s2) {
        // 获取两个时间的小时差
        s1 = new Date(s1.replace(/-/g, '/'));
        s2 = new Date(s2.replace(/-/g, '/'));
        var ms = s2.getTime() - s1.getTime();
        // if (ms < 0) return 0;
        return Math.floor(ms / 1000 / 60 / 60);  //小时
    }
}

module.exports = dateUtils;
