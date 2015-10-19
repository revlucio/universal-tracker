angular.module("tracker").run(["$templateCache", function($templateCache) {$templateCache.put("templates/popup-add.html","<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'single\'\">\n	<div class=\"circle-select\">1</div>\n	<div class=\"select\">A single occurrence</div>\n</ion-radio>\n<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'multi\'\">\n	<div class=\"circle-select\">#</div>\n	<div class=\"select\">Multiple occurrences</div>\n</ion-radio>\n<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'duration\'\">\n	<div class=\"circle-select icon-select\"><i class=\"ion-ios-stopwatch-outline\"></i></div>\n	<div class=\"select\">A timed duration</div>\n</ion-radio>\n<ion-radio ng-model=\"vm.newActivity.type\" ng-value=\"\'countdown\'\">\n	<div class=\"circle-select icon-select\"><i class=\"ion-ios-timer-outline\"></i></div>\n	<div class=\"select\">A preset duration</div>\n</ion-radio>");
$templateCache.put("templates/popup-log-duration.html","<div>Hours : Minutes : Seconds</div>\n<div>\n	<input type=\"number\" size=\"2\" min=\"0\" ng-model=\"vm.data.duration.hours\"/>\n	<input type=\"number\" size=\"2\" min=\"0\" max=\"60\" ng-model=\"vm.data.duration.minutes\"/>\n	<input type=\"number\" size=\"2\" min=\"0\" max=\"60\" ng-model=\"vm.data.duration.seconds\"/>\n</div>");
$templateCache.put("templates/popup-logmulti.html","<input type=\"number\" ng-model=\"vm.amount\"></input>");
$templateCache.put("templates/popup-name.html","<input type=\"text\" ng-model=\"vm.newActivity.name\"></input>\n\n<ion-radio ng-repeat=\"activityType in vm.activityTypes\" ng-model=\"vm.newActivity.name\" \nng-value=\"activityType\">\n	{{activityType}}\n</ion-radio>");
$templateCache.put("templates/tab-charts.html","<ion-view title=\"CHARTS\">\n  <ion-content class=\"padding custom-content\">\n    \n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-dash-edit.html","<ion-view title=\"Preferences\">\n	<ion-nav-button side=\"left\">\n	<ion-nav-back-button class=\"ion-ios-arrow-back\" style=\"\">\n	      </ion-nav-back-button>\n	</ion-nav-button>\n\n	<ion-content class=\"padding custom-content\">\n		<ion-list show-reorder=\"true\" show-delete=\"true\">\n		  <ion-item type=\"item-text-wrap\" ng-repeat=\"activity in vm.activities track by $index\">\n		    <div class=\"item_description\">\n		      <div class=\"activity_title\">\n		        {{activity.name}}\n		      </div>\n		    </div>\n		    <ion-delete-button class=\"ion-minus-circled\" ng-click=\"vm.removeItem($index)\">\n		    </ion-delete-button>\n		    <ion-reorder-button class=\"ion-ios-drag\" on-reorder=\"vm.moveItem(activity, $fromIndex, $toIndex)\">\n		    </ion-reorder-button>\n		  </ion-item>\n		</ion-list>\n	</ion-content>	\n</ion-view>\n");
$templateCache.put("templates/tab-dash.html","<ion-view title=\"UNIVERSAL TRACKER\">\n  <ion-nav-buttons side=\"right\" class=\"settings-icon\">\n    <a class=\"button button-positive ion-gear-a bar-main\" href=\"#/tab/dash/edit\"></a>\n  </ion-nav-buttons>\n  <ion-content class=\"padding custom-content\">\n    <ion-list>\n      <ion-item ng-repeat=\"activity in vm.activities track by $index\" type=\"item-text-wrap\" ng-class=\"{\'selected\': activity.interval != undefined}\">\n        <!-- single activity -->\n        <div ng-if=\"activity.type === \'single\'\" class=\"item_description\" ng-click=\"vm.logSingle(activity)\">\n          <div class=\"activity_title\">\n            {{activity.name}}\n          </div>\n          <div class=\"circle right\">\n            1\n          </div>\n        </div>\n\n        <!-- multi activity -->\n        <div ng-if=\"activity.type === \'multi\'\" class=\"item_description\" ng-click=\"vm.logMulti(activity)\">\n          <div class=\"activity_title\">\n            {{activity.name}}\n          </div>\n          <div class=\"circle right\">\n            #\n          </div>\n        </div>\n\n        <!-- duration activity -->\n        <div ng-if=\"activity.type === \'duration\'\" class=\"item_description\" ng-click=\"vm.logDuration(activity)\">\n          <div class=\"activity_title\">{{activity.name}} </div>\n          <div class=\"activity_duration\">\n            <div class=\"duration_time\" ng-class=\"{\'duration_time_selected\': activity.interval != undefined}\">\n              {{ activity.duration | millisecondsToStringFilter | durationPartFilter}}\n            </div>\n            <div class=\"circle icon\" ng-class=\"{\'duration_seconds_selected\': activity.interval != undefined}\">\n              <i class=\"ion-ios-stopwatch-outline\"></i>\n            </div>\n          </div>\n        </div>\n\n        <!-- timer activity -->\n        <div ng-if=\"activity.type === \'countdown\'\" class=\"item_description\" ng-click=\"vm.logCountdown(activity)\">\n          <div class=\"activity_title\">{{activity.name}} </div>\n          <div class=\"activity_duration\">\n            <div class=\"duration_time\" ng-class=\"{\'duration_time_selected\': activity.interval != undefined}\">\n              {{ activity.remaining | millisecondsToStringFilter | durationPartFilter}}\n            </div>\n            <div class=\"circle icon\" ng-class=\"{\'duration_seconds_selected\': activity.interval != undefined}\">\n              <i class=\"ion-ios-timer-outline\"></i>\n            </div>\n          </div>\n        </div>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n\n  <md-button class=\"md-fab md-primary add-button\" aria-label=\"Add activitiy\" ng-click=\"vm.addActivity()\">\n    <i class=\"ion-plus\"></i>\n  </md-button>\n</ion-view>\n");
$templateCache.put("templates/tab-history.html","<ion-view title=\"HISTORY\">\n  <ion-content class=\"padding custom-content\">\n	\n  	<div class=\"list\" ng-repeat=\"date in vm.dates\">	\n        <div class=\"item item-divider item-center\">\n          {{ date|humanize }}\n        </div>\n        <a class=\"item\" ng-repeat=\"item in vm.events[date] track by $index\">\n          <div class=\"item_description\" style=\"width: 90%\">\n            <span class=\"activity_title\">{{ item.event }}</span> \n          </div>\n\n          <div class=\"item_controls\" ng-if=\"item.duration\">\n            <span class=\"activity_duration history_duration\" ng-init=\"duration=vm.humanizeTime(item.duration)\">\n              <b ng-show=\"duration.hours\">{{ duration.hours }}h </b>\n              <b ng-show=\"duration.minutes\">{{ duration.minutes }}m </b>\n              <b>{{ duration.seconds }}s </b>\n            </span>\n          </div>\n          <div class=\"item_controls\" ng-if=\"item.amount\">\n            <span class=\"activity_duration history_duration\">\n              <b>{{ item.amount }}</b>\n            </span>\n          </div>\n        </a>\n  	</div>\n\n    <button class=\"button button-block button-positive\" ng-click=\"vm.clearHistory()\">\n      Clear History\n    </button>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tabs.html","<ion-tabs class=\"tabs-icon-top\">\n  <!-- Dashboard Tab -->\n  <ion-tab title=\"Home\" icon=\"icon ion-home\" href=\"#/tab/dash\">\n    <ion-nav-view name=\"tab-dash\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Charts Tab -->\n  <ion-tab title=\"Charts\" icon=\"icon ion-ios-pulse-strong\" href=\"#/tab/charts\">\n    <ion-nav-view name=\"tab-charts\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- History Tab -->\n  <ion-tab title=\"History\" icon=\"icon ion-clock\" href=\"#/tab/history\">\n    <ion-nav-view name=\"tab-history\"></ion-nav-view>\n  </ion-tab>\n\n</ion-tabs>\n");}]);