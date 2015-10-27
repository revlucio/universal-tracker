angular.module('tracker')
	.config(config);

function config($ionicConfigProvider, $mdGestureProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.position('top');
    $ionicConfigProvider.backButton.text('back');
    $mdGestureProvider.skipClickHijack();
	$ionicConfigProvider.views.maxCache(0);
}