
function matrix_csr_from_coordinate_list(coordinates,nRows,nCols){
	// The sparse matrix will be stored in Compressed Sparse Row (CSR) form
	var sparse = {
		// all of the non-zero values (len = # non-zero elems)
		values: [],
		// column number of each value (len = # non-zero elems)
		cols: [],
		// the index (from the values array) that is that start of the ith row
		index: [],
		// Let's also keep track of the size
		nRows: nRows,
		nCols: nCols
	};
	
	// Store everything, in CSR form
	var i, l = coordinates.length;
	var x,y,value, coord;
	for( i=0; i<l; i+=1 ){
		coord = coordinates[i];
		x = coord[0];
		y = coord[1];
		value = coord[2];
	}
	
	return sparse;
}

function matrix_csr_from_full(matrix, filter){
	
	// Use the is_zero function to determine which values should be discarded
	var is_zero = filter || function(x){ return x===0; }
	
	// The sparse matrix will be stored in Compressed Sparse Row (CSR) form
	var sparse = {
		// all of the non-zero values (len = # non-zero elems)
		values: [],
		// column number of each value (len = # non-zero elems)
		cols: [],
		// the index (from the values array) that is that start of the ith row
		index: [],
		// Let's also keep track of the size
		nRows: matrix.length,
		nCols: matrix[0].length
	};
	
	// Determine the size of the matrix 
	var nRows = matrix.length;
	var nCols = matrix[0].length;
	
	var i,j, row, isFirstNonZero;
	for( i=0; i<nRows; i+=1 ){
		row = matrix[i];
		isFirstNonZero = 1;
		for( j=0; j<nCols; j+=1 ){
			if( ! is_zero(row[j]) ){
				
				// Record the index of this non-zero element
				if( isFirstNonZero ){
					isFirstNonZero = 0;
					sparse.index.push( sparse.values.length );
				}
				
				// Store the value
				sparse.values.push(row[j]);
				
				// Store the column
				sparse.cols.push( j );
			}
		}
	}
	
	// Add last index, it will make other operations easier
	sparse.index.push( sparse.values.length );
	
	return sparse;
}

function matrix_full_from_csr(sparse){
	
	// Determine the size of the matrix
	var nRows = sparse.nRows;
	var nCols = sparse.nCols;
	
	// Create a full matrix of all 0's
	var full = [];
	var i,j;
	for( i=0; i<nRows; i+=1 ){
		full.push([]);
		for( j=0; j<nCols; j+=1 ){
			full[i].push(0);
		}
	}
	
	// Add in the non-zero values
	var rowStart, rowEnd;
	for( i=0; i<nRows; i+=1 ){
		rowStart = sparse.index[i];
		rowEnd = sparse.index[i+1];
		for( j=rowStart; j<rowEnd; j+=1 ){
			full[i][sparse.cols[j]] = sparse.values[j];
		}
	}
	
	return full;
}

function matrix_csr_multiply_array(sparse,arr){
	// This pretends the arr is a column matrix
	// returns an array (pretend it's a row matrix).
	
	// Determine the size of the matrix
	var nRows = sparse.nRows;
	var nCols = sparse.nCols;
	
	// The number of rows of the array must equal the number of columns
	if( arr.length !== nCols ){ return []; }
	
	// Create the result vector of all 0's
	var result = [];
	var i,j;
	for( i=0; i<nCols; i+=1 ){
		result.push(0);
	}
	
	// Add in the non-zero values
	var rowStart, rowEnd;
	for( i=0; i<nRows; i+=1 ){
		rowStart = sparse.index[i];
		rowEnd = sparse.index[i+1];
		for( j=rowStart; j<rowEnd; j+=1 ){
			result[i] += sparse.values[j] * arr[sparse.cols[j]];
		}
	}
	
	return result;
}

console.info( matrix_csr_from_full([[1,2,0,0],[0,3,9,0],[0,1,4,0]]) );
// values:[1, 2, 3, 9, 1, 4]
// cols:  [0, 1, 1, 2, 1, 2]
// index: [0, 2, 4]
console.info( matrix_csr_from_full([[10,20,0,0,0,0],[0,30,0,40,0,0],[0,0,50,60,70,0],[0,0,0,0,0,80]]) );

var original_1 = [[1,2,0,0],[0,3,9,0],[0,1,4,0]];
var sparse_1 = matrix_csr_from_full(original_1);
var rebuilt_1 = matrix_full_from_csr(sparse_1);
console.info( original_1 );
console.info( sparse_1 );
console.info( rebuilt_1 );
console.info( matrix_csr_multiply_array(sparse_1,[1,1,1,1]) );

var original_2 = [[10,20,0,0,0,0],[0,30,0,40,0,0],[0,0,50,60,70,0],[0,0,0,0,0,80]];
var sparse_2 = matrix_csr_from_full(original_2);
var rebuilt_2 = matrix_full_from_csr(sparse_2);
console.info( original_2 );
console.info( sparse_2 );
console.info( rebuilt_2 );