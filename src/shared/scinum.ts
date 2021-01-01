export type SciNum = {
    Base: number,
    Exponent: number
}

class SciNumKit {
    constructor(){}
    
    add(addend1:SciNum, addend2:SciNum):SciNum {
        let sum:SciNum = {
            Base: 0,
            Exponent: 0
        };
        let a1:SciNum = this.truncate(addend1);
        let a2:SciNum = this.truncate(addend2);
        if (a1.Exponent > a2.Exponent){
            if (a1.Exponent - a2.Exponent > 10) {
                sum.Base = a1.Base;
                sum.Exponent = a1.Exponent;
            } else {
                sum.Base = a1.Base + a2.Base/math.pow(10, a1.Exponent-a2.Exponent);
                sum.Exponent = a1.Exponent;
            }
        } else if (a2.Exponent > a1.Exponent){
            sum = this.add(a2,a1);
        } else if (a1.Exponent === a2.Exponent){
            sum.Base = a1.Base + a2.Base;
            sum.Exponent = a1.Exponent
        }
        return this.truncate(sum);
    }

    subtract(minuend:SciNum, subtrahend:SciNum):SciNum {
        let difference:SciNum = {
            Base: 0,
            Exponent: 0
        };
        let m:SciNum = this.truncate(minuend);
        let s:SciNum = this.truncate(subtrahend)
        if (m.Exponent > s.Exponent){
            if (m.Exponent - s.Exponent > 10) {
                difference.Base = m.Base;
                difference.Exponent = m.Exponent;
            } else {
                difference.Base = m.Base - s.Base/math.pow(10, m.Exponent-s.Exponent);
                difference.Exponent = m.Exponent;
            }
        } else if (s.Exponent > m.Exponent) {
            
            if (s.Exponent - m.Exponent > 10) {
                difference.Base = s.Base;
                difference.Exponent = s.Exponent;
            } else {
                difference.Base = -s.Base + m.Base/math.pow(10, s.Exponent-m.Exponent);
                difference.Exponent = s.Exponent;
            }
        } else if (s.Exponent = m.Exponent) {
            difference.Base = m.Base - s.Base;
            difference.Exponent = m.Exponent;
        }
        return this.truncate(difference);
    }

    multiply(m1:SciNum, m2:SciNum):SciNum {
        let product:SciNum = {
            Base:0,
            Exponent:0
        }
        let multiplicand = this.truncate(m1)
        let multiplicator = this.truncate(m2)
        product.Base = multiplicand.Base*multiplicator.Base;
        product.Exponent = multiplicand.Exponent+multiplicator.Exponent;
        return this.truncate(product);
    }

    divide(d1:SciNum, d2:SciNum):SciNum {
        let quotient:SciNum = {
            Base:0,
            Exponent:0
        }
        let dividend:SciNum = this.truncate(d1);
        let divisor:SciNum = this.truncate(d2)
        quotient.Base = dividend.Base/divisor.Base;
        quotient.Exponent = dividend.Exponent - divisor.Exponent;
        return this.truncate(quotient);
    }

    // Get the order of magnitude of a number
    order(n:number):number{
        if (n === 0) {
            return 0;
        }
        let order:number = math.floor(math.log(n) / math.log(10) + 0.000000001);
        return order;
    }
    // Simplifies scientific notation to order of magnitude of 2
    truncate(n:SciNum):SciNum{
        let magnitude:number = 1;
        let minimumToSci:number = 6;
        let truncated:SciNum = {
            Base: n.Base,
            Exponent: n.Exponent
        }
        let wasNegative:Boolean = false;
        if (n.Base < 0){
            wasNegative = true;
            n.Base *= -1;
        }
        if (n.Base === 0) {
            return n;
        }
        if (this.order(n.Base) <= minimumToSci && n.Exponent <= (minimumToSci-magnitude)) {
            return n;
        }
        if (this.order(n.Base) > magnitude) {
            truncated.Base = truncated.Base / (math.pow(10, this.order(n.Base) - magnitude));
            truncated.Exponent = truncated.Exponent + this.order(n.Base) - magnitude
        } 
        // Truncate to two decimal places
        truncated.Base = math.floor(truncated.Base*100000)/100000
        return truncated;
    }

    removeDecimal(n:number, places:number):number {
        return math.floor(n*math.pow(10,places))/(math.pow(10,places))
    }

    // Type-guard for SciNum
    isSciNum(obj:any): obj is SciNum {
        return (obj as SciNum).Base !== undefined && (obj as SciNum).Exponent !== undefined;
    }
}

export let SciNumToolKit:SciNumKit = new SciNumKit;

