import { Siv } from '../src/siv';

describe('given a schema and data', () => {
	describe('when validated', () => {
		it('should validate correctly', () => {
			expect(Siv.any().validate({}).valid)
				.toBe(true);
			expect(Siv.equals('Test').validate('Test').valid)
				.toBe(true);
			expect(Siv.object({
				name: Siv.equals('Ariel')
			}).validate({
				name: 'Ariel'
			}).valid)
				.toBe(true);
			// expect(Siv.object({
			// 	name: Siv.equals('Lior')
			// }).validate({
			// 	name: 'Ariel'
			// }).valid)
			// 	.toBe(false);
		});
	});
});

describe('any()', () => {
	describe('given data', () => {
		describe('when validated', () => {
			it('should always return valid true', () => {
				expect(Siv.any().validate(null).valid)
					.toBe(true);
			});
		});
	});
});

describe('equals()', () => {
	describe('given primitive data', () => {
		describe('when validated to same value', () => {
			it('should return valid true', () => {
				expect(Siv.equals('5').validate('5').valid)
					.toBe(true);
				expect(Siv.equals(12).validate(12).valid)
					.toBe(true);
				expect(Siv.equals(true).validate(true).valid)
					.toBe(true);
				expect(Siv.equals(null).validate(null).valid)
					.toBe(true);
			});
		});
		describe('when validated to different value', () => {
			it('should return valid false', () => {
				expect(Siv.equals(5).validate(null).valid)
					.toBe(false);
				expect(Siv.equals(5).validate('5').valid)
					.toBe(false);
				expect(Siv.equals('5').validate(5).valid)
					.toBe(false);
				expect(Siv.equals(null).validate(undefined).valid)
					.toBe(false);
				expect(Siv.equals(NaN).validate(NaN).valid)
					.toBe(false);
			});
		});
	});
});

describe('object()', () => {
	describe('given empty object schema', () => {
		describe('when validated', () => {
			it('should return valid true for any Object', () => {
				expect(Siv.object({}).validate({}).valid)
					.toBe(true);

				expect(Siv.object({}).validate({
					name: 'Ron'
				}).valid)
					.toBe(true);
			});
			it('should return valid false for Array', () => {
				expect(Siv.object({}).validate([]).valid)
					.toBe(false);
			});
			it('should return valid false for null', () => {
				expect(Siv.object({}).validate(null).valid)
					.toBe(false);
			});
			it('should return valid false for Number', () => {
				expect(Siv.object({}).validate(5).valid)
					.toBe(false);
			});
			it('should return valid false for String', () => {
				expect(Siv.object({}).validate('Noa=exp0').valid)
					.toBe(false);
			});
			it('should return valid false for Function', () => {
				expect(Siv.object({}).validate(() => ({})).valid)
					.toBe(false);
			});
		});
	});
});