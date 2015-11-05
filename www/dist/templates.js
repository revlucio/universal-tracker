angular.module("tracker").run(["$templateCache", function($templateCache) {$templateCache.put("add/add.html","<ion-nav-view></ion-nav-view>\n");
$templateCache.put("add/duration.html","<ion-view title=\"Add Activity: {{vm.newActivity.name}}\">\n	<ion-nav-button side=\"left\">\n	<ion-nav-back-button class=\"ion-ios-arrow-back\" style=\"\">\n	      </ion-nav-back-button>\n	</ion-nav-button>\n\n	<ion-content class=\"padding custom-content\">\n		<div class=\"row\">\n			<div class=\"col\">Hours:</div>\n			<div class=\"col\">Minutes:</div>\n			<div class=\"col\">Seconds:</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col\">\n				<input type=\"number\" size=\"2\" min=\"0\" max=\"24\"\n					pattern=\"[0-9]*\"\n					ng-model=\"vm.newActivity.duration.hours\"/>\n			</div>\n			<div class=\"col\">\n				<input type=\"number\" size=\"2\" min=\"0\" max=\"60\" \n					pattern=\"[0-9]*\"\n					ng-model=\"vm.newActivity.duration.minutes\"/>\n			</div>\n			<div class=\"col\">\n				<input type=\"number\" size=\"2\" min=\"0\" max=\"60\" \n					pattern=\"[0-9]*\"\n					ng-model=\"vm.newActivity.duration.seconds\"/>\n			</div>\n		</div>\n	</ion-content>	\n\n	<div class=\"bar bar-footer\">\n		<button class=\"button col\" ui-sref=\"tab.dash\">\n	      Cancel\n	    </button>\n		<span class=\"col\"></span>\n	    <button class=\"button button-positive col\" ng-disabled=\"vm.getDuration() <= 0\" ut-click=\"vm.addActivity()\">\n	      Add\n	    </button>\n	</div>\n</ion-view>\n");
$templateCache.put("add/name.html","<ion-view title=\"Add Activity\" ng-init=\"vm.reset()\">\n	<ion-nav-button side=\"left\">\n	<ion-nav-back-button class=\"ion-ios-arrow-back\" style=\"\">\n	      </ion-nav-back-button>\n	</ion-nav-button>\n\n	<ion-content class=\"padding custom-content\">\n		<div class=\"list\">\n		  <label class=\"item item-input\">\n		    <span class=\"input-label\">Name</span>\n		    <input \n		    	type=\"text\" \n		    	ng-model=\"vm.newActivity.name\" \n		    	placeholder=\"Enter a custom name here\"\n		    	ut-restrict=\"[a-zA-Z0-9 ]\">\n	  		</label>\n		  	<div class=\"centered assertive\" ng-if=\"vm.nameAlreadyExists()\">\n				<strong>That activity already exists</strong>\n			</div>\n		</div>\n\n		<div class=\"centered\">\n			or:\n		</div>\n		<br/>\n		<div class=\"centered\">\n			<a class=\"button button-positive\" ui-sref=\"add-activity.select-name\">\n				Choose from our suggestions\n			</a>\n		</div>\n	</ion-content>	\n\n	<div class=\"bar bar-footer\">\n	  <button class=\"button col\" ui-sref=\"tab.dash\">\n	      Cancel\n	    </button>\n		<span class=\"col\"></span>\n	    <button ng-disabled=\"vm.activityInvalid()\" class=\"button button-positive col\" ui-sref=\"add-activity.type\">\n	      Next\n	    </button>\n	</div>\n</ion-view>\n");
$templateCache.put("add/select-name.html","<ion-view title=\"Add Activity\">\n	<ion-nav-button side=\"left\">\n	<ion-nav-back-button class=\"ion-ios-arrow-back\" style=\"\">\n	      </ion-nav-back-button>\n	</ion-nav-button>\n\n	<ion-content class=\"padding custom-content has-footer\">\n		<div class=\"list\">\n		  		<ion-radio class=\"item\" ng-repeat=\"activityType in vm.activityTypes\"\n		  			ng-model=\"vm.newActivity.name\" \n					ng-value=\"activityType\">\n					<div class=\"radio-button\">{{activityType}}</div>\n				</ion-radio>\n		</div>\n	</ion-content>	\n\n	<div class=\"bar bar-footer\">\n		<button class=\"button col\" ui-sref=\"tab.dash\">\n	      Cancel\n	    </button>\n		<span class=\"col\"></span>\n	    <button class=\"button button-positive col\" ng-disabled=\"!vm.newActivity.name\" ui-sref=\"add-activity.type\">\n	      Next\n	    </button>\n	</div>\n</ion-view>\n");
$templateCache.put("add/type.html","<ion-view title=\"Add Activity: {{vm.newActivity.name}}\">\n	<ion-nav-button side=\"left\">\n	<ion-nav-back-button class=\"ion-ios-arrow-back\" style=\"\">\n	      </ion-nav-back-button>\n	</ion-nav-button>\n\n	<ion-content class=\"padding custom-content\">\n		<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'single\'\">\n			<div class=\"circle-select\">1</div>\n			<div class=\"select\">A single occurrence</div>\n		</ion-radio>\n		<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'multi\'\">\n			<div class=\"circle-select\">#</div>\n			<div class=\"select\">Multiple occurrences</div>\n		</ion-radio>\n		<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'duration\'\">\n			<div class=\"circle-select icon-select\"><i class=\"ion-ios-stopwatch-outline\"></i></div>\n			<div class=\"select\">A timed duration</div>\n		</ion-radio>\n		<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'countdown\'\">\n			<div class=\"circle-select icon-select\"><i class=\"ion-ios-timer-outline\"></i></div>\n			<div class=\"select\">A preset duration</div>\n		</ion-radio>\n	</ion-content>	\n\n	<div class=\"bar bar-footer\">\n		<button class=\"button col\" ui-sref=\"tab.dash\">\n	      Cancel\n	    </button>\n		<span class=\"col\"></span>\n	    <button ng-disabled=\"!vm.newActivity.type\" ng-if=\"vm.newActivity.type !== \'countdown\'\" class=\"button button-positive col\" ut-click=\"vm.addActivity()\">\n	      Add\n	    </button>\n	    <button ng-if=\"vm.newActivity.type === \'countdown\'\" class=\"button button-positive col\" ui-sref=\"add-activity.duration\">\n	      Next\n	    </button>\n	</div>\n</ion-view>\n");
$templateCache.put("charts/charts.html","<ion-view title=\"Charts\">\n  <ion-content class=\"padding custom-content\">\n    <ion-list>\n      <ion-item ng-repeat=\"activity in vm.activities track by $index\" \n        type=\"item-text-wrap\"\n        ng-click=\"vm.showChart(activity.name)\">\n      {{activity.name}}\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("components/countdown.directive.html","<div class=\"item_description\" ng-click=\"vm.logCountdown(activity)\">\n  <div class=\"activity_title\">{{activity.name}} </div>\n  <div class=\"activity_duration\">\n    <div class=\"duration_time\" ng-class=\"{\'duration_time_selected\': activity.interval != undefined}\">\n      {{ activity.remaining | millisecondsToStringFilter | durationPartFilter}}\n    </div>\n    <div class=\"circle icon\" ng-class=\"{\'duration_seconds_selected\': activity.interval != undefined}\">\n      <i class=\"ion-ios-timer-outline\"></i>\n    </div>\n  </div>\n</div>");
$templateCache.put("components/duration.directive.html","<div class=\"item_description\" ng-click=\"vm.logDuration(activity)\">\n  <div class=\"activity_title\">{{activity.name}} </div>\n  <div class=\"activity_duration\">\n    <div class=\"duration_time\" ng-class=\"{\'duration_time_selected\': activity.interval != undefined}\">\n      {{ activity.duration | millisecondsToStringFilter | durationPartFilter}}\n    </div>\n    <div class=\"circle icon\" ng-class=\"{\'duration_seconds_selected\': activity.interval != undefined}\">\n      <i class=\"ion-ios-stopwatch-outline\"></i>\n    </div>\n  </div>\n</div>");
$templateCache.put("components/multi.directive.html","<div class=\"item_description\" ng-click=\"vm.logMulti(activity)\">\n  <div class=\"activity_title\">\n    {{activity.name}}\n  </div>\n  <div class=\"circle right\">\n    #\n  </div>\n</div>");
$templateCache.put("components/single.directive.html","<div class=\"item_description\" ng-click=\"vm.logSingle(activity)\">\n  <div class=\"activity_title\">\n    {{activity.name}}\n  </div>\n  <div class=\"circle right\">\n    1\n  </div>\n</div>");
$templateCache.put("dash/dash-edit.html","<ion-view title=\"Edit Activities\">\n	<ion-content class=\"padding custom-content\">\n		<ion-list show-reorder=\"true\" show-delete=\"true\">\n		  <ion-item type=\"item-text-wrap\" ng-repeat=\"activity in vm.activities track by $index\">\n		    <div class=\"item_description\">\n		      <div class=\"activity_title\">\n		        {{activity.name}}\n		      </div>\n		    </div>\n		    <ion-delete-button class=\"ion-minus-circled\" ng-click=\"vm.removeItem($index)\">\n		    </ion-delete-button>\n		    <ion-reorder-button class=\"ion-ios-drag\" on-reorder=\"vm.moveItem(activity, $fromIndex, $toIndex)\">\n		    </ion-reorder-button>\n		  </ion-item>\n		</ion-list>\n	</ion-content>	\n</ion-view>\n");
$templateCache.put("dash/dash.html","<ion-view title=\"{{vm.appName}}\">\n  <ion-nav-buttons side=\"right\" class=\"settings-icon\">\n    <a class=\"ion-android-more-vertical settings-button\" ng-click=\"vm.clickSettings()\"></a>\n  </ion-nav-buttons>\n  <ion-content class=\"padding custom-content\">\n    <ion-list>\n      <ion-item ng-repeat=\"activity in vm.activities track by $index\" type=\"item-text-wrap\" ng-class=\"{\'selected\': activity.interval != undefined}\">\n\n        <ut-single-activity ng-if=\"activity.type === \'single\'\" activity=\"activity\">\n        </ut-single-activity>\n        <ut-multi-activity ng-if=\"activity.type === \'multi\'\" activity=\"activity\">\n        </ut-multi-activity>\n        <ut-duration-activity ng-if=\"activity.type === \'duration\'\" activity=\"activity\">\n        </ut-duration-activity>\n        <ut-countdown-activity ng-if=\"activity.type === \'countdown\'\" activity=\"activity\">\n        </ut-countdown-activity>\n        \n      </ion-item>\n    </ion-list>\n  </ion-content>\n\n  <md-button class=\"md-fab md-primary add-button\" aria-label=\"Add activitiy\" ui-sref=\"add-activity.name\">\n    <md-icon class=\"plus-icon\" md-svg-src=\"img/plus.svg\"></md-icon>\n  </md-button>\n</ion-view>\n");
$templateCache.put("history/history.html","<ion-view title=\"History\">\n  <ion-content class=\"padding custom-content\">\n	\n  	<div class=\"list\" ng-repeat=\"date in vm.dates\">	\n        <div class=\"item item-divider item-center\">\n          {{ date|humanize }}\n        </div>\n        <a class=\"item\" \n          ng-repeat=\"item in vm.events[date] track by $index\"\n          ng-click=\"vm.showChart(item.event, item.type)\">\n          <div class=\"item_description\" style=\"width: 90%\">\n            <span class=\"activity_title\">{{ item.event }}</span> \n          </div>\n\n          <div class=\"item_controls\" ng-if=\"item.duration\">\n            <span class=\"activity_duration history_duration\" ng-init=\"duration=vm.humanizeTime(item.duration)\">\n              <b ng-show=\"duration.hours\">{{ duration.hours }}h </b>\n              <b ng-show=\"duration.minutes\">{{ duration.minutes }}m </b>\n              <b>{{ duration.seconds }}s </b>\n            </span>\n          </div>\n          <div class=\"item_controls\" ng-if=\"item.amount\">\n            <span class=\"activity_duration history_duration\">\n              <b>{{ item.amount }}</b>\n            </span>\n          </div>\n        </a>\n  	</div>\n\n    <button ng-if=\"vm.isLocal\" class=\"button button-block button-positive\" ng-click=\"vm.clearHistory()\">\n      Clear History\n    </button>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/menu.html","<ion-modal-view style=\"height: 110px; width: 180px\">\n	<ion-content>\n		<div class=\"list\">\n		<a class=\"item\" ng-click=\"vm.editActivities()\">\n			Edit activity list\n		</a>\n		<a class=\"item\" ng-click=\"vm.goTo1Self()\">\n			Go to 1self\n		</a>\n		</div>\n	</ion-content>\n</ion-modal-view>");
$templateCache.put("templates/popup-log-duration.html","<div class=\"row\">\n	<div class=\"col\">Hours:</div>\n	<div class=\"col\">Minutes:</div>\n	<div class=\"col\">Seconds:</div>\n</div>\n<div class=\"row\">\n	<div class=\"col\">\n		<input type=\"tel\" size=\"2\" min=\"0\" \n			pattern=\"[0-9]*\"\n			ut-restrict=\"[0-9]\"\n			ng-model=\"vm.data.duration.hours\"/>\n	</div>\n	<div class=\"col\">\n		<input type=\"tel\" size=\"2\" min=\"0\" max=\"60\" \n			pattern=\"[0-9]*\"\n			ut-restrict=\"[0-9]\"\n			ng-model=\"vm.data.duration.minutes\"/>\n	</div>\n	<div class=\"col\">\n		<input type=\"tel\" size=\"2\" min=\"0\" max=\"60\" \n			pattern=\"[0-9]*\"\n			ut-restrict=\"[0-9]\"\n			ng-model=\"vm.data.duration.seconds\"/>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col\">\n		<input type=\"text\" \n			ng-model=\"vm.note\" \n			ut-restrict=\"[a-zA-Z0-9#]\" \n			placeholder=\"Optional: add a note\">\n		</input>\n	</div>\n</div>\n\n");
$templateCache.put("templates/popup-logmulti.html","<div class=\"row\">\n	<div class=\"col\">\n		<input type=\"number\" ng-model=\"vm.amount\" pattern=\"[0-9]*\"></input>\n	</div>\n</div>\n\n<div class=\"row\">\n	<div class=\"col\">\n		<input type=\"text\" ng-model=\"vm.note\" ut-restrict=\"[a-zA-Z0-9]\" placeholder=\"Optional: add a note\"></input>\n	</div>\n</div>\n");
$templateCache.put("templates/popup-logsingle.html","<input type=\"text\" ng-model=\"vm.note\" \n	ut-restrict=\"[a-zA-Z0-9]\"\n	placeholder=\"Optional: add a note\" \n	maxlength=\"140\">\n</input>");
$templateCache.put("templates/tabs.html","<ion-tabs class=\"tabs-icon-top\">\n  <ion-tab title=\"Home\" icon=\"icon ion-home\" href=\"#/tab/dash\">\n    <ion-nav-view name=\"tab-dash\"></ion-nav-view>\n  </ion-tab>\n  <ion-tab title=\"Charts\" icon=\"icon ion-ios-pulse-strong\" href=\"#/tab/charts\">\n    <ion-nav-view name=\"tab-charts\"></ion-nav-view>\n  </ion-tab>\n  <ion-tab title=\"History\" icon=\"icon ion-clock\" href=\"#/tab/history\">\n    <ion-nav-view name=\"tab-history\"></ion-nav-view>\n  </ion-tab>\n</ion-tabs>");}]);