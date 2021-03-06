( function () {
	'use strict';
	/* @ngInject */
function infiniteScroll ($window, $document, $timeout) {

	var $win = angular.element($window),
		$doc = angular.element($document),
		autoTrigger;


	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			console.log( 'scroll' );

			var callback = attrs.infiniteScroll,
				threshold = attrs.infiniteScrollThreshold || 200,
				scrollEnabled = true,
				onWindowScroll;

			if (attrs.infiniteScrollEnabled != null) {
				scope.$watch(attrs.infiniteScrollEnabled, function (value) {
					scrollEnabled = value;
				});
			}

			onWindowScroll = function () {

				$timeout.cancel(autoTrigger);

				autoTrigger = $timeout(function () {
					$win.trigger('scroll');
				}, 50);

				var fromBottom = $doc.height() - ($win.scrollTop() + $win.height());
				if (fromBottom < threshold && scrollEnabled) {
					scope.$apply(callback);
				}
			}

			$win.on('scroll', onWindowScroll);
			scope.$on('$destroy', function () {
				return $win.off('scroll', onWindowScroll);
			});
		}
	}
}

	angular.module('infinite-scroll', [])
	.directive( 'infiniteScroll', infiniteScroll );

})();
