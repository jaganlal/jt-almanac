/**
 * ngAlmanac
 *
 * @author Jaganlal Thoppe <jaganlal@gmail.com>
 * @version 0.1
 * @date 02/26/2015
 *
 *
 */


(function (window, angular, undefined) {

'use strict';

angular.module('jtAlmanacApp')
  .directive('calendarItems', function() {
    function link(scope, element, attrs) {
      scope.almanacAttributes.itemContainer = element.children()[0];
      scope.almanacAttributes.dayCells = element.children()[0].children;
    };
    return {
      link: link, 
      restrict: 'E'
    };
  })

  .directive('ngAlmanac', [
    '$compile', 
    '$timeout', 
    '$window', 
    '$document', 

    function ($compile, $timeout, $window, $document) {
    
    return {
      scope: {
        bookedDates: "=bookedDates", 
      }, //end of isolate scope 

      controller: ['$scope', function($scope) {
        $scope.almanacAttributes = {
          days: [{day: 'SU'}, {day:'MO'}, {day:'TU'}, {day:'WE'}, {day:'TH'}, {day:'FR'}, {day:'SA'}], 
          dates: [], 
          datestoshow: [],
          datesIndex: 0, 
          monthToShow: 'MONTH YEAR', 
          itemContainer: null, 
          dayCells: null
        };
      }],  //controller

      template: 
                '<div class="leftarrow" ng-click="prevmonth()"> '+
                  '<img src="images/left_arrow.png" /> '+
                '</div> ' +
                
                '<div class="rightarrow" ng-click="nextmonth()" > '+
                  '<img src="images/right_arrow.png" /> '+
                '</div> ' +

                '<h4 class="datetoshow"> '+
                  '{{almanacAttributes.monthToShow | uppercase}} '+
                '</h4> '+
                
                '<ul class="days-container">'+
                  '<li '+
                      'ng-repeat="day in almanacAttributes.days"> '+
                      '{{day.day}}'+
                    '</li>'+
                '</ul>' +
                
                '<calendar-items> '+
                  '<ul class="days-container day">'+
                    '<li class="day-cell" '+
                        'ng-repeat="date in almanacAttributes.datestoshow"> '+
                        '<span class="cell-data" style="visibility:hidden;"> '+
                        '</span>'+
                        '{{date.day}}'+
                      '</li>'+
                  '</ul> '+ 
                '</calendar-items>', 

      restrict: 'AE',

      link: function postLink(scope, element, attrs) {
        var numberOfpreviousDays = [];
        var numberOfMonthsToShow = 12;

        var currentMonth =  0;
        var currentDate = null;

        var previousMonthsDaysIndex = [];
        var nextMonthsDaysIndex = [];

        var highlightedBookedDays = [];

        var todayIndex = -1;

        $document.on('keydown', function (e) {
          if(e.keyCode === 37) {
            scope.prevmonth();
          }
          else if(e.keyCode === 39) {
            scope.nextmonth();
          }
        });

        var clearCurrentMonthsData = function() {
          scope.almanacAttributes.datestoshow.splice(0, scope.almanacAttributes.datestoshow.length);
          previousMonthsDaysIndex.splice(0, previousMonthsDaysIndex.length);
          nextMonthsDaysIndex.splice(0, nextMonthsDaysIndex.length);
          highlightedBookedDays.splice(0, highlightedBookedDays.length);
          todayIndex = -1;
        }

        var disableNonmonthDates = function() {
          for(var i in previousMonthsDaysIndex) {
            // scope.almanacAttributes.dayCells[previousMonthsDaysIndex[i]].style.backgroundColor = '#DDD';
            scope.almanacAttributes.dayCells[previousMonthsDaysIndex[i]].style.color = '#DDD';
          }

          for(var i in nextMonthsDaysIndex) {
            scope.almanacAttributes.dayCells[nextMonthsDaysIndex[i]].style.color = '#DDD';
          }
        }

        var styleBookedDates = function() {
          for(var i in highlightedBookedDays) {
            scope.almanacAttributes.dayCells[highlightedBookedDays[i]].style.color = 'brown';
            scope.almanacAttributes.dayCells[highlightedBookedDays[i]].children[0].style.visibility = 'visible';
          }
        }

        var styleToday = function() {
          scope.almanacAttributes.dayCells[todayIndex].style.backgroundColor = 'yellow';
          scope.almanacAttributes.dayCells[todayIndex].style.textDecoration = 'underline';
          scope.almanacAttributes.dayCells[todayIndex].style.fontWeight = 'bold';
          scope.almanacAttributes.dayCells[todayIndex].style.color = 'dodgerblue';
        }

        scope.showMonth = function() {
          if(currentDate === null) {
            currentDate = moment();
          }

          var today = moment().startOf('day');
          
          currentMonth = currentDate.get('month');
          scope.almanacAttributes.monthToShow = currentDate.format('MMMM YYYY');

          var thisMonth = moment(currentDate);
          thisMonth = thisMonth.startOf('month');
          var tempMonth = null;

          var i = 0;
          var j = 0;
          var count = 0;
          var daysInWeek = 7;
          var numberOfRows = 6;
          var day = 0;

          var previousDays = thisMonth.day();
          if(previousDays) { //this month must show some if previous month's days
            thisMonth.add(-previousDays, 'days');
          }

          /**
          * This loop is a hack to overcome css column-count behaviour. 
          * When column-count is specified inside <li>, the order of list 
          * is vertical. 
          * Here i manipulate the order in which array is populated
          */

          for(i=0; i<daysInWeek; i++) { 
            count = 0;
            tempMonth = thisMonth.clone();

            while(count < numberOfRows) {

              if( tempMonth.isBefore(currentDate, 'month') ) {
                previousMonthsDaysIndex.push(scope.almanacAttributes.datestoshow.length);
              }
              else if( tempMonth.isAfter(currentDate, 'month') ) {
                nextMonthsDaysIndex.push(scope.almanacAttributes.datestoshow.length);
              }
              
              if( tempMonth.isSame(today) ) {
                todayIndex = scope.almanacAttributes.datestoshow.length;
              }

              for(var z in scope.bookedDates) {
                if( tempMonth.isSame(scope.bookedDates[z].day) ) {
                  highlightedBookedDays.push(scope.almanacAttributes.datestoshow.length);
                  break;
                }
              }

              scope.almanacAttributes.datestoshow.push({day: tempMonth.date()});

              tempMonth = tempMonth.add(daysInWeek, 'days');
              count++;
            } //while loop

            thisMonth = thisMonth.add(1, 'days');
          } //for loop

          $timeout(function() {
            disableNonmonthDates();
            styleBookedDates();
            styleToday();
          }, 1);
        } //showMonth

        scope.prevmonth = function() {
          currentDate = currentDate.add(-1, 'months');
          clearCurrentMonthsData();

          $timeout(function() {
            scope.showMonth();
          }, 1);
        }; //prevmonth

        scope.nextmonth = function() {
          currentDate = currentDate.add(1, 'months');
          clearCurrentMonthsData();
          
          $timeout(function() {
            scope.showMonth();
          }, 1);
        }; //nextmonth

        scope.showMonth();

      }, //postLink function
    
    }; //return
  } //directive function 
]); //directive

})(window, window.angular);