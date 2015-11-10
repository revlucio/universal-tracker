describe('durationService', function(){ 

	var durationService;

	beforeEach(function() {
		module('tracker');

		inject(function(_durationService_) {
			durationService = _durationService_;
		});
	});

	describe('isValidDuration', function() {

		it('should have the function', function() {
			expect(angular.isFunction(durationService.isValidDuration)).toBe(true);
		});

		it('should return false if duration is null object', function() {
			expectDuration(null, false);
		});

		it('should return false if duration is empty object', function() {
			expectDuration({ }, false);
		});

		it('should return false if hours is null and duration is 0', function() {
			expectDuration({ minutes: 0, seconds: 0 }, false);
		});

		it('should return false if duration is 0', function() {
			expectDuration({ hours: 0, minutes: 0, seconds: 0 }, false);
			expectDuration({ hours: '0', minutes: 0, seconds: 0 }, false);
			expectDuration({ hours: '0', minutes: '0', seconds: 0 }, false);
			expectDuration({ hours: '0', minutes: '0', seconds: '0' }, false);
		});

		it('should return true if hours are above 0', function() {
			expectDuration({ hours: 1, minutes: 0, seconds: 0 }, true);
			expectDuration({ hours: 10, minutes: 0, seconds: 0 }, true);
			expectDuration({ hours: '10', minutes: 0, seconds: 0 }, true);
		});

		it('should return true if minutes are above 0', function() {
			expectDuration({ hours: 0, minutes: 1, seconds: 0 }, true);
			expectDuration({ hours: 0, minutes: 10, seconds: 0 }, true);
			expectDuration({ hours: 0, minutes: '10', seconds: 0 }, true);
		});

		it('should return true if seconds are above 0', function() {
			expectDuration({ hours: 0, minutes: 0, seconds: 1 }, true);
			expectDuration({ hours: 0, minutes: 0, seconds: 10 }, true);
			expectDuration({ hours: 0, minutes: 0, seconds: '10' }, true);
		});

		function expectDuration(duration, toBe) {
			var result = durationService.isValidDuration(duration);
			expect(result).toBe(toBe);
		}
	});
});