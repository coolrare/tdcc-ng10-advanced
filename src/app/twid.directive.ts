import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

// https://www.npmjs.com/package/taiwan-id-validator2
import {
  isGuiNumberValid, // 統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isCitizenDigitalCertificateValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid // 捐贈碼
} from 'taiwan-id-validator2';

@Directive({
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
