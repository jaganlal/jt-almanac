'use strict';

angular.module('jtAlmanacApp')
  .controller('MainCtrl', function ($scope) {
    $scope.bookedDays = [
      {day: moment('02/04/2015', 'MM-DD-YYYY')}, 
      {day: moment('02/26/2015', 'MM-DD-YYYY')}, 
      {day: moment('02/20/2015', 'MM-DD-YYYY')}, 
      {day: moment('02/28/2015', 'MM-DD-YYYY')}, 

      {day: moment('03/14/2015', 'MM-DD-YYYY')}, 
      {day: moment('03/06/2015', 'MM-DD-YYYY')}, 
      {day: moment('03/2/2015', 'MM-DD-YYYY')}, 
      {day: moment('03/30/2015', 'MM-DD-YYYY')}, 

      {day: moment('05/01/2015', 'MM-DD-YYYY')}, 
      {day: moment('05/19/2015', 'MM-DD-YYYY')}, 
      {day: moment('05/07/2015', 'MM-DD-YYYY')}, 
      {day: moment('05/09/2015', 'MM-DD-YYYY')}
    ];
  });
