module.exports = {
  isValidUrl: (url) => {
    var RegExp = /^(:\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

    if (RegExp.test(url)) {
      return true;
    } else {
      return false;
    }
  },
};
