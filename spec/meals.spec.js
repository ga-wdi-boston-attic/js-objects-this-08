'use strict';

var app = require('../lib/meals.js');

describe('example_user', function(){
  it('should exist and have all of the correct properties', function(){
    expect(app.example_user).toBeDefined();
    expect(app.example_user.name).toBeDefined();
    expect(app.example_user.name).toEqual(jasmine.any(String));
    expect(app.example_user.age).toBeDefined();
    expect(app.example_user.age).toEqual(jasmine.any(Number));
    expect(app.example_user.calorieTarget).toBeDefined();
    expect(app.example_user.calorieTarget).toEqual(jasmine.any(Number));
    expect(app.example_user.meals).toBeDefined();
  });
  it('should have at least one meal', function(){
    expect(app.example_user.meals.length).not.toBeLessThan(0);
  });
  it('should have the right properties on every meal', function(){
    app.example_user.meals.forEach(function(meal){
      expect(meal).toBeDefined();
      expect(meal.title).toBeDefined();
      expect(meal.title).toEqual(jasmine.any(String));
      expect(meal.date).toBeDefined();
      expect(meal.date).toEqual(jasmine.any(String));
      expect(meal.date).toMatch(/\d{4}-(0\d|1[12])-([012]\d|3[01])/);
      expect(meal.description).toBeDefined();
      expect(meal.description).toEqual(jasmine.any(String));
      expect(meal.calories).toBeDefined();
      expect(meal.calories).toEqual(jasmine.any(Number));
      expect(meal.calories).not.toBeLessThan(0);
    });
  })
});


describe('meal app', function(){
  describe('Meal', function(){
    var meal = new app.Meal("lunch", "2015-06-10", "sandwich at Metro", 800);
    it('should have all of the expected properties', function(){
      expect(meal.title).toBeDefined();
      expect(meal.date).toBeDefined();
      expect(meal.description).toBeDefined();
      expect(meal.calories).toBeDefined();
    });
  });
  describe('User', function(){
    var userOne, userTwo;
    beforeEach(function(){
      userOne = new app.User("Person McFace", 30, 1800);
      userOne.meals.push(new app.Meal("breakfast", "2015-06-01", "muffin", 600));
      userOne.meals.push(new app.Meal("lunch", "2015-06-01", "sandwich", 800));
      userOne.meals.push(new app.Meal("dinner", "2015-06-01", "pizza", 600));
      userOne.meals.push(new app.Meal("breakfast", "2015-06-02", "muffin", 600));
      userOne.meals.push(new app.Meal("lunch", "2015-06-02", "sandwich", 700));
      userOne.meals.push(new app.Meal("dinner", "2015-06-02", "salmon", 450));
      userOne.meals.push(new app.Meal("lunch", "2015-06-03", "sandwich", 800));
      userOne.meals.push(new app.Meal("dinner", "2015-06-03", "sloppy joe", 900));
      userTwo = new app.User("Face McPerson", 28, 1800);
      userTwo.meals.push(new app.Meal("breakfast", "2015-06-01", "eggs", 300));
      userTwo.meals.push(new app.Meal("lunch", "2015-06-01", "salad", 700));
      userTwo.meals.push(new app.Meal("dinner", "2015-06-01", "grilled chicken", 600));
      userTwo.meals.push(new app.Meal("breakfast", "2015-06-02", "toast", 300));
      userTwo.meals.push(new app.Meal("lunch", "2015-06-02", "sandwich", 700));
      userTwo.meals.push(new app.Meal("dinner", "2015-06-02", "salmon", 450));
    });
    describe('#caloriesEatenOn', function(){
      it('should exist', function(){
        expect(userOne.caloriesEatenOn).toBeDefined();
      });
      it('should calculate the number of calories consumed on a given date', function(){
        expect(userOne.caloriesEatenOn("2015-06-01")).toBe(2000);
        expect(userOne.caloriesEatenOn("2015-06-02")).toBe(1750);
        expect(userOne.caloriesEatenOn("2015-06-03")).toBe(1700);
        expect(userTwo.caloriesEatenOn("2015-06-01")).toBe(1600);
        expect(userTwo.caloriesEatenOn("2015-06-02")).toBe(1450);
      });
    });
    describe('#avgDailyCalories', function(){
      it('should exist', function(){
        expect(userOne.avgDailyCalories).toBeDefined();
      });
      it('should calculate average daily calories', function(){
        expect(userOne.avgDailyCalories()).toEqual(1816);
        expect(userTwo.avgDailyCalories()).toBe(1525);
      });
    });
    describe('#onTrack', function(){
      it('should exist', function(){
        expect(userOne.onTrack).toBeDefined();
      });
      it('should indicate whether a user is on track with their goal', function(){
        expect(userOne.onTrack()).toBe(false);
        expect(userTwo.onTrack()).toBe(true);
      });
    });
  });
});
