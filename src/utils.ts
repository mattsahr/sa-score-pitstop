import { format } from 'd3-format';
import { USDC_DECIMAL } from "./constants";
const formatSmall = format('.2s');
const formatTiny = format('.1f');

export const d3Format = (num: number) => Number(num) < 1 ? formatTiny(num) : formatSmall(num);


export const getHours = (seconds: number) => seconds / 60 / 60;

export async function retryAsync<T>(
  fn: (...arg: any) => Promise<T>,
  count = 3
) {
  let _count = count;
  while (_count > 0) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      console.log(error);
      _count -= 1;
      if (_count == 0) {
        throw error;
      } else {
        await sleep(110);
        continue;
      }
    }
  }
}

export const sleep = async function (ms: number) {
  return new Promise((resolve) =>setTimeout(resolve, ms));
};



function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function thousandsFormatter(v: number, coin: number) {
  
  let formatted = v.toString();
  
  formatted = v.toFixed(coin);
  
  let splitted = formatted.split('.');
  

  if (splitted.length>1){
    formatted = `${numberWithCommas(splitted[0])}.${splitted[1]}`;

  } else {
    formatted = numberWithCommas(splitted[0])
  }


  if(parseFloat(formatted) == 0){
    return 0;
  }
  return formatted;
}


export const timeout = async (ms: number) => new Promise((res, rej) => setTimeout(res, ms))