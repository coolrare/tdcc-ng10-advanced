import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[twid][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TwidValidator, multi: true }
  ]
})

export class TwidValidator implements Validator {
  validate(c: FormControl): { [key: string]: any } {
    if (isNationalIdentificationNumberValid(c.value)) {
      return null;
    }

    return {
      twid: true
    };
  }
}


/**
 * Verify the intermediate string for isNationalIdentificationNumberValid and isResidentCertificateNumberValid
 * @param { string } input String to verify
 * @returns { boolean }
 */
function verifyTaiwanIdIntermediateString(input: string): boolean {
  const idArray: string[] = input.split('');
  const intRadix = 10;
  const TAIWAN_ID_LOCALE_CODE_LIST = [
    1, // A -> 10 -> 1 * 1 + 9 * 0 = 1
    10, // B -> 11 -> 1 * 1 + 9 * 1 = 10
    19, // C -> 12 -> 1 * 1 + 9 * 2 = 19
    28, // D
    37, // E
    46, // F
    55, // G
    64, // H
    39, // I -> 34 -> 1 * 3 + 9 * 4 = 39
    73, // J
    82, // K
    2, // L
    11, // M
    20, // N
    48, // O -> 35 -> 1 * 3 + 9 * 5 = 48
    29, // P
    38, // Q
    47, // R
    56, // S
    65, // T
    74, // U
    83, // V
    21, // W -> 32 -> 1 * 3 + 9 * 2 = 21
    3, // X
    12, // Y
    30 // Z -> 33 -> 1 * 3 + 9 * 3 = 30
  ];

  const RESIDENT_CERTIFICATE_NUMBER_LIST = [
    '0', // A
    '1', // B
    '2', // C
    '3', // D
    '4', // E
    '5', // F
    '6', // G
    '7', // H
    '4', // I
    '8', // J
    '9', // K
    '0', // L
    '1', // M
    '2', // N
    '5', // O
    '3', // P
    '4', // Q
    '5', // R
    '6', // S
    '7', // T
    '8', // U
    '9', // V
    '2', // W
    '0', // X
    '1', // Y
    '3' // Z
  ];

  // if is not a number (居留證編號)
  if (isNaN(parseInt(idArray[1], intRadix))) {
    idArray[1] =
      RESIDENT_CERTIFICATE_NUMBER_LIST[input.charCodeAt(1) - 'A'.charCodeAt(0)];
  }

  const result = idArray.reduce(
    (sum: number, n: string, index: number): number => {
      if (index === 0) {
        return (
          sum +
          TAIWAN_ID_LOCALE_CODE_LIST[
            idArray[0].charCodeAt(0) - 'A'.charCodeAt(0)
          ]
        );
      } else if (index === 9) {
        return sum + parseInt(idArray[9], intRadix);
      }
      return sum + parseInt(idArray[index], intRadix) * (9 - index);
    },
    0
  );

  if (result % 10 === 0) {
    return true;
  }

  return false;
}


/**
 *  Verify the input is a valid National identification number (中華民國身分證字號)
 *  A=10 台北市     J=18 新竹縣     S=26 高雄縣
 *  B=11 台中市     K=19 苗栗縣     T=27 屏東縣
 *  C=12 基隆市     L=20 台中縣     U=28 花蓮縣
 *  D=13 台南市     M=21 南投縣     V=29 台東縣
 *  E=14 高雄市     N=22 彰化縣     W=32 金門縣*
 *  F=15 台北縣     O=35 新竹市*    X=30 澎湖縣
 *  G=16 宜蘭縣     P=23 雲林縣     Y=31 陽明山
 *  H=17 桃園縣     Q=24 嘉義縣     Z=33 連江縣*
 *  I=34 嘉義市*    R=25 台南縣
 *
 *  Step 1: 英文字母按照上表轉換為數字之後，十位數 * 1 + 個位數 * 9 相加
 *  Step 2: 第 1 位數字 (只能為 1 or 2) 至第 8 位數字分別乘上 8, 7, 6, 5, 4, 3, 2, 1 後相加，再加上第 9 位數字
 *  Step 3: 如果該數字為 10 的倍數，則為正確身分證字號
 * @param { string } input National identification number
 * @returns { boolean }
 */
export function isNationalIdentificationNumberValid(input: string): boolean {
  const regex: RegExp = /^[A-Z][1,2,8,9]\d{8}$/;
  if (!regex.test(input)) {
    return false;
  }

  return verifyTaiwanIdIntermediateString(input);
}
