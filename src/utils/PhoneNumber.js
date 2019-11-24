function PhoneNumber(num) {
    if(typeof num === 'string') {
        return num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    } else {
        return num;
    }
}

export default PhoneNumber;