# jt-almanac
Angular directive to show full screen `responsive` calendar


A lightweight, extensible directive for showing full screen calendar. Check out in action - http://codepen.io/jaganlal/full/dPKvag

<p data-height="268" data-theme-id="12663" data-slug-hash="dPKvag" data-default-tab="result" data-user="jaganlal" class='codepen'>See the Pen <a href='http://codepen.io/jaganlal/pen/dPKvag/'>jt-almanac</a> by Jaganlal (<a href='http://codepen.io/jaganlal'>@jaganlal</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

##Settings
####Usage
```html
	<ng-almanac 
		booked-dates="bookedDays" >
	</ng-almanac>
```


To add data to the calendar, just throw in `booked-dates` attributes, something like this
```javascript
$scope.bookedDays = [
      {day: moment('02/04/2015', 'MM-DD-YYYY')}, 
      {day: moment('02/26/2015', 'MM-DD-YYYY')}, 
      {day: moment('02/20/2015', 'MM-DD-YYYY')}];
```

If any of the above dates are matching, you'll find a `green band` running over that cell.

Today's date will highlight the background cell with the following styles

```css
	style.backgroundColor = 'yellow';
	style.textDecoration = 'underline';
	style.fontWeight = 'bold';
	style.color = 'dodgerblue';
```

####Prerequisite
* Need `npm` & `bower` 
* Run `npm install`
* Run `bower install`


####Required
* `ngAlmanac` - The directive


####Optional
* `booked-dates` - to highlight any dates