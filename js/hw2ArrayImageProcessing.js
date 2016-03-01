/* CSCI E-3 Introduction to Web Programming Using Javascript
 *
 *
 * Homework Unit #2a
 *
 *
 */

 /********************************************************************
  *
  * Image processing by way of arrays:  This assignment is designed to
  * give you a chance to work with arrays. The fact that we're processing images
  * makes the example interesting, but no prior knowledge of image processing
  * or understanding of the setup for this in hw2ArrayImageProcessingSetup.js
  * is required (though you're welcome to study that if you like!).
  *
  * In each of these functions, you'll be reading the parameter 'original',
  * which is an array of pixel data.  Each array contains four numeric elements to
  * describe each pixel in the image (red, green, blue, alpha).  The
  * data looks like this:
  *   original[0];  // pixel 0 red value
  *   original[1];  // pixel 0 green value
  *   original[2];  // pixel 0 blue value
  *   original[3];  // pixel 0 alpha value
  *   original[4];  // pixel 1 red value
  *   original[5];  // pixel 1 green value
  *   original[6];  // pixel 1 blue value
  *   original[7];  // pixel 1 alpha value
  *     etc...
  *
  * Essentially, your job is to read
  * data from the original array, and copy it to the output array, making
  * certain modifications along the way. It might be a good idea to start by
  * iterating over the original array and copying its data unmodified into the
  * output array. Once you have that working, you can try the data changes
  * required to make the output correct.
  *
  ********************************************************************/



/*
 * makeBlue - Reads data from an image bitmap array and writes new image data to another array object
 *            The output data should contain only blue pixel data, with other red and green color values set to 0.
 *
 *            @original {array} - the source bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @output {array} - the bitmap data array to which the output image is written.
 *
 **/
function makeBlue(original, output){
      // declare a counter for blue
      var bCount=0;
      // loop through entire image array
      for (var i=0; i<=original.length; i++) {
        // whenever loop is not on a blue element, set the output to 0
        if (bCount < 2) {
          output[i] = 0;
          bCount++;
        /* when the loop hits a blue array element, set it to the original's
         * blue value and reset the blue counter. Also, since we want to maintain
         * the same alpha channel, just increment the i counter one and set the ouput's
         * alpha value to 255.
        */
      } else if (bCount == 2) {
          output[i] = original[i];
          bCount = 0;
          i++;
          output[i] = 255;
        }
      }
}

/*
 * makeReverse - Reads data from an image bitmap array and writes new image data to another array object
 *               The output data contains pixel data inverted, with every color value its opposite on the scale of 0-255.
 *               To get "inverted" color, the value for each color will be 255-n, where n is the original color.
 *               Don't invert the alpha value - that's opacity, and if you invert it, your picture will be trasparent (invisible!)
 *
 *            @original {array} - the source bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @output {array} - the bitmap data array to which the output image is written.
 *
 **/
function makeReverse(original, output){
      // This time, keep track of alpha channels
      var aCount = 0;
      // loop over the image array, setting an r, g, b channel to it's inverse
      // using 255-original value, and increment the alpha channel counter
      for (var i=0; i<=original.length; i++) {
        if (aCount < 3) {
            output[i] = 255 - original[i];
            aCount++;
        // when the loop hits an alpha channel, set output to 255 and reset the counter
        } else if (aCount == 3) {
            output[i] = 255;
            aCount = 0;
        }
      }
}

/*
 * makeTransparent - Reads data from an image bitmap array and writes new image data to another array object
 *                   The output data contains pixel data with the transparency (alpha) set to a value representing 50%
 *                   of its original value.
 *
 *            @original {array} - the source bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *             @output {array} - the bitmap data array to which the output image is written.
 *
 **/

function makeTransparent(original,output){
      // YOUR CODE GOES HERE
      var aCount = 0;
      // loop over the image array, setting an r, g, b channel to original values
      // and increment the alpha channel counter
      for (var i=0; i<=original.length; i++) {
        if (aCount < 3) {
            output[i] = original[i];
            aCount++;
        // when the loop hits an alpha channel, set output to 50% alpha and reset the counter
        } else if (aCount == 3) {
            output[i] = 255/2;
            aCount = 0;
        }
      }
}

function makeFib(original,output){
      // declare variables
      var f = [];
      var colCount = 0;
      var flag = 0;
      // the fIndex starts counting at 1 to handle the edge case at the beginning with repeating "1s"
      var fIndex = 1;

      //generate fibonacci sequence up to 13 which gives entries from 0 to 233 covering the 150 pixel width of the image
      for (var j=0; j<=13; j++) {
            if (j == 0) {
              f[j] = 0;
          } else if (j == 1) {
              f[j] = 1;
          } else if (j >= 2){
              f[j] = f[j-1] + f[j-2];
          }
      }

    //loop over the original image, skipping the iteration ahead by 4 so that each iteration starts on a new pixel
    // looping through the pixel values is handled seperately below
    for (var i=0; i<=original.length; i+=4) {
        //here we keep track of the vertical columns across the image as we'll need to check if we're at one of the
        // values of the sequence
        if (colCount < 150){
            // here's the part of the loop that handles the r, g, b, a values at each pixel
            for (var pCount=0; pCount <= 3; pCount++){
                // if we're at one of the numbers in the sequence, set the r, g, b values to white (255)
                // the OR statement here handles the very first column at 0 which then advances the fibonacci sequence index to
                // 2 (since it's starting at 1) thus avoiding the duplicate "1" problem.
                if (colCount == f[fIndex] || colCount == 0) {
                    // by adding pCount to the index, we access the individual r, g, b, a value at any given index
                    // also note the use of the flag so we can iterate over the sequence seperately from the image or pixels
                    output[i+pCount] = 255;
                    flag = 1;
                    // if we're not at a sequence value either set to original image or set it to black (easier to view)
                } else if (colCount != f[fIndex]) {
                    output[i+pCount] = original[i+pCount];
                    // output[i+pCount] = 0; //use to make background plain black
                }
                if (pCount == 3) {
                    //at the end of a given pixel, set the alpha to 255, and check the fibonacci flag
                    // if we were just in one of the sequence numbers, then we'll need to increment the fibonacci index
                    output[i+pCount] = 255;
                    if (flag == 1) {
                        fIndex++;
                        flag = 0;
                    }
                }
            }
            colCount++;
        }
        //at the end of a column, reset the column count and fibonacci index count
        if (colCount == 150) {
            colCount = 0;
            fIndex = 1;
        }
    }
}
/*
 * loadComposite - Reads data from two image bitmap arrays (one a photo, and one a text overlay)
 *                  and writes new image data to another array object
 *                 The output data contains pixel data from the two images summed.
 *                             (note that this works with simple summing because the background of this
 *                             particular second image is transparent)
 *
 *            @original {array} - the source image bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @secondOne {array} - the source text overlay bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @output {array} - the bitmap data array to which the output image is written.
 *
 **/
function loadComposite(original, secondOne, output){
       // create a composite of two images by looping over the original image array
       // and adding the second image to the original pixel by pixel.
       for (var i=0; i<=original.length; i++) {
         output[i] = original[i] + secondOne[i];
       }
}
