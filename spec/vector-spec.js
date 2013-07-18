describe("Vector", function() {

  describe("should be able to add ", function() {

    it("3-element vectors", function(){
      var a = [1, 0, 0];
      var b = [0, 1, 0];
      expect(vector_add(a,b,1)).toEqual([1,1,0]);
    });

    it("scaled 4-element vectors", function(){
      var a = [1, 0, 1, 0];
      var b = [0, 1, 1, 2];
      expect(vector_add(a,b,2)).toEqual([1,2,3,4]);
    });

    it("128-element vectors", function(){
      var a = [], b = [], c = [], i;
      for( i=0; i<128; i+=1 ){
        a.push(1);
        b.push(i*4);
        c.push(1+i*4);
      }
      expect(vector_add(a,b,1)).toEqual(c);
    });

  });

  describe("should be able to subtract ", function() {

    it("3-element vectors", function(){
      var a = [1, 0, 0];
      var b = [0, 1, 0];
      expect(vector_add(a,b,-1)).toEqual([1,-1,0]);
    });

    it("scaled 4-element vectors", function(){
      var a = [1, 0, 1, 0];
      var b = [0, 1, 1, 2];
      expect(vector_add(a,b,-2)).toEqual([1,-2,-1,-4]);
    });

    it("128-element vectors", function(){
      var a = [], b = [], c = [], i;
      for( i=0; i<128; i+=1 ){
        a.push(1);
        b.push(i*4);
        c.push(1-i*4);
      }
      expect(vector_add(a,b,-1)).toEqual(c);
    });

  });

  describe("should be able to append ", function() {

    it("a scalar", function(){
      var a = [1, 1, 1];
      expect(vector_insert_last(a,999)).toEqual([1,1,1,999]);
    });

  });

  describe("should be able to prepend ", function() {

    it("a scalar", function(){
      var a = [1, 1, 1];
      expect(vector_insert_first(a,999)).toEqual([999,1,1,1]);
    });

  });

  describe("should be scalable ", function() {

    it("by a scalar 0", function(){
      var a = [1, 1, 1, 1, 1, 1, 1, 1];
      expect(vector_scale(a,0)).toEqual([0,0,0,0, 0,0,0,0]);
    });

    it("by a positive scalar 9876543210", function(){
      var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var c = [], i;
      for( i=0; i<a.length; i+=1 ){
        c.push(i*9876543210);
      }
      expect(vector_scale(a,9876543210)).toEqual(c);
    });

    it("by a negative scalar -9876543210", function(){
      var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var c = [], i;
      for( i=0; i<a.length; i+=1 ){
        c.push(-i*9876543210);
      }
      expect(vector_scale(a,-9876543210)).toEqual(c);
    });

    it("by a fractional scalar 0.0009", function(){
      var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var c = [], i;
      for( i=0; i<a.length; i+=1 ){
        c.push(i*0.0009);
      }
      expect(vector_scale(a,0.0009)).toEqual(c);
    });

  });

  describe("should be able to compute distance ", function() {

    it("between two identical vectors", function(){
      var a = [1, 1, 1];
      expect(vector_distance(a,a)).toEqual(0);
    });

    it("between two different vectors", function(){
      var a = [0,0,0,0];
      var b = [3,0,4,0];
      expect(vector_distance(a,b)).toEqual(5);
    });

    it("between two big vectors", function(){
      var a = [1,1,1,1,1,1,1,1];
      var b = [3,4,5,6,7,8,9,2];
      var c = Math.sqrt(1*1+2*2+3*3+4*4+5*5+6*6+7*7+8*8);
      expect(vector_distance(a,b)).toEqual(c);
    });

  });

  describe("should be able to compute the dot product ", function() {

    it("between two identical vectors", function(){
      var a = [1, 1, 1, 1, 1, 1, 1];
      expect(vector_dot(a,a)).toEqual(7);
    });

    it("between two different vectors", function(){
      var a = [1,1,1];
      var b = [3,4,5];
      expect(vector_dot(a,b)).toEqual(12);
    });

    it("between two big vectors", function(){
      var a = [0,1,0,1,0,1,0,-1];
      var b = [3,4,5,6,7,8,9,2];
      expect(vector_distance(a,b)).toEqual(16);
    });

  });


  describe("should be able to apply a unary operation to each element ", function() {

    it("like negating", function(){
      var a = [1, 1, 1, 1, 1, 1, 1];
      var f = function(x){
        return -x;
      };
      expect(vector_unary(a,f)).toEqual([-1,-1,-1,-1,-1,-1,-1]);
    });

    it("like thresholding", function(){
      var a = [1,10,100,1000];
      var f = function(x){
        return (x>=100)*x;
      };
      expect(vector_unary(a,f)).toEqual([0,0,100,1000]);
    });

    it("like cos-ing", function(){
      var a = [0, 0, 0];
      var f = function(x){
        return Math.cos(x);
      };
      expect(vector_unary(a,f)).toEqual([1,1,1]);
    });

  });

  describe("should be able to compute the squared magnitude ", function() {

    it("of a simple vector", function(){
      var a = [1, 2, 3];
      expect(vector_magnitude_squared(a)).toEqual(1*1+2*2+3*3);
    });

  });

  describe("should be able to compare vectors ", function() {

    it("if they are the same", function(){
      var a = [0,1,2];
      expect(vector_is_equal(a,a)).toEqual(1);
    });

    it("if they are the different and equal", function(){
      var a = [0,1,2];
      var b = [0,1,2];
      expect(vector_is_equal(a,b)).toEqual(1);
    });

    it("if they are the different and unequal", function(){
      var a = [0,1,2];
      var b = [2,1,0];
      expect(vector_is_equal(a,b)).toEqual(0);
    });

  });

});
