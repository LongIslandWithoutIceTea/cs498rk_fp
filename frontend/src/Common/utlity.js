export const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";
export const server = "http://localhost:4000/"
export function division(a,b){
  if (b === 0){
    return 0;
  }else{
    return Math.round(a / b * 100) / 100;
  }
}

export function divisionWhole(a,b){
  if (b === 0){
    return 0;
  }else{
    return Math.round(a / b);
  }
}

export function time(input) {
    var date = new Date(parseInt(input.toString()+"000"));
    return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()))
}

export function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
