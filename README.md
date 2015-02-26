# jt-almanac
Angular directive to show full screen calendar


A lightweight, extensible directive for showing full screen calendar


##Settings
####Usage
```html
	<ng-almanac 
		booked-dates="bookedDays" >
	</ng-almanac>
```

```javascript
$scope.bookedDays = [
      {day: moment('02/04/2015', 'MM-DD-YYYY')}, 
      {day: moment('02/26/2015', 'MM-DD-YYYY')}, 
      {day: moment('02/20/2015', 'MM-DD-YYYY')}];
```

####Required
* `ngAlmanac` - The directive


####Optional
* `booked-dates` - to highlight any dates