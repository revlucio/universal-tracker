angular.module('tracker')
	.factory('hashtagService', hashtagService);

function hashtagService() {
	return {
		getTags : getTags
	};

	function getTags(note) {
		return [];
	}
}