var element = document.getElementById("bildirim");
element.classList.remove("show");
var rands = Rondomkey == "random" ? Math.floor(Math.random() * atOptions.length):0;
function BildirimStart() {
    setTimeout(function() {
        if (Rondomkey == "random") {
            rands = Math.floor(Math.random() * atOptions.length);
        } else {
            rands++;
            if (rands >= atOptions.length) {
                rands = 0;
            }
        }
        element.classList.add("show");
        var selected_notification = atOptions[rands];
        document.getElementById("FA_Title").innerHTML = selected_notification.head;
        document.getElementById("FA_text").innerHTML = selected_notification.message;
        
        setTimeout(function() {
            element.classList.remove("show");
        }, ShowTimer);
    }, 100);
}
if (!IntervalTimer) {
    IntervalTimer = ShowTimer;
    setInterval(function() {
        IntervalTimer = Math.floor(Math.random() * (ShowTimer + ShowTimer)) + ShowTimer;
    }, 4000);
}
setTimeout(function() {
    BildirimStart();
    setInterval(function() {
        BildirimStart();
    }, IntervalTimer);
}, startTimer);