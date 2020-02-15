export default {
    filters: {
        getNumber(value){
            return value.map(function(n){
                return n % 2 === 0
            })
        }
    }
}