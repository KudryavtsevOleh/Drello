'use strict';

(function(){
    angular
        .module('drello.pnotify', [])
        .service('notificationService', Notify);

    function Notify() {

        let settings = {
            styling: 'bootstrap3',
            buttons: {
                sticker: false
            }
        };

        let stacks = {};
        let defaultStack = false;
        let self = this;

        let initHash = function(stackName) {
            let hash = angular.copy(settings);
            if ((stackName || (stackName = defaultStack)) && stackName in stacks) {
                hash.stack = stacks[stackName].stack;
                if (stacks[stackName].addclass) {
                    hash.addclass = 'addclass' in hash
                        ? hash.addclass + ' ' + stacks[stackName].addclass
                        : stacks[stackName].addclass;
                }
            }
            return hash;
        };

        self.setDefaults = function(defaults) {
            settings = defaults;
            return self;
        };

        self.setStack = function (name, addclass, stack) {
            if (angular.isObject(addclass)) {
                stack = addclass;
                addclass = false;
            }

            stacks[name] = {
                stack: stack,
                addclass: addclass
            };
            return self;
        };

        self.setDefaultStack = function (name) {
            defaultStack = name;
            return self;
        };

        /* ========== SETTINGS RELATED METHODS =============*/

        self.getSettings = function () {
            return settings;
        };

        /* ============== NOTIFICATION METHODS ==============*/

        self.notice = function (content, stack) {
            let hash = initHash(stack);
            hash.type = 'notice';
            hash.text = content;
            return self.notify(hash);
        };

        self.warning = function (content, stack) {
            let hash = initHash(stack);
            hash.type = 'notice';
            hash.text = content;
            hash.addClass = "notification-warning";
            hash.icon = "glyphicon glyphicon-warning-sign";
            hash.delay = 2000;
            return self.notify(hash);
        };

        self.info = function (content, stack) {
            let hash = initHash(stack);
            hash.type = 'info';
            hash.text = content;
            hash.nonblock = {
                nonblock: true
            };
            return self.notify(hash);
        };

        self.success = function (content, stack, nonblock) {
            let hash = initHash(stack);
            hash.type = 'success';
            hash.text = content;
            hash.nonblock = nonblock;
            return self.notify(hash);
        };

        self.error = function (content, stack) {
            let hash = initHash(stack);
            hash.type = 'error';
            hash.text = content;
            hash.icon = "glyphicon glyphicon-exclamation-sign";
            hash.delay = 2000;
            return self.notify(hash);
        };

        self.notifyWithDefaults = function (options, stack) {
            let defaults = initHash(stack);
            let combined = angular.extend(defaults, options);
            return self.notify(combined);
        };

        self.notify = function (hash) {
            return new PNotify(hash);
        };

        self.removeNotifications = function () {
            return PNotify.removeAll();
        }
    }

})();
