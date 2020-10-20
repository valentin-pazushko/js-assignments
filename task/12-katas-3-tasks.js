
/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {boolean}
 *
 * @example
 *   var puzzle = [
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ];
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    /**
     * @return {boolean}
     */
    function IsInPosArr(posArr, pos) {
        for (const arrPos of posArr) {
            if ((arrPos[0] === pos[0]) && (arrPos[1] === pos[1])) {
                return true;
            }
        }
        return false;
    }

    /**
     * @return {boolean}
     */
    function IsHere(puzzle, word, curLetterNum, curPos) {
        if (curLetterNum === word.length - 1) {
            return (puzzle[curPos[0]][curPos[1]] === word[curLetterNum]) && (!IsInPosArr(wasInRow, [curPos[0], curPos[1]]));
        } if ((puzzle[curPos[0]][curPos[1]] === word[curLetterNum]) && (!IsInPosArr(wasInRow, [curPos[0], curPos[1]]))) {
            let ret = false;
            wasInRow.push([curPos[0], curPos[1]]);
            if (curPos[0] > 0) { ret = ret || IsHere(puzzle, word, curLetterNum + 1, [curPos[0] - 1, curPos[1]]); }
            if (curPos[1] < puzzle[curPos[0]].length - 1) { ret = ret || IsHere(puzzle, word, curLetterNum + 1, [curPos[0], curPos[1] + 1]); }
            if (curPos[0] < puzzle.length - 1) { ret = ret || IsHere(puzzle, word, curLetterNum + 1, [curPos[0] + 1, curPos[1]]); }
            if (curPos[1] > 0) { ret = ret || IsHere(puzzle, word, curLetterNum + 1, [curPos[0], curPos[1] - 1]); }
            wasInRow.pop();
            return ret;
        }
        return false;
    }

    let ret = false;
    let wasInRow = [];
    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++) {
            ret = ret || IsHere(puzzle, searchStr, 0, [i, j]);
        }
    }
    return ret;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    function* HeapsAlgorithm(n, A) {
        if (n === 1) {
            yield A.join('');
        } else {
            let temp;
            for (let i = 0; i < n; i++) {
                yield* HeapsAlgorithm(n - 1, A);
                if (n % 2 === 0) {
                    temp = A[i];
                    A[i] = A[n - 1];
                    A[n - 1] = temp;
                } else {
                    temp = A[0];
                    A[0] = A[n - 1];
                    A[n - 1] = temp;
                }
            }
        }
    }

    yield* HeapsAlgorithm(chars.length, chars.split(''));
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let sum = 0;
    quotes.forEach((value, index) => {
        sum += quotes.slice(index).sort((a, b) => b - a)[0] - value;
    });
    return sum;
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 *
 * @class
 *
 * @example
 *
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 *
 */
function UrlShortener() {
    this.urlAllowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        + 'abcdefghijklmnopqrstuvwxyz'
        + "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode(url) {
        let result = String();
        let char1; let char2; let
            newChar;
        for (let i = 0; i + 1 < url.length; i += 2) {
            char1 = url.charCodeAt(i);
            char2 = url.charCodeAt(i + 1);
            newChar = (char1 << 8) + char2;
            result += String.fromCharCode(newChar);
        }
        if (url.length % 2 === 1) {
            result += String.fromCharCode(url.charCodeAt(url.length - 1) << 8);
        }
        return result;
    },

    decode(code) {
        let result = String();
        let char1; let char2; let
            oldChar;
        for (let i = 0; i < code.length; i++) {
            oldChar = code.charCodeAt(i);
            char2 = oldChar & 255;
            char1 = oldChar >> 8;
            result += String.fromCharCode(char1) + ((char2 === 0) ? '' : String.fromCharCode(char2));
        }
        return result;
    },
};


module.exports = {
    findStringInSnakingPuzzle,
    getPermutations,
    getMostProfitFromStockQuotes,
    UrlShortener,
};