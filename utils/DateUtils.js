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

    }
}

module.exports = dateUtils;
