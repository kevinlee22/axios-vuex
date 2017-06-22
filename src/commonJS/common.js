import axios from 'axios';

/**
 * @param url 请求的url
 * @param data post发送的数据
 */
export function http (url,data,callback) {
    let config = {
        method: 'post',
        url: url,
        params: data,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        requestHeader: {'Content-Type': 'application/json'}
    };
    axios(config).then(callback);
}

export function httpGet (url,data,callback) {
    let config = {
        method: 'get',
        url: url,
        params: data,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        requestHeader: {'Content-Type': 'application/json'}
    };
    axios(config).then(callback);
}


/**
 * 数字金额大写转换(可以处理整数,小数,负数
 * @param n
 * @returns {string}
 */
  export function digitUp (n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
};


/**
 *
 * @param obj 日期对象或者字符串
 * 日期的格式转换
 * @returns {string}
 */
export function dateFormat(obj){
    if(typeof obj==="object"){
        let year = obj.getFullYear();
        let month = obj.getMonth()+1;
        let todayDate = obj.getDate();
        return year+'-'+month+'-'+todayDate;
    }
    if(typeof obj==="string"){
        return obj.slice(0,10);
    }
}
/**
 *
 * @param obj 日期对象
 * @returns {string} 2017-07
 */
export function dateFormatMon(obj){

    if(typeof obj==="object"){
        let year = obj.getFullYear();
        let month = obj.getMonth()+1;
        if(month<10){
            month='0'+month;
        }
        return year+'-'+month;
    }else{
        return obj;
    }

}


/**
 *
 * @param arr 自定义的数据模型 是个数组
 */
export function jsonFormat(arr){

}

/**
 *
 * @param phone 手机号
 * @returns {boolean}
 */

export function isTel(phone){
     return  /^1[34578]\d{9}$/.test(phone);
}

/**
 * 判断是否是数字
 * @param num
 * @returns {boolean}
 */
export function isNum(num){
    return  /^\d+(\.\d{1,2})?$/.test(num);
}

/**
 * 金钱过滤器，带两位小数
 * @param num
 * @returns
 */
export function currency(num){
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    var cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
            num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}
/**
 * 验证身份证的合法性
 * @param str 字符串或者数字
 * @returns {boolean}
 */
export function isIdCard(str) {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(str);
}

/**
 * 判断是否登录
 */
export function isLogin() {

}


