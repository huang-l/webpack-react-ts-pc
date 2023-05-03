export default {
  /**
   *
   * @param {*} key 名称
   * @returns
   */
  getCookie(key: string) {
    const cookieName = encodeURIComponent(key) + "=";
    const cookieStart = document.cookie.indexOf(cookieName);
    let cookieValue = "";
    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      );
    }
    return cookieValue;
  },
  /**
   *
   * @param {*} key 名称
   * @param {*} val 值
   * @param {*} expires 有效期
   * @param {*} path 路径
   */
  setCookie(key: string, val: string, expires: object | number, path?: string) {
    let cookieText = encodeURIComponent(key) + "=" + encodeURIComponent(val);
    if (expires instanceof Date) {
      cookieText += ";expires=" + expires.toUTCString();
    }
    if (typeof expires === "number") {
      const currentTime = new Date();
      currentTime.setTime(currentTime.getTime() + expires * 24 * 3600 * 1000);
      cookieText += ";expires=" + (expires ? currentTime.toUTCString() : "");
    }
    if (path) {
      cookieText += ";path=" + path;
    }
    document.cookie = cookieText;
  },
  /**
   *
   * @param {*} key 名称
   */
  deleteCookie(key: string) {
    this.setCookie(key, "", new Date(0));
  },
};
