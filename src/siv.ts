// export class Siv {
// 	public static any() {
// 		return {
// 			validate(data) {
// 				return {
// 					valid: true
// 				};
// 			};
// 		};
// 	}
// }
interface ValidationResult {
	valid: boolean;
}

export class Siv {
	public static any() {
		return new AnyValidator();
	}

	public static equals(value: any) {
		return new EqualsValidator(value);
	}

	public static object(object: any) {
		return new ObjectValidator(object);
	}
}

interface Validator {
	validate(data: any): ValidationResult
}

class AnyValidator implements Validator {
	validate(data: any): ValidationResult {
		return {
			valid: true
		};
	}
}

class EqualsValidator implements Validator {
	constructor(private _value: any) { }
	validate(data: any): ValidationResult {
		const isValid = data === this._value
		return {
			valid: isValid
		};
	}
}

class ObjectValidator implements Validator {
	constructor(private _object) {
	}
	validate(data: any) {
		if (typeof data !== 'object') {
			return {
				valid: false
			};
		}
		if (Array.isArray(data) || data === null) {
			return {
				valid: false
			};
		}

		return {
			valid: true
		};
	}
}