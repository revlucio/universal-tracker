describe('hashtagService', function() {
	var hashtagService;

	beforeEach(function() {
		module('tracker');

		inject(function(_hashtagService_) {
			hashtagService = _hashtagService_;
		});
	});
     
	it('should have getTags function', function () { 
		expect(angular.isFunction(hashtagService.getTags)).toBe(true);
	});

	it('should be empty if no hashtags found', function() {
		var hashtags = hashtagService.getTags('no hashtags here');

		expect(hashtags.length).toBe(0);
	});

	xit('should find hashtag', function() {
		var hashtags = hashtagService.getTags('#single');

		expect(hashtags.length).toBe(1);
		expect(hashtags[0]).toBe('single');
	});
});