![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

## Objectives
- Using `this` to refer to object properties from within a method.
- Use `this` to create a constructor function.

## Prerequisites
- Creating object literals.


## `this`
### Self-Referential Objects

As you might have gathered from the last lab, one way to break up the complexity of a problem is by using multiple kinds of objects together, and having each object be responsible for representing a small part of the problem. But these objects don't need to exist in isolation - objects can have other objects (or even collections of other objects) as properties.

Suppose that we wanted to create a simple app ('RunTracker') that helps people prepare for running a 5k. Each day that a person runs, they create a record of their run which contains
- the date and time of the run
- the distance covered, in meters
- the time taken, in seconds

The app also stores information about the user - the user's name and email address. And it can perform some calculations - total distance run, longest run so far, average speed, and total distance run.

Based on this problem, the kinds of abstractions that we probably want to use are Users and Runs. Why? Because each one represents a 'thing' that we can interact with, complete with attributes and behaviors. And based on how we've constructed this problem, we will presumably want our User to have an array of RunRecords that represent that user's runs.

```javascript

// 'user'
{
  name: "Person McFace",
  email: "wdi@personmcface.com",
  runs : [
    {
      date: "2015-05-25 15:00",
      distance: "1200",
      timeTaken: "600",
    }
  ],
  totalDistance : function(){ ... },
  longestRun : function(){ ... },
  averageSpeed : function(){ ... }
}

```

However, when we start thinking about how the methods for 'User' will work, we run into a difficulty. A method for calculating the longest run so far needs to be able to see, and refer to, all of the Runs associated with that particular User. How do we do that?

JavaScript gives us a tool for just this purpose; a special reference called `this`. In general, when called from inside some object's method, `this` refers back to that object, allowing our methods to use and manipulate other properties on the object.

> `this` acts differently when it's _not_ used inside an object, but we won't be discussing that right now.

In the specific case of our 'RunTracker' app, here's how our methods might look:

```javascript
  ...
    totalDistance : function(){
      var totalDist = 0;
      for (var i = 0; i < this.runs.length; ++i) {
        totalDist += this.runs[i].distance;
      }
      return totalDist;
    },
    longestRun : function() {
      var longest = this.runs[0].distance;
      for (var i = 0; i < this.runs.length; ++i) {
        if (this.runRecords[i].distance > longest) {
          longest = this.runs[i].distance;
        }
      }
      return longest;
    },
    averageSpeed : function() {
      var totalTime = 0;
      for (var i = 0; i < this.runs.length; ++i) {
        totalTime += this.runs[i].timeTaken;
      }
      if (totalTime !== 0) {
        var totalDistance = this.totalDistance();
        return totalDistance / totalTime;
      } else {
        return 0;
      }
    }
  ...
```

#### Lab :: Self-Referential Objects

Open up the `lib/meals.js` file. In pairs, you're going to work a similar app to the one mentioned in the example - this time for meal tracking. In particular, you're going to create an example 'User' object, complete with several 'Meals'.

A 'User' needs to have:
- a name (`name`)
- an age (`age`)
- a target daily calorie intake (`calorieTarget`)
- a list of 'Meals' that they've eaten (`meals`)

Every 'Meal' must have:
- a title (`title`), e.g. 'breakfast', 'lunch', 'dinner')
- a date (`date`), represented as a string e.g. "2015-06-25"
- a description (`description`)
- a number of estimated calories (`calories`)

Then, create the following method for 'User'
- `caloriesEatenOn`, which accepts a date (in the format above) and calculates the total number of calories consumed on that date.
- `avgDailyCalories`, which (as indicated), calculates the average number of calories consumed per day, rounded down to the nearest whole calorie.
- `onTrack`, which compares averageDailyCalories to the User's target daily calorie intake, and returns `true` if average caloric intake is at or below the target (or `false` if the reverse is true)

### Constructors

Now that we're using objects to solve problems, it might make sense to have a way to make multiple objects with the same kind of format - an 'object factory', designed to construct objects of a particular type.

JavaScript's answer to this problem is _constructor functions_. Below is an example of a constructor function being defined and used.

```javascript
var Car = function(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

var someCar = new Car("Ford", "Focus", 2010);
```

Here's another example.

```javascript
var Person = function(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function(){
    return "Hi there! My name is " + this.name + ", and I am " + age + " years old.";
  };
}

var matt = new Person("Matt", 28);
```

The trick is `new`, a JavaScript keyword. When that last line runs, `new`
1. creates a new empty object (`{}`);
    > There's more to this part of the story, but we won't get to it right now.

2. attaches the specified constructor function (say, `Person`) to the empty object as a property;

3. invokes the constructor function - since the constructor function is now a property of the new object, `this` refers to the new object, so the constructor is able to attach properties and methods (such as `name` and `age`) to it;

4. takes the object (with brand-new properties and methods) and stores it inside the variable.

This new object we created might be referred to as an 'instance' of Person.

> This term, and the syntax surrounding a constructor function, come from other languages - particularly Java; however, the mechanics of how objects get created is actually very different in JavaScript. So why write it this way? 'Syntactical sugar', intended to make writing JavaScript easier for those with a background in Java.

#### Lab :: Constructors

Create constructor functions for the User and Meal objects for the previous lab. The constructor for User should take `name`, `age`, and `calorieTarget` as arguments. The constructor for Meal should take all of its parameters (`title`, `date`, `description`)


There are tests for this, so feel free to use `grunt test` to check your code's functionality.
