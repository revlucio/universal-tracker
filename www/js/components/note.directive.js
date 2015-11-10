angular.module('tracker')
	.directive('utNote', note);

function note() {
	return {
		templateUrl: 'components/note.directive.html',
		scope: {
			data: '='
		}
	};
}