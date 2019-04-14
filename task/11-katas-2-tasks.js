'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(str) {
    const arr = str.split `\n`;
    const list = [
        " _ | ||_|",
        "     |  |",
        " _  _||_ ",
        " _  _| _|",
        "   |_|  |",
        " _ |_  _|",
        " _ |_ |_|",
        " _   |  |",
        " _ |_||_|",
        " _ |_| _|"
    ];
    let res = "";
    const length = arr[0].length;
    for (let i = 0; i < length; i += 3) {
        const n = [].concat(...[0, 1, 2].map((j) => arr[j].slice(i, i + 3)));
        res += list.indexOf(n.join ``);
    }
    return +res;
}

/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    throw new Error('Not implemented');
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    //throw new Error('Not implemented');
    let cards = "234567891JQKA";
    let ranks = hand
        .map((v) => v[0])
        .sort((a, b) => cards.indexOf(a) - cards.indexOf(b))
        .join("");
    let suits = hand.map((v) => v[v.length - 1]).join("");
    let groupedRanks = ranks.match(/(.)\1{0,99}/g);
    let groupedSuits = suits.match(/(.)\1{0,99}/g);
    if (
        groupedSuits.length == 1 &&
        (cards.indexOf(ranks) != -1 || ranks == "2345A")
    ) {
        return PokerRank.StraightFlush;
    }
    if (groupedRanks[0].length == 4 || groupedRanks[1].length == 4) {
        return PokerRank.FourOfKind;
    }
    if (groupedRanks[0].length + groupedRanks[1].length == 5) {
        return PokerRank.FullHouse;
    }
    if (groupedSuits.length == 1) {
        return PokerRank.Flush;
    }
    if (cards.indexOf(ranks) != -1 || ranks == "2345A") {
        return PokerRank.Straight;
    }
    if (
        groupedRanks[0].length == 3 ||
        groupedRanks[1].length == 3 ||
        groupedRanks[2].length == 3
    ) {
        return PokerRank.ThreeOfKind;
    }
    if (
        groupedRanks[0].length + groupedRanks[1].length + groupedRanks[2].length ==
        5
    ) {
        return PokerRank.TwoPairs;
    }
    if (
        groupedRanks[0].length +
        groupedRanks[1].length +
        groupedRanks[2].length +
        groupedRanks[3].length ==
        5
    ) {
        return PokerRank.OnePair;
    }
    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function getFigureRectangles(figure) {
    //throw new Error('Not implemented');
    let a = figure.split("\n");
    let answer = [];
    let check = function bar(n, m) {
        let i;
        let j;
        for (i = m;; i++) {
            if (a[n - 1][i] == undefined || a[n - 1][i] == " " || a[n] == undefined)
                return;
            if (a[n][i] != " ") break;
        }
        let w = i;
        for (j = n;; j++) {
            if (a[j] == undefined || a[j][w] == " ") return;
            if (a[j][w - 1] != " ") break;
        }
        let h = j;
        for (i = w - 1;; i--) {
            if (a[h][i] == undefined || a[h][i] == " " || a[h - 1] == undefined)
                return;
            if (a[h - 1][i] != " ") break;
        }
        if (i + 1 != m) return;
        for (j = h - 1;; j--) {
            if (a[j] == undefined || a[j][m - 1] == " ") return;
            if (a[j][m] != " ") break;
        }
        if (j + 1 != n) return;
        n = h - n;
        m = w - m;
        answer.push(
            "+" +
            "-".repeat(m) +
            "+\n" +
            ("|" + " ".repeat(m) + "|\n").repeat(n) +
            "+" +
            "-".repeat(m) +
            "+\n"
        );
    };

    a.pop();
    a.forEach((v, i) =>
        v.split("").forEach((v, j) => {
            if (v == "+") check(i + 1, j + 1);
        })
    );
    return answer;
}


module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};