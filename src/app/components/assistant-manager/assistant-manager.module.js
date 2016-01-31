(function() {
    'use strict';

    var cssAnimationDuration = 300;

    angular
        .module('app.components.assistant-manager', [
            'squad-directives',
            'dialogs'
        ])

        // Register our custom animations
        .animation('.md-compass', MdFabSpeedDialCompassAnimation)
    
        // Register a service for each animation so that we can easily inject them into unit tests
        .service('mdFabSpeedDialCompassAnimation', MdFabSpeedDialCompassAnimation);

    function MdFabSpeedDialCompassAnimation($timeout) {

        // Compass animation class. Note this only works when speed dial is initally down and number of 
        // items is less than or equal to 4

        function delayDone(done) { $timeout(done, cssAnimationDuration, false); }

        function runAnimation(element) {

            // Don't run if we are still waiting and we are not ready
            if (element.hasClass('md-animations-waiting') && !element.hasClass('md-animations-ready')) {
                return;
            }

            var el = element[0];
            var ctrl = element.controller('mdFabSpeedDial');
            var items = el.querySelectorAll('.md-fab-action-item');

            // Grab our trigger element
            var triggerElement = el.querySelector('md-fab-trigger');

            // Grab our element which stores CSS variables
            var variablesElement = el.querySelector('.md-css-variables');

            // Setup JS variables based on our CSS variables
            var startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

            // Always reset the items to their natural position/state
            angular.forEach(items, function(item, index) {
                var styles = item.style;

                styles.transform = styles.webkitTransform = '';
                styles.transitionDelay = '';
                styles.opacity = 1;

                // Make the items closest to the trigger have the highest z-index
                styles.zIndex = (items.length - index) + startZIndex;
            });

            // Set the trigger to be above all of the actions so they disappear behind it.
            triggerElement.style.zIndex = startZIndex + items.length + 1;

            // If the control is closed, hide the items behind the trigger
            if (!ctrl.isOpen) {
                angular.forEach(items, function(item, index) {
                    var newPosition, axis;
                    var styles = item.style;

                    var triggerItemHeightOffset = (triggerElement.clientHeight - item.clientHeight) / 2;
                    var triggerItemWidthOffset = (triggerElement.clientWidth - item.clientWidth) / 2;

                    var newY = -(item.scrollHeight * (index + 1) + triggerItemHeightOffset);
                    var newTranslate = 'translateY(' + newY + 'px)';

                    styles.transform = styles.webkitTransform = newTranslate;
                });
            }
            else {
                angular.forEach(items, function(item, index) {
                    var newPosition, axis;
                    var styles = item.style;

                    var triggerItemHeightOffset = (triggerElement.clientHeight - item.clientHeight) / 2;
                    var triggerItemWidthOffset = (triggerElement.clientWidth - item.clientWidth) / 2;

                    var newY = -(item.scrollHeight * (index + 1) + triggerItemHeightOffset);

                    if (index == 3) {
                        newPosition = (item.scrollHeight + triggerItemHeightOffset) + newY - 10;
                        var newTranslate = 'translateY(' + newPosition + 'px)';
                    }
                    if (index == 2) {
                        newPosition = -(item.scrollHeight + triggerItemHeightOffset) + newY;
                        var newTranslate = 'translateY(' + newPosition + 'px)';
                    }
                    if (index == 0){
                        newPosition = (item.scrollWidth + triggerItemWidthOffset);
                        var newTranslate = 'translate(' + newPosition + 'px,' + newY + 'px)';
                    }
                    if (index == 1){
                        newPosition = -(item.scrollWidth + triggerItemWidthOffset);
                        var newTranslate = 'translate(' + newPosition + 'px,' +newY + 'px)';
                    }

                    styles.transform = styles.webkitTransform = newTranslate;
                });
            }

        }

        return {
            addClass: function(element, className, done) {
                if (element.hasClass('md-compass')) {
                    runAnimation(element);
                    delayDone(done);
                } else {
                    done();
                }
            },
            removeClass: function(element, className, done) {
                runAnimation(element);
                delayDone(done);
            }
        };
    }


})();