function sockMerchant(n, ar) {
  // Check if the input array is valid and matches the expected size
  if (!Array.isArray(ar) || ar.length === 0 || ar.length !== n) {
    console.error(
      'Invalid input: ar must be a non-empty array with length equal to n.',
    );
    return 0;
  }

  // Validate the contents of the array
  if (ar.some((sock) => typeof sock !== 'number' || sock < 1 || sock > 100)) {
    console.error(
      'Invalid input: every element in ar must be an integer between 1 and 100.',
    );
    return 0;
  }

  const colorCount = {};
  let pairs = 0;

  ar.forEach((sock) => {
    if (colorCount[sock]) {
      colorCount[sock] += 1;
    } else {
      colorCount[sock] = 1;
    }

    // If a pair is found, increment the pairs count
    if (colorCount[sock] % 2 === 0) {
      pairs++;
    }
  });

  return pairs;
}

// Sample Input
const n = 9;
const ar = [10, 20, 20, 10, 10, 30, 50, 10, 20];

// Calculate the number of pairs
console.log(sockMerchant(n, ar));
