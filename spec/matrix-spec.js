describe("Matrix", function() {

  describe("matrix_make_from_string(str,row,col)", function() {

    it('2x2 Identity',function(){
      expect(matrix_make_from_string("1,0;0,1",";",",")).toEqual([[1,0],[0,1]]);
    });

    it('4x1 Column Matrix',function(){
      expect(matrix_make_from_string("1;2;3;4",";",",")).toEqual([[1],[2],[3],[4]]);
    });

    it('1x4 Row Matrix',function(){
      expect(matrix_make_from_string("1,2,3,4",";",",")).toEqual([[1,2,3,4]]);
    });

  });

  describe("matrix_determinant(matrix)", function() {

    it('3x3 matrix ',function(){
      expect(matrix_determinant([[-2,2,3],[-1,1,3],[2,0,-1]])).toEqual(6);
    });

    it('2x2 identity ',function(){
      expect(matrix_determinant([[1,0],[0,1]])).toEqual(1);
    });

    it('2x2 inverse identity ',function(){
      expect(matrix_determinant([[0,1],[1,0]])).toEqual(-1);
    });

    it('5x5 matrix ',function(){
      expect(matrix_determinant(matrix_make_from_string('5 2 0 0 -2;0 1 4 3 2;0 0 2 6 3;0 0 3 4 1;0 0 0 0 2',';',' '))).toEqual(-100);
    });

  });

  describe("matrix_inverse(M)", function() {
    it('3x3 matrix', function(){
      var M = [[1,3,3],[1,4,3],[1,3,4]];
      expect(matrix_inverse(M)).toEqual([[7,-3,-3],[-1,1,0],[-1,0,1]]);
    });
  });

  describe("matrix_multiply(ML,MR)", function() {

    it('20x20 identity', function(){
      var M = matrix_make_identity(20);
      expect(matrix_multiply(M,M)).toEqual(M);
    });

    it('20x20 identity and zeroes', function(){
      var I = matrix_make_identity(20);
      var Z = matrix_make_zero(20,20);
      expect(matrix_multiply(I,Z)).toEqual(Z);
    });

    it('3x3 matrix', function(){
      var MR = [[1,3,3],[1,4,3],[1,3,4]];
      var ML = matrix_inverse(MR);
      expect(matrix_multiply(ML,MR)).toEqual([[1,0,0],[0,1,0],[0,0,1]]);
    });
  });

  describe("matrix_trace(M)", function() {
    it('3x3 matrix',function(){
      var M = [[1,2,3],[4,5,6],[7,8,9]];
      expect(matrix_trace(M)).toEqual(1+5+9);
    });
  });

});