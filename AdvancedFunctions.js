var processor = {
    timeoutId: null,
    performProcessing: function(){

    },
    process: function(){
        clearTimeout(this.timeoutId)
        var that = this;
        this.timeoutId = setTimeout(function(){
            that.performProcessing()
        },100)
    }
}