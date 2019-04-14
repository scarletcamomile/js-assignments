'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    throw new Error('Not implemented');
    var sides = ['N', 'E', 'S', 'W']; // use array of cardinal directions only!
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function expandBraces(str) {
    //throw new Error('Not implemented');
    const count = (c) => (c == "{" ? 1 : c == "}" ? -1 : 0);
    const start = str.indexOf("{");
    let end = start + 1;
    let ctr = 1;

    if (start < 0) return [str];
    while (ctr) {
        ctr += count(str[end++]);
    }
    return [...str.slice(start + 1, end - 1)]
        .map((c) => (!(ctr += count(c)) && c == "," ? ";" : c))
        .join("")
        .split(";")
        .map((s) => str.slice(0, start) + s + str.slice(end))
        .reduce((all, some) => all.concat(expandBraces(some)), []);
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    // diagonals :: n -> [[n]]
    function diagonals(n) {
        let diags = (xs, iCol, iRow) => {
            if (iCol < xs.length) {
                let xxs = splitAt(iCol, xs);

                return [xxs[0]].concat(
                    diags(xxs[1], iCol + (iRow < n ? 1 : -1), iRow + 1)
                );
            } else return [xs];
        };

        return diags(range(0, n * n - 1), 1, 1);
    }

    // Recursively read off n heads of diagonal lists
    // rowsFromDiagonals :: n -> [[n]] -> [[n]]
    function rowsFromDiagonals(n, lst) {
        if (lst.length) {
            let [edge, rest] = splitAt(n, lst);

            return [edge.map((x) => x[0])].concat(
                rowsFromDiagonals(
                    n,
                    edge
                    .filter((x) => x.length > 1)
                    .map((x) => x.slice(1))
                    .concat(rest)
                )
            );
        } else return [];
    }

    // GENERIC FUNCTIONS

    // splitAt :: Int -> [a] -> ([a],[a])
    function splitAt(n, xs) {
        return [xs.slice(0, n), xs.slice(n)];
    }

    // range :: From -> To -> Maybe Step -> [Int]
    // range :: Int -> Int -> Maybe Int -> [Int]
    function range(m, n, step) {
        let d = (step || 1) * (n >= m ? 1 : -1);

        return Array.from({
                length: Math.floor((n - m) / d) + 1
            },
            (_, i) => m + i * d
        );
    }

    // ZIG-ZAG MATRIX

    return rowsFromDiagonals(
        n,
        diagonals(n).map((x, i) => (i % 2 || x.reverse()) && x)
    );
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    throw new Error('Not implemented');
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    //throw new Error('Not implemented');
    for (let i = 0; i < nums.length; i++) {
        let j = i;
        while (nums[j] - nums[j + 1] == -1) j++;
        if (j != i && j - i > 1) nums.splice(i, j - i + 1, nums[i] + "-" + nums[j]);
    }
    return nums.join();
}

module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};