function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

//--------------------Delete space and brackets check----(in string)
        let exampl = ''
        let brack_dif = 0
    for (let index = 0; index < expr.length; index++) {
        if (expr.charAt(index) != ' ') {
            exampl = exampl + expr.charAt(index)
        if (expr.charAt(index) == '(') {
            brack_dif = brack_dif + 1
        }
        if (expr.charAt(index) == ')') {
            brack_dif = brack_dif - 1
        }
        }
    }
    if (brack_dif != 0) {throw 'ExpressionError: Brackets must be paired'}
//-----------------------------------------------------(out string)

    let arrExampl = []
    let arrExamplIndex = 0
    let arrNumb = ''
    for (let i = 0; i < exampl.length; i++)
    {
        if (/\d/.test(exampl[i])) {
            while (/\d/.test(exampl[i]) && i < exampl.length) {
                arrNumb = arrNumb + exampl[i]
                arrExampl[arrExamplIndex] = Number(arrNumb)
                i++
            }
            i--
            arrExamplIndex++
            arrNumb = ''
        }
        else {
            arrExampl[arrExamplIndex] = exampl[i]
            arrExamplIndex++
        }

    }


    

    while (searchBrackets (arrExampl)) {
        openingBrackets(arrExampl)
    }
    calc(arrExampl)
    return arrExampl[0]




    function searchBrackets (arrWithBrack) {
        for (let i = 0; i < arrWithBrack.length; i++) {
            if (arrWithBrack[i] == '(') {
                return true
            }
        }
        return false
    }

    function openingBrackets (arrUnderBrack) {
        for (let i = 0; i < arrUnderBrack.length; i++) {
            if (arrUnderBrack[i] == '(') {
                startIndex = i
            }
            if (arrUnderBrack[i] == ')') {
                stopIndex = i
                break
            }
        }

        let cutedArr = []
        cutedArr = arrUnderBrack.splice(startIndex, stopIndex - startIndex + 1)
        cutedArr.pop()
        cutedArr.shift()
        arrUnderBrack.splice(startIndex, 0, calc(cutedArr))

        

    }

    function calc (arrForCalc) {
        for (let i = 0; i < arrForCalc.length; i++) {
            if (arrForCalc[i] == '/') {
                let res
                if(arrForCalc[i + 1] == 0) {throw "TypeError: Division by zero."}
                res = arrForCalc[i - 1] / arrForCalc[i + 1]
                arrForCalc.splice(i - 1, 3, res)
                i = 0
            }
        }
        for (let i = 0; i < arrForCalc.length; i++) {
            if (arrForCalc[i] == '*') {
                let res
                res = arrForCalc[i - 1] * arrForCalc[i + 1]
                arrForCalc.splice(i - 1, 3, res)
                i = 0
            }
        }
        for (let i = 0; i < arrForCalc.length; i++) {
            if (arrForCalc[i] == '-') {
                let res
                res = arrForCalc[i - 1] - arrForCalc[i + 1]
                arrForCalc.splice(i - 1, 3, res)
                i = 0
            }
        }
        for (let i = 0; i < arrForCalc.length; i++) {
            if (arrForCalc[i] == '+') {
                let res
                res = arrForCalc[i - 1] + arrForCalc[i + 1]
                arrForCalc.splice(i - 1, 3, res)
                i = 0
            }
        }
        return arrForCalc[0]
                
    }
}

module.exports = {
    expressionCalculator
}