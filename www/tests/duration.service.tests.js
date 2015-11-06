describe('durationService', function(){ 

	var durationService;

	beforeEach(function() {
		module('tracker');

		inject(function(_durationService_) {
			durationService = _durationService_;
		});
	});

	describe('isDurationZero', function() {

		it('should have function', function () { 
//			expect(angular.isFunction(durationService.isDurationZero)).toBe(true);
		});

		// it('should return true if no duration', function() {
		// 	expect(true).toBe(false);
		// });
	});
});