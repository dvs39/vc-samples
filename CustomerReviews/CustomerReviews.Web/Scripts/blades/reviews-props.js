angular.module('CustomerReviews.Web')
    .controller('CustomerReviews.Web.reviewsPropsController', ['$scope', 'CustomerReviews.WebApi', 'platformWebApp.bladeUtils', 'uiGridConstants', 'platformWebApp.uiGridHelper',
        function ($scope, reviewsApi, bladeUtils, uiGridConstants, uiGridHelper) {

            var blade = $scope.blade;
            var bladeNavigationService = bladeUtils.bladeNavigationService;

            blade.updatePermission = 'customerReview:update';

            // public

            blade.refresh = function (parentUpdate) {
                blade.isLoading = true;

                blade.origEntity = angular.copy(blade.currentEntity);
                //return reviewsApi.search({})

                if (parentUpdate)
                    blade.parentBlade.refresh();

                blade.isLoading = false;
            }


            blade.onClose = function (closeCallback) {
                bladeNavigationService.showConfirmationIfNeeded(isDirty(), canSave(), blade, saveChanges, closeCallback, "customerReviews.dialogs.item-save.title", "customerReviews.dialogs.item-save.message");
            };

            // private

            function initializeBlade(data) {
                blade.currentEntity = angular.copy(data);
                blade.origEntity = data;
                blade.title = data.authorNickname;
                blade.isLoading = false;
                blade.securityScopes = data.securityScopes;
            };

            function isDirty() {
                return !angular.equals(blade.currentEntity, blade.origEntity) && blade.hasUpdatePermission();
            };

            function canSave() {
                return isDirty() && blade.formScope && blade.formScope.$valid;
            }

            function saveChanges() {
                blade.isLoading = true;

                reviewsApi.update([blade.currentEntity],
                    function () { blade.refresh(true); },
                    function (error) { bladeNavigationService.setError('Error ' + error.status, blade); }
                );

            };


            // fields

            blade.formScope = null;
            $scope.setForm = function (form) { blade.formScope = form; }

            blade.toolbarCommands = [
                {
                    name: "platform.commands.save", icon: 'fa fa-save',
                    executeMethod: saveChanges,
                    canExecuteMethod: canSave,
                    permission: blade.updatePermission
                },
                {
                    name: "platform.commands.reset", icon: 'fa fa-undo',
                    executeMethod: function () {
                        angular.copy(blade.origEntity, blade.currentEntity);
                    },
                    canExecuteMethod: isDirty,
                    permission: blade.updatePermission
                }
            ];

            initializeBlade(blade.currentEntity);
        }
    ]);