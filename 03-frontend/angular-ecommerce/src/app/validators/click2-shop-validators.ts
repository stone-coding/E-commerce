import { FormControl, ValidationErrors } from "@angular/forms";

export class Click2ShopValidators {
    // whitespace validation
    // if validation check fails then return validation errors
    // if validation check passes return null
    static notOnlyWhitespace(control: FormControl): ValidationErrors {
        //check if string only contains white space
        if((control.value != null) && (control.value.trim().length <= 1)){
            // invalid, return error object
            // 'notOnlyWhiteSpace' is a validation error key, the
            // html template will check for this error key 
            return {'notOnlyWhiteSpace': true}
        }else{
            //valid, return null
            return null
        }
        
    }
}
