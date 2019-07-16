/**
 * 获取URL参数值
 * @param {String} name 参数名
 * @returns {String}
 */
const getUrlQuery = function (name, path) {
    const result =
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [
        undefined,
        ''
      ])[1].replace(/\+/g, '%20')
    ) || null;
    return result ? result : '';
}

module.exports = {
    getUrlQuery
}