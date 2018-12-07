angular.module('CustomerReviews.Web')
    .controller('CustomerReviews.Web.customerReviewRatingWidgetController', ['$scope', 'CustomerReviews.WebApi', 'platformWebApp.bladeNavigationService', function ($scope, reviewsApi, bladeNavigationService) {
        var blade = $scope.blade;
        var filter = { take: 5 };

        function refresh() {
            $scope.loading = true;
            reviewsApi.search(filter, function (data) {
                $scope.loading = false;
                $scope.rating = data.totalCount !== 0 ? data.results.reduce((c, p) => c + p, 0) / data.totalCount : 'N/A';
            });
        }

        $scope.openBlade = function () {
            if ($scope.loading || !$scope.totalCount)
                return;

            var newBlade = {
                id: "reviewsList",
                filter: filter,
                title: 'Customer reviews for "' + blade.title + '"',
                controller: 'CustomerReviews.Web.reviewsListController',
                template: 'Modules/$(CustomerReviews.Web)/Scripts/blades/reviews-list.tpl.html'
            };
            bladeNavigationService.showBlade(newBlade, blade);
        };

        $scope.$watch("blade.itemId", function (id) {
            filter.productIds = [id];

            if (id) refresh();
        });
    }]);
