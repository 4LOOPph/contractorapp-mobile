(function () {
  'use strict';

  angular.module('starter')
    .directive('errSrc', function () {
      return {
        link: function (scope, element, attrs) {
          scope.$watch(function () {
            return attrs['ngSrc'];
          }, function (value) {
            if (!value) {
              element.attr('src', attrs.errSrc);
            }
          });

          element.bind('error', function () {
            element.attr('src', attrs.errSrc);
          });
        }
      };
    })
    .directive('validNumber', function () {
      return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
          if (!ngModelCtrl) {
            return;
          }

          ngModelCtrl.$parsers.push(function (val) {
            if (angular.isUndefined(val)) {
              var val = '';
            }

            var clean = val.replace(/[^-0-9\.]/g, '');
            var negativeCheck = clean.split('-');
            var decimalCheck = clean.split('.');
            if (!angular.isUndefined(negativeCheck[1])) {
              negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
              clean = negativeCheck[0] + '-' + negativeCheck[1];
              if (negativeCheck[0].length > 0) {
                clean = negativeCheck[0];
              }

            }

            if (!angular.isUndefined(decimalCheck[1])) {
              decimalCheck[1] = decimalCheck[1].slice(0, 2);
              clean = decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function (event) {
            if (event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    })
    .directive('ionFloatingButton', function () {

      return {
        restrict: 'E',
        scope: {
          click: '&?',
          buttonColor: '@?',
          buttonClass: '@?',
          icon: '@?',
          iconColor: '@?',
          hasFooter: '=?'
        },
        template: '<ul id="floating-button" ng-style="{\'bottom\' : \'{{bottomValue}}\' }">' +
        '<li ng-class="buttonClass" ng-style="{\'background-color\': buttonColor }">' +
        '<a ng-click="click()"><i class="icon menu-icon" ng-class="{ \'{{icon}}\' : true}" ng-style="{\'color\': iconColor }"></i></a>' +
        '</li>' +
        '</ul>',
        replace: true,
        transclude: true,
        controller: ['$scope', function ($scope) {
          $scope.buttonColor = $scope.buttonColor || '#2AC9AA';
          $scope.icon = $scope.icon || 'ion-plus';
          $scope.iconColor = $scope.iconColor || '#fff';
          $scope.hasFooter = $scope.hasFooter || false;
          if ($scope.hasFooter) {
            $scope.bottomValue = '60px';
          } else {
            $scope.bottomValue = '20px';
          }
        }]
      };
    })
    .directive('ionFloatingMenu', function () {

      return {
        restrict: 'E',
        scope: {
          menuOpenColor: '@?',
          menuOpenIcon: '@?',
          menuOpenIconColor: '@?',
          menuColor: '@?',
          menuIcon: '@?',
          menuIconColor: '@?',
          hasFooter: '=?'
        },
        template: '<ul id="floating-menu"  \n\
                            ng-style="{\'bottom\' : \'{{bottomValue}}\'}" \n\
                            ng-class="{\'active\' : isOpen}" \n\
                            ng-click="open()">' +
        '<div ng-transclude></div>' +
        '<span><li class="menu-button icon menu-icon" ng-class="icon" ng-style="{\'background-color\' : buttonColor, \'color\': iconColor}"></li></span>' +
        '</ul>',
        replace: true,
        transclude: true,
        link: function (scope, element, attrs, ctrl, transclude) {
          element.find('div').replaceWith(transclude());
        },
        controller: ['$scope', function ($scope) {
          $scope.isOpen = false;
          $scope.open = function () {
            $scope.isOpen = !$scope.isOpen;
            if ($scope.isOpen) {
              $scope.setOpen();
            } else {
              $scope.setClose();
            }
          };
          $scope.setOpen = function () {
            $scope.buttonColor = menuOpenColor;
            $scope.icon = menuOpenIcon;
            $scope.iconColor = menuOpenIconColor;
          };
          $scope.setClose = function () {
            $scope.buttonColor = menuColor;
            $scope.icon = menuIcon;
            $scope.iconColor = menuIconColor;
          };
          var menuColor = $scope.menuColor || '#2AC9AA';
          var menuIcon = $scope.menuIcon || 'ion-plus';
          var menuIconColor = $scope.menuIconColor || '#fff';
          var menuOpenColor = $scope.menuOpenColor || '#2AC9AA';
          var menuOpenIcon = $scope.menuOpenIcon || 'ion-minus';
          var menuOpenIconColor = $scope.menuOpenIconColor || '#fff';
          $scope.setClose();
          //Has a footer
          $scope.hasFooter = $scope.hasFooter || false;
          if ($scope.hasFooter) {
            $scope.bottomValue = '60px';
          } else {
            $scope.bottomValue = '20px';
          }
        }]
      };
    })
    .directive('ionFloatingItem', function () {

      return {
        restrict: 'E',
        require: ['^ionFloatingMenu'],
        scope: {
          click: '&?',
          icon: '@',
          buttonColor: '@?',
          buttonClass: '@?',
          iconColor: '@?',
          text: '@?',
          textClass: '@?'
        },
        template: '<li ng-click="click()" ng-class="buttonClass" ng-style="{\'background-color\': buttonColor }">' +
        '<span ng-if="text" class="label-container"><span class="label" ng-class="textClass" ng-bind="text"></span></span><i class="icon menu-icon" ng-class="{ \'{{icon}}\' : true}" ng-style="{\'color\': iconColor }"></i>' +
        '</li>',
        replace: true,
        controller: ['$scope', function ($scope) {
          $scope.buttonColor = $scope.buttonColor || '#2AC9AA';
          $scope.iconColor = $scope.iconColor || '#fff';
        }]
      };
    })
    .directive('ionProfilePicture', [
      '$ionicTemplateLoader',
      '$ionicBackdrop',
      '$q',
      '$timeout',
      '$rootScope',
      '$document',
      function ($ionicTemplateLoader, $ionicBackdrop, $q, $timeout, $rootScope, $document) {
        return {
          require: '?ngModel',
          restrict: 'E',
          template: '<div class="ion-profile-picture no-picture"><input type="file" accept="image/*" capture /></div>',
          replace: true,
          link: function (scope, element, attrs, ngModel) {
            var $input = angular.element(element.find('input'));
            var file = undefined;

            if (!ngModel) {
              console.error('ion-profile-picture:', 'Need to set ng-model');
              return false;
            }

            // all this guy does is trigger a click event on the hidden file input
            var openFileDialog = function (e) {
              $input[0].click();
            };

            // every time the file gets updated, this guy does it's thing
            var onFilePick = function (e) {
              var reader = new FileReader();

              reader.onload = function (_e) {
                scope.$apply(function () {
                  ngModel.$setViewValue(_e.target.result);
                  ngModel.$render();
                })
              };

              file = e.target.files[0];

              if (file) {
                // we read the data from our selected image to get the Base64
                // and use it as our element background
                reader.readAsDataURL(file);
              }
            };

            ngModel.$formatters.unshift(function (modelValue) {
              if (!modelValue) return '';
              return modelValue;
            });

            ngModel.$parsers.unshift(function (viewValue) {
              return viewValue;
            });

            ngModel.$render = function () {
              var value = ngModel.$viewValue;

              if (!value) {
                element.css({
                  'background-image': 'none'
                });
                element.addClass('no-picture');
              } else {
                // if our value is just a plain Base64 string, we will try
                // to be helpful and prepend the right stuff to it
                if (!value.match(/^data:.*?;base64,/i)) {
                  value = 'data:image/jpg;base64,' + value;
                }

                element.css({
                  'background-image': 'url(' + value + ')'
                });
                element.removeClass('no-picture');
              }
            };

            element.on('click', openFileDialog);
            $input.on('change', onFilePick);
          }
        };
      }
    ])
    .directive('onValidSubmit', ['$parse', '$timeout', function ($parse, $timeout) {
      return {
        require: '^form',
        restrict: 'A',
        link: function (scope, element, attrs, form) {
          form.$submitted = false;
          var fn = $parse(attrs.onValidSubmit);
          element.on('submit', function (event) {
            scope.$apply(function () {
              element.addClass('ng-submitted');
              form.$submitted = true;
              if (form.$valid) {
                if (typeof fn === 'function') {
                  fn(scope, {$event: event});
                }
              }
            });
          });
        }
      }

    }])
    .directive('validated', ['$parse','ionicToast', function ($parse,ionicToast) {
      return {
        restrict: 'AEC',
        require: '^form',
        link: function (scope, element, attrs, form) {
          var inputs = element.find("*");
          var invalidinputs = 0;
          for (var i = 0; i < inputs.length; i++) {
            (function (input) {
              var attributes = input.attributes;
              if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
                var field = form[attributes.name.value];
                if (field != void 0) {
                  scope.$watch(function () {
                    return form.$submitted + "_" + field.$valid;
                  }, function () {
                    if (form.$submitted != true) return;
                    var inp = angular.element(input);
                    if (inp.hasClass('ng-invalid')) {
                      element.removeClass('has-success');
                      element.addClass('has-error');
                      invalidinputs++;
                      if(invalidinputs > 0){
                        ionicToast.show('Field are required!', 'top', true, 2500);
                      }
                    } else {
                      element.removeClass('has-error').addClass('has-success');
                    }
                  });
                }
              }
            })(inputs[i]);
          }
        }
      }
    }]);


})();
